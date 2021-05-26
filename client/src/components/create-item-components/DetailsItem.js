import React, { useContext } from 'react';
import { CreateItemStore } from '../../context-api/CreateItem.context';
import FieldSelect from './FieldSelect';
import {
  sizeOfRam,
  sizeOfHardComputer,
  sizeOfMemoryMobile,
  inchOfLaptops,
  inchOfTV,
  typeOfDisplayTv,
  effectiveMegapixels,
  videoCaptureResolution,
} from './create-item-data.json';
import { PropsOfField } from './handleProps';

export default function DetailsItem({ handleChange }) {
  const { CreateItem } = useContext(CreateItemStore);

  const ram = new PropsOfField('ram', 'RAM', sizeOfRam, handleChange);

  const memoryMobile = new PropsOfField(
    'memory',
    'ROM Memory',
    sizeOfMemoryMobile,
    handleChange
  );

  const hardComputer = new PropsOfField(
    'hard',
    'size Of hard',
    sizeOfHardComputer,
    handleChange
  );

  const inchLaptops = new PropsOfField(
    'inchLaptops',
    'display inch',
    inchOfLaptops,
    handleChange
  );

  const inchTv = new PropsOfField(
    'inchTv',
    'display inch',
    inchOfTV,
    handleChange
  );

  const typeDisplayTv = new PropsOfField(
    'typeDisplay',
    'display type',
    typeOfDisplayTv,
    handleChange
  );

  const effectiveMegapixelsProps = new PropsOfField(
    'effectiveMegapixels',
    'Effective Mega pixels with MP',
    effectiveMegapixels,
    handleChange
  );

  const videoCaptureResolutionProps = new PropsOfField(
    'videoCaptureResolution',
    'Video Capture Resolution',
    videoCaptureResolution,
    handleChange
  );

  return (
    <>
      {/* electronics */}
      {CreateItem.section === 'mobiles' && (
        <>
          <FieldSelect {...ram} />
          <FieldSelect {...memoryMobile} />
        </>
      )}
      {CreateItem.section === 'laptops' && (
        <>
          <FieldSelect {...ram} />
          <FieldSelect {...hardComputer} />
          <FieldSelect {...inchLaptops} />
        </>
      )}
      {CreateItem.section === 'tv' && (
        <>
          <FieldSelect {...inchTv} />
          <FieldSelect {...typeDisplayTv} />
        </>
      )}
      {CreateItem.section === 'camera' && (
        <>
          <FieldSelect {...effectiveMegapixelsProps} />
          <FieldSelect {...videoCaptureResolutionProps} />
        </>
      )}
    </>
  );
}
