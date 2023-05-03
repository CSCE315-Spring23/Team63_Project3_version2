import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

// this code has been peer reviewed by the manager of this Project

export default function Inventory() {

    interface MenuItem {
        item_number: number;
        food: string;
        price: number;
      }

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);

  const [itemNum, setItemNum] = useState('');

  const [newItemName, setNewItemName] = useState('');

  const [newItemPrice, setNewItemPrice] = useState('');

  const [newItemIngredients, setNewItemIngredients] = useState('');

  const [updatePrice, setUpdatePrice] = useState<{ [item_num: number]: string }>({});

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!itemNum) {
      console.error('Error: itemNum is empty');
      return;
    }

    axios.delete('http://127.0.0.1:8000/menu/delete', {
      params: {
        itemNum: itemNum
      }
    })
    .then(response => {
      console.log('Item deleted successfully:', response.data);

      axios.get('http://127.0.0.1:8000/menu')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error getting menu items:', error);
      });

    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
    
    setItemNum('');
  }

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const price = parseFloat(newItemPrice);

    axios.post('http://127.0.0.1:8000/menu/add', {newItemName, price, newItemIngredients})
    .then(response => {
      console.log('Item added successfully:', response.data);

      axios.get('http://127.0.0.1:8000/menu')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error getting menu items:', error);
      });

    })
    .catch(error => {
      console.error('Error adding item:', error);
    });
    
    setNewItemName('');
    setNewItemPrice('');
    setNewItemIngredients('');
  }

  const handlePriceChange = (item_num: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePrice({
      ...updatePrice,
      [item_num]: event.target.value
    });
  };

  const handlePriceChangeSubmit = (item_num: number, price: number) => {

      axios.put('http://127.0.0.1:8000/menu/edit', {item_num, price}) 
        .then(response => {
          console.log('changed menu item ' + item_num + ' to ' + price)

          axios.get('http://127.0.0.1:8000/menu')
            .then(response => {
              setMenuItems(response.data);
            })
            .catch(error => {
              console.error('Error getting menu items:', error);
            });
          
        })
        .catch(error => console.log(error));

        setUpdatePrice({
          ...updatePrice,
          [item_num]: ''
        });
  }

  const openDeleteForm = () => {
    setShowDeleteForm(true);
  }

  const closeDeleteForm = () => {
    setShowDeleteForm(false);
  }

  const openAddForm = () => {
    setShowAddForm(true);
  }

  const closeAddForm = () => {
    setShowAddForm(false);
  }

  useEffect(() => {
    console.log("Before axios request");
    axios.get('http://127.0.0.1:8000/menu')
    .then(response => {
        
        setMenuItems(response.data);
    })
    .catch(error => console.log(error));

  }, []);


  return (
    <div>
    <table className="table">
        <thead>
        <button className='menuButton' onClick={openDeleteForm}>Delete Menu Item</button>
            {showDeleteForm && (
            <div>
              <form className='deleteMenuForm' onSubmit={handleDeleteSubmit}>
              <label>
                Item Number:&nbsp;
                <input type="text" value={itemNum} onChange={(e) => setItemNum(e.target.value)} />
              </label>
              <input type="submit" value="Submit" />
              <button type='button' onClick={closeDeleteForm}>Close</button>
            </form>
            </div>
            )}
        <button className='menuButton' onClick={openAddForm}>Add Menu Item</button>
            {showAddForm && (
            <div>
              <form className='deleteMenuForm' onSubmit={handleAddSubmit}>
              <label>
                Item Name:&nbsp;
                <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
              </label>
              <label>
                Price:&nbsp;
                <input type="text" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} />
              </label>
              <label>
                Ingredients:&nbsp;
                <input type="text" value={newItemIngredients} onChange={(e) => setNewItemIngredients(e.target.value)} />
              </label>
              <input type="submit" value="Submit" />
              <button type='button' onClick={closeAddForm}>Close</button>
            </form>
            </div>
            )}
        <tr>
            <th>#</th>
            <th>Food</th>
            <th>Price</th>
            <th>Update</th>
        </tr>
        </thead>
        <tbody>
        {menuItems.map((item, index) => (
            <tr key={item.item_number}>
            <td>{index+1}</td>
            <td>{item.food}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
              <input type="text" value={updatePrice[index+1]} onChange={(e) => handlePriceChange(index+1, e)}/>
              <button className='inventoryButton' onClick={() => handlePriceChangeSubmit(index+1, parseFloat(updatePrice[index+1] || '0'))}>Set</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  )
}
