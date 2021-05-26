import React, { useContext } from 'react';
import { CreateItemStore } from '../context-api/CreateItem.context';
import { createItemValidation } from '../utilities/create-item-validation';
import { toast } from 'react-toastify';
import BasicField from '../components/create-item-components/BasicField';
import Categories from '../components/create-item-components/Categories';
import Sections from '../components/create-item-components/Sections';
import Brands from '../components/create-item-components/Brands';
import Details from '../components/create-item-components/DetailsItem';
import Color from '../components/create-item-components/Color';
import FileInput from '../components/create-item-components/FileInput';
import Submit from '../components/create-item-components/Submit';
import Layout from '../components/Layout';
import axios from '../utilities/axios';
import Style from '../styles/sale-item.module.css';
import { ToastError, ToastWarning } from '../utilities/Toaster';

export default function CreateItem() {
  const { CreateItem, setCreateItem } = useContext(CreateItemStore);

  const handleBasicInfo = e => {
    setCreateItem({
      ...CreateItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategory = e => {
    setCreateItem({
      nameItem: CreateItem.nameItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSection = e => {
    setCreateItem({
      nameItem: CreateItem.nameItem,
      category: CreateItem.category,
      [e.target.name]: e.target.value,
    });
  };

  const handleBrand = e => {
    setCreateItem({
      nameItem: CreateItem.nameItem,
      category: CreateItem.category,
      section: CreateItem.section,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetails = e => {
    setCreateItem({
      ...CreateItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleColor = e => {
    setCreateItem({
      ...CreateItem,
      [e.target.getAttribute('name')]: e.target.getAttribute('data-color'),
    });
  };

  const handleSelectFile = e => {
    setCreateItem({
      ...CreateItem,
      [e.target.name]: e.target.files[0],
    });
  };

  const propsOfNameItem = {
    name: 'nameItem',
    type: 'text',
    id: 'nameItem',
    label: 'name item',
    handleChange: handleBasicInfo,
    placeholder: 'type name Item',
  };

  const propsOfColor = {
    handleColor: handleColor,
    currentColor: CreateItem.color,
  };

  const propsOfQty = {
    name: 'qty',
    type: 'number',
    id: 'qty',
    label: 'QTY',
    handleChange: handleBasicInfo,
    placeholder: 'QTY of item',
  };

  const propsOfPrice = {
    name: 'price',
    type: 'number',
    id: 'price',
    label: 'price USD $',
    handleChange: handleBasicInfo,
    placeholder: 'PRICE with USD$',
  };

  const propsOfSection = {
    handleChange: handleSection,
  };

  const propsOfBrand = {
    handleChange: handleBrand,
  };

  const propsOfDetails = {
    handleChange: handleDetails,
  };

  const propsOfDescription = {
    name: 'description',
    type: 'text',
    id: 'description',
    label: 'Description',
    handleChange: handleBasicInfo,
    placeholder: 'description',
  };

  const handleSubmit = async e => {
    let formData = new FormData();
    for (const key in CreateItem) {
      formData.append(key, CreateItem[key]);
    }
    e.preventDefault();

    await createItemValidation(CreateItem)
      .then(async () => {
        await axios
          .post('/api/product', formData)
          .then(() => {
            toast.success('🚀 created success , item is pending', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch(error => {
            if (error.response) {
              ToastError('☢ ' + error.response.data.message);
            } else {
              ToastWarning('🥱 something went wrong!');
            }
          });
      })
      .catch(error => {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <Layout
        title="CREATE NEW ITEM"
        description="share your item and feel free to sale it">
        <div className={Style.saleItem}>
          <BasicField {...propsOfNameItem} />
          <Categories handleChange={handleCategory} />
          {CreateItem.category && CreateItem.category.length > 0 && (
            <Sections {...propsOfSection} />
          )}
          {CreateItem.section && CreateItem.section.length > 0 && (
            <Brands {...propsOfBrand} />
          )}
          {CreateItem.brand && CreateItem.brand.length > 0 && (
            <>
              <Details {...propsOfDetails} />
              <Color {...propsOfColor} />
              <BasicField {...propsOfQty} />
              <BasicField {...propsOfPrice} />
              <BasicField {...propsOfDescription} />
              <FileInput handleSelectFile={handleSelectFile} />
              <Submit handleSubmit={handleSubmit} />
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideRender(ctx) {
  if (!ctx.req.cookies.auth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
