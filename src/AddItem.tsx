import React from 'react';
import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

type IAddItemProps = {
    newItem: string,
    setNewItem: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: (e: any) => void
}

const AddItem:FC<IAddItemProps> = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor='addForm'>Add Form</label>
            <input
                autoFocus
                ref={ inputRef }
                id='addItem'
                type='text' 
                placeholder='項目を足してください'
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add item'
                onClick={() => {
                    if(inputRef.current !== null) {
                        inputRef.current.focus()
                    }
                }}
            ><FaPlus/></button>
        </form>
    )

};

export default AddItem;