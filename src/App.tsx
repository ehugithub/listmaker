import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

type itemobj = {
  item: string,
  id: number,
  checked: boolean
};

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState<itemobj[]>([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err: any) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    (async () => await fetchItems())();
    /*
    setTimeout(() => {
    }, 2000)
    */
  }, []);

  const handleCheck = async (id : number) => {
    const listItems = items.map ((item : itemobj) => item.id === id ? {...item, checked: !item.checked} : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions =  {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id : number) => {
    const listItems = items.filter((item: itemobj) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);

  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  const addItem = async (newItem: string) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myitem = {item: newItem, id, checked: false};
    const listItems = [...items, myitem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myitem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  return (
    <div className="App">
      <Header title = "Groceries List"/>
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          length={items.length}
          search={search}
        />}
      </main>
      <Footer
        length={items.length}
      />
    </div>
  )
};

export type { itemobj };
export default App;
