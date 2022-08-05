import React from 'react';
import { FC } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { itemobj } from './App';

type ILineItemProps = {
    item: itemobj,
    handleCheck: (id: number) => void,
    handleDelete: (id: number) => void
};

const LineItem:FC<ILineItemProps> = ({ item, handleCheck, handleDelete }) => {
    return (
        <li className="item">
            <input
                type="checkbox"
                onChange={() => handleCheck(item.id)}
                checked={ item.checked }
            />
            <label
                style={(item.checked) ? {textDecoration: 'line-through'} : undefined}
                onDoubleClick = {() => handleCheck(item.id)}
            >{item.item}</label>
            <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex={0}
                area-label={`Delete ${item.item}`}
            />
        </li>
    )
};

export default LineItem;