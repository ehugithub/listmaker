import React from 'react';
import { itemobj } from './App';
import { FC } from 'react';
import ItemList from './ItemList';

type IContentProps = {
    items: itemobj[],
    handleCheck: (id: number) => void,
    handleDelete: (id: number) => void,
    length: number,
    search: string
};

const Content:FC<IContentProps> = ({ items, handleCheck, handleDelete, length, search }) => {
    if(items.length !== 0) {
        return (
            <>
                <ItemList
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            </>
        )
    }
    else if(search === '') {
        return (
            <>
                <p style={{marginTop: '2rem'}}>この列挙は虚しいです！</p>
            </>
        )
    }
    else {
        return(
            <>
                <p style={{marginTop: '2rem'}}>No items match your search</p>
            </>
        )
    }

};
export default Content;