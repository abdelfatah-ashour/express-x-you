import React, { useContext, useState } from 'react';
import PayPalButtons from '../components/PaypalButton';
import Style from '../styles/StepperOrder.module.css';
import BasicField from '../components/Create-Register-Control';
import { StepperValidate } from '../utilities/stepperPaymentValidation';
import { ToastError } from '../utilities/Toaster';
import PhoneInput from 'react-phone-number-input';
import { AuthStore } from '../context-api/Auth.context';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { RiAdminLine, RiSecurePaymentFill } from 'react-icons/ri';
import { GrMapLocation } from 'react-icons/gr';

export default function CheckoutStepper({ setChecked, items, amount }) {
  const { Auth } = useContext(AuthStore);

  const [shippedInfo, setShippedInfo] = useState({
    fullName: null,
    address: null,
    tel: null,
  });
  const [validateStep, setValidateStep] = useState(false);

  const handleDisplayBtnPaypal = async () => {
    await StepperValidate(shippedInfo)
      .then(() => {
        setValidateStep(true);
      })
      .catch(error => {
        setValidateStep(false);
        ToastError(error.message);
      });
  };

  const handleCloseStepper = () => {
    setChecked(false);
  };

  const handleChange = e => {
    setShippedInfo({
      ...shippedInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={Style.Stepper}>
      <div className={Style.close} onClick={handleCloseStepper}>
        <button className="btn btn-dark">
          <AiOutlineClose />
        </button>
      </div>
      <div className={Style.tabStepper + ' row'}>
        <div className="col-3 text-center">
          <button
            className={
              !Auth.isAuth
                ? 'btn btn-light ' + Style.btnStepper
                : 'btn btn-dark ' + Style.btnStepper
            }>
            <RiAdminLine />
          </button>
        </div>
        <div className="col text-center">
          <hr />
        </div>
        <div className="col-3 text-center">
          <button
            className={
              !Auth.isAuth
                ? 'btn btn-light ' + Style.btnStepper
                : 'btn btn-dark ' + Style.btnStepper
            }
            disabled={!Auth.isAuth}>
            <GrMapLocation />
          </button>
        </div>
        <div className="col text-center">
          <hr />
        </div>
        <div className="col-3 text-center">
          <button
            className={
              !Auth.isAuth && !validateStep
                ? 'btn btn-light ' + Style.btnStepper
                : 'btn btn-dark ' + Style.btnStepper
            }
            onClick={handleDisplayBtnPaypal}
            disabled={!Auth.isAuth}>
            <RiSecurePaymentFill />
          </button>
        </div>
      </div>

      {/* body stepper */}

      {/* authentication */}
      {!Auth.isAuth && (
        <div className="d-flex flex-wrap justify-content-center align-items-center w-50 my-2 p-2">
          {!Auth.isAuth && (
            <div className="alert alert-warning text-center">
              ⚠ you are not registered .. <Link href="/login">Login</Link>
            </div>
          )}
        </div>
      )}

      {/* address */}
      {Auth.isAuth && !validateStep && (
        <div className="d-flex flex-wrap justify-content-center align-items-center w-50 my-2 p-2">
          <BasicField
            name="fullName"
            type="text"
            id="usernameId"
            handleChange={handleChange}
            placeholder="Full name"
            label="full name"
          />
          <BasicField
            name="address"
            type="text"
            id="location"
            handleChange={handleChange}
            placeholder="location"
            label="location"
            autoComplete="true"
          />
          <div className="col-lg-7 col-md-9 col-sm-12 mb-3">
            <label htmlFor="tel-id" className="form-label">
              TEL :
            </label>
            <PhoneInput
              international={true}
              placeholder="Enter phone number"
              name="tel"
              onChange={function (phoneNumber) {
                setShippedInfo({
                  ...shippedInfo,
                  tel: phoneNumber,
                });
              }}
              defaultCountry="EG"
              className="form-control"
              id="tel"
            />
          </div>
        </div>
      )}

      {/* checkout */}
      {Auth.isAuth && validateStep && (
        <div className="d-flex flex-wrap justify-content-center align-items-center w-50 my-2 p-2">
          <PayPalButtons
            shippedInfo={shippedInfo}
            items={items}
            amount={amount}
          />
        </div>
      )}
    </div>
  );
}
