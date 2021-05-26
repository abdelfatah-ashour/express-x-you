import React, { useContext } from 'react';

import FieldSelect from './FieldSelect';

import { PropsOfField } from './handleProps';

import {
  brandOfCamera,
  brandOfLaptop,
  brandOfMobiles,
  brandOfTV,
} from './create-item-data.json';

import { CreateItemStore } from '../../context-api/CreateItem.context';

export default function Brands({ handleChange }) {
  const { CreateItem } = useContext(CreateItemStore);

  const propsOfMobiles = new PropsOfField(
    'brand',
    'brand of mobiles',
    brandOfMobiles,
    handleChange
  );
  const propsOfLaptops = new PropsOfField(
    'brand',
    'brand of laptops',
    brandOfLaptop,
    handleChange
  );
  const propsOfTV = new PropsOfField(
    'brand',
    'brand of TV',
    brandOfTV,
    handleChange
  );
  const propsOfCamera = new PropsOfField(
    'brand',
    'brand of camera',
    brandOfCamera,
    handleChange
  );

  return (
    <>
      {CreateItem.category === 'electronics' &&
        CreateItem.section === 'mobiles' && <FieldSelect {...propsOfMobiles} />}

      {CreateItem.category === 'electronics' &&
        CreateItem.section === 'laptops' && <FieldSelect {...propsOfLaptops} />}

      {CreateItem.category === 'electronics' &&
        CreateItem.section === 'camera' && <FieldSelect {...propsOfCamera} />}

      {CreateItem.category === 'electronics' && CreateItem.section === 'tv' && (
        <FieldSelect {...propsOfTV} />
      )}
    </>
  );
}
