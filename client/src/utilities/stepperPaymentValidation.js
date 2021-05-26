import * as yup from 'yup';

export function StepperValidate(info) {
  const schema = yup.object().shape({
    fullName: yup.string().min(8).required('Opsss!.. Full name is required'),
    address: yup
      .string()
      .min(8)
      .required('Opsss!.. address is required'),
    tel: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required('A phone number is required'),
  });

  return schema.validate(info);
}
