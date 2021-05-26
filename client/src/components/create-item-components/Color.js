import React from 'react';
import { colors } from './create-item-data.json';
import { AiOutlineCheck } from 'react-icons/ai';
import Style from '../../styles/create-item.module.css';
export default function Color({ handleColor, currentColor }) {
  return (
    <div className="my-3">
      <label>Color</label>
      <div className="w-100 d-flex justify-content flex-wrap ps-5">
        {colors.map((color, i) => {
          return (
            <div
              className={Style.color}
              style={{ backgroundColor: '#' + color }}
              data-color={color}
              onClick={handleColor}
              key={i}
              name="color">
              {currentColor === color ? <AiOutlineCheck /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
