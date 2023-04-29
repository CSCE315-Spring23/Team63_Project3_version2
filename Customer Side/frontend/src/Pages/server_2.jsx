import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from "axios"
import MainLayout from '../Layouts/MainLayout';
import '../Layouts/ServerLayout.css';
import '../Styles/server.css';

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
            <img src="logo.png" alt="Logo" />
            <div className="navbar-right">
              <button>View Menu</button>
              <button>Staff Login</button>
            </div>
          </div>
    
          {/* Body */}
          <div className="container">
            <div className="container-left">
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
              <div>Item 5</div>
              <div>Item 6</div>
              <div>Item 7</div>
              <div>Item 8</div>
              <div>Item 9</div>
              <div>Item 10</div>
            </div>
            <div className="container-right">
              <div>Add to Cart</div>
              <button className="confirm">Confirm</button>
              <button className="cancel">Cancel</button>
            </div>
          </div>
        </>
      );
}

export default Customer