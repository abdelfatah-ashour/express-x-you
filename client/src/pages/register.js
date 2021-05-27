import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import FormControl from '../components/Create-Register-Control';
import { registerValidate } from '../utilities/register-validation';
import { useRouter } from 'next/router';
import { ToastSuccess, ToastError, ToastWarning } from '../utilities/Toaster';
import Style from '../styles/Register.module.css';
import axios from '../utilities/axios';

export default function register() {
  const Router = useRouter();

  const [user, setUser] = useState({
    username: null,
    email: null,
    password: null,
    cPassword: null,
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await registerValidate(user).then(async () => {
      await axios
        .post('/api/auth/signup', user)
        .then(({ data }) => {
          setTimeout(() => {
            Router.push('/login');
          }, 2000);
          ToastSuccess('🚀 ' + data.message);
        })
        .catch(error => {
          if (error.response) {
            ToastError('☢ ' + error.response.data.message);
          } else {
            ToastWarning('🥱 something went wrong!');
          }
        });
    });
  };

  const usernameProps = {
    type: 'text',
    name: 'username',
    id: 'idForUsername',
    handleChange,
    label: 'username',
    placeholder: 'Username',
  };

  const emailProps = {
    type: 'email',
    name: 'email',
    id: 'idForEmail',
    handleChange,
    label: 'email',
    placeholder: 'Email',
  };

  const passwordProps = {
    type: 'password',
    name: 'password',
    id: 'idForPassword',
    handleChange,
    label: 'password',
    placeholder: 'Password',
  };

  const cPasswordProps = {
    type: 'password',
    name: 'cPassword',
    id: 'idForCPassword',
    handleChange,
    label: 'confirm password',
    placeholder: 'Confirm Password',
  };

  return (
    <Layout
      title="Register"
      description="register now to access more resources and can make more transaction with more one">
      <div className={Style.form}>
        <div className="col-12 d-flex flex-column justify-content-evenly align-items-center">
          <h3 className="text-center my-3 p-2">🔐 Register</h3>
          <FormControl {...usernameProps} />
          <FormControl {...emailProps} />
          <FormControl {...passwordProps} />
          <FormControl {...cPasswordProps} />
          <div className="w-75 d-flex my-3">
            <button
              className="btn btn-dark w-100 mx-auto p-2"
              onClick={handleSubmit}>
              submit
            </button>
          </div>
          <span className="text-center my-2 py-2">
            Already have account ?{' '}
            <Link href="/login">
              <a>login</a>
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideRender(ctx) {
  if (ctx.req.cookies.c_user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
