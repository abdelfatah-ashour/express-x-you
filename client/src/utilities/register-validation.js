import * as yup from 'yup';

export const loginValidate = function (data) {
  return yup
    .object()
    .shape({
      email: yup
        .string()
        .required("'username' is required")
        .email('email is invalid')
        .min(3, "'username' must be more than 3 character")
        .max(55, "'username' must be less than 55 character"),
      password: yup
        .string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    })
    .validate(data);
};

export const registerValidate = async function (data) {
  return await yup
    .object()
    .shape({
      username: yup
        .string()
        .required("'username' is required")
        .min(3, "'username' must be more than 3 character")
        .max(55, "'username' must be less than 55 character"),
      email: yup
        .string()
        .required("'Email' is required")
        .email('email is invalid')
        .min(3, "'Email' must be more than 3 character")
        .max(55, "'Email' must be less than 55 character"),
      password: yup
        .string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      cPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    .validate(data);
};
