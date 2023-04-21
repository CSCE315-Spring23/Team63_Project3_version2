
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from "axios"
import MainLayout from '../Layouts/MainLayout';
import '../Layouts/CustomerLayout.css';
import '../Styles/Customer.css';

function Customer() {    
        // Use states for cart, products, and loading 
        const [cart, setCart] = useState([]);
        const [products, setProducts] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [totalAmount, setTotalAmount] = useState(0);

        // fetchProduct is an async function that shows if items are loading in (test function) but also loads in data from products 
        const fetchProduct = async() => {
            setIsLoading(true);
            const result = await axios.get('products');
            setProducts(await result.data);
            setIsLoading(false);
        }

        // addProductToCart allows user to press buttons to add to the receipt area
        const addProductToCart = async(product) =>{
            let findProductInCart = await cart.find(i=>{
                return i.id == product.id
            });

            if(findProductInCart) {
                let newCart = [];
                let newItem;
                cart.forEach(cartItem =>{
                    if(cartItem.id == product.id) {
                        newItem = {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                            totalAmount: cartItem.price * (cartItem.quantity + 1)
                        }

                        newCart.push(newItem);
                    }
                    else {
                        newCart.push(cartItem);
                    }
                });

                setCart(newCart);
            }
            else {
                let addingProduct = {
                    ...product,
                    'quantity': 1,
                    'totalAmount': product.price,
                }

                setCart([...cart, addingProduct]);
            }
        }

        useEffect(() => {
            fetchProduct();
        },[]);

        // keeps track of total amount
        useEffect(() => {
            let newTotalAmount = 0;
            cart.forEach(icart => {
                const temp_total = parseFloat(icart.totalAmount);
                newTotalAmount += parseFloat(temp_total.toFixed(2));
            })
            setTotalAmount(parseFloat(newTotalAmount.toFixed(2)));
        },[cart])

        // removes all items in cart
        const removeAllProductsFromCart = async() => {
            setCart([]);
            setTotalAmount(0);
        }

        // test function to print
        useEffect(() => {
            console.log(products);
        } ,[products]);

    return (
        <>
          {/* Navigation bar */}
          <div className="navbar">
            <img src="cabo_icon.png" alt="Logo" />
            <div className="navbar-right">
              <button>View Menu</button>
              <button>Staff Login</button>
            </div>
          </div>
    
          {/* Body */}
          <div className="container">
            <div className = "container-of-containers">
              
              {/* Bowls */}
              <h1> Bowls </h1> 
              {isLoading ? 'Loading' : <div className = "container-left"> 
                                       <button className = "custom-button"> Make-Your-Own Bowl </button>
                {products.filter((product) => product.type === 'bowl').map((product, key) =>
                  
                  <button key = {key} className = "product-button" onClick={()=>addProductToCart(product)}>
                    <img src={product.image} className="img-fluid" alt={product.name} />
                    <div className = "product-info">
                      <h3 className = "product-name">{product.name}</h3>
                      <p className = "product-price">${product.price}</p>
                    </div>
                  </button>
                )}
              </div>}

              {/* Burritos */}
              <h1> Burritos </h1>
              {isLoading ? 'Loading' : <div className = "container-left">
                                       <button className = "custom-button"> Make-Your-Own Burrito </button>
                {products.filter((product) => product.type === 'burrito').map((product, key) =>
                    <button key = {key} className = "product-button" onClick={()=>addProductToCart(product)}>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <div className = "product-info">
                        <h3 className = "product-name">{product.name}</h3>
                        <p className = "product-price">${product.price}</p>
                      </div>
                    </button>
                )}
              </div>}

              {/* CTacos */}
              <h1> Tacos </h1>
              {isLoading ? 'Loading' : <div className = "container-left">
                                       <button className = "custom-button"> Make-Your-Own Taco </button>
                {products.filter((product) => product.type === 'taco').map((product, key) =>
                    <button key = {key} className = "product-button" onClick={()=>addProductToCart(product)}>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <div className = "product-info">
                        <h3 className = "product-name">{product.name}</h3>
                        <p className = "product-price">${product.price}</p>
                      </div>
                    </button>
                )}
              </div>}

              {/* Other */}
              <h1> Other </h1>
              {isLoading ? 'Loading' : <div className = "container-left">
                {products.filter((product) => product.type === 'other').map((product, key) =>
                    <button key = {key} className = "product-button" onClick={()=>addProductToCart(product)}>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <div className = "product-info">
                        <h3 className = "product-name">{product.name}</h3>
                        <p className = "product-price">${product.price}</p>
                      </div>
                    </button>
                )}
              </div>}
            </div>

            {/* Right Container */}
            <div className="container-right">
              <h2>Order Details</h2>
              <div className='order-details'>

                {/* table */}
                <table className='order-table'>
                    <thead>
                        <tr>
                            {/* <td>#</td> */}
                            <td>Name</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        { cart ? cart.map((cartProduct, key) => <tr>
                            {/* <td>{cartProduct.id}</td> */}
                            <td>{cartProduct.name}</td>
                            <td>{cartProduct.price}</td>
                            <td>{cartProduct.quantity}</td>
                            <td>{(cartProduct.totalAmount * 100 / 100).toFixed(2)}</td>
                        </tr>)
                        : 'No Item in Cart' }
                    </tbody>
                </table>
              </div>

              {/* button panel */}
              <div className = 'button-panel'>
                <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
                <button className='cancel' onClick={removeAllProductsFromCart}>Cancel</button>
                <button className='confirm'>Confirm</button>
              </div>
            </div>
          </div>
        </>
      )
}

export default Customer