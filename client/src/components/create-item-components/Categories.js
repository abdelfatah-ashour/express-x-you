import React from 'react';
import { Categories } from './create-item-data.json';
import FieldSelect from './FieldSelect';
import { PropsOfField } from './handleProps';

export default function category({ handleChange }) {
  const propsOfCategory = new PropsOfField(
    'category',
    'Category',
    Categories,
    handleChange
  );
  return <FieldSelect {...propsOfCategory} />;
}
