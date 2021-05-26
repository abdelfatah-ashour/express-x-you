import * as yup from 'yup';

export function createItemValidation(data) {
  const schema = yup.object().shape({
    nameItem: yup
      .string()
      .min(8, '👎🏻 name of item character must be more than "8"')
      .max(55)
      .required('👎🏻 name of item is incorrect'),
    category: yup
      .string()
      .min(1, '👎🏻 you must select category')
      .required('👎🏻 category is incorrect'),
    section: yup
      .string()
      .min(1, '👎🏻 you must select one select')
      .required('👎🏻 section is incorrect'),
    brand: yup
      .string()
      .min(1, '👎🏻 you must select one brand')
      .required('👎🏻 brand is incorrect'),
    price: yup
      .number()
      .min(10, '👎🏻 price must be more than or equal 10$ USD')
      .required('👎🏻 color is incorrect'),
    qty: yup
      .number()
      .min(1, '👎🏻 quantity must be more than 1 item')
      .required('👎🏻 qty is incorrect'),
    color: yup
      .string()
      .min(1, '👎🏻 you must select one Color')
      .required('👎🏻 color is incorrect'),
    fileItem: yup
      .string()
      .min(1, '👎🏻 you must select one Image Of File')
      .required('👎🏻 image product is required'),
  });
  return schema.validate(data);
}
