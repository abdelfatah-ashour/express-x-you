import React, { useContext } from 'react';
import { sectionsOfElectronics } from './create-item-data.json';
import FieldSelect from './FieldSelect';
import { PropsOfField } from './handleProps';
import { CreateItemStore } from '../../context-api/CreateItem.context';

export default function Sections({ handleChange }) {
  const { CreateItem } = useContext(CreateItemStore);

  const propsOfElectronics = new PropsOfField(
    'section',
    'section',
    sectionsOfElectronics,
    handleChange
  );

  return (
    <>
      {CreateItem.category === 'electronics' && (
        <FieldSelect {...propsOfElectronics} />
      )}
    </>
  );
}
