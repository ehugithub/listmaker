import React from 'react';
import { FC } from 'react';
import { itemobj } from './App';
import LineItem from './LineItem';

type IItemListProps = {
    items: itemobj[],
    handleCheck: (id: number) => void,
    handleDelete: (id: number) => void
};

const ItemList:FC<IItemListProps> = ({ items, handleCheck, handleDelete }) => {
    return (
        <ul>
            {items.map((item: itemobj) => 
                <LineItem
                    item={item}
                    key={item.id}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            )}
        </ul>
    )
};

export default ItemList;