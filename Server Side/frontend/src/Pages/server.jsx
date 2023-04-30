
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from "axios"
// import MainLayout from '../Layouts/MainLayout';
// import '../Layouts/ServerLayout.css';

function Server() {    
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
        // <MainLayout>
            <div className='row'>
                <td style={{fontSize: 50, fontFamily: 'Poppins'}}>Entrees\Drinks</td>
                <div className='col-lg-8'>
                {isLoading ? 'Loading' : <div className='row'>
                    {products.map((product, key) =>
                        <div key={key} className='col-lg-4 mb-4'>
                            <button onClick={()=>addProductToCart(product)}>
                            <p style={{fontFamily: 'Poppins'}}>{product.name}</p>
                            <p style={{fontFamily: 'Poppins'}}>${product.price}</p>
                            </button>
                        </div>
                    )}
                    </div>}
                </div>

                <div className='col-lg-4 mb-4'>
                    <div className='table-responsive'>
                        <table className='table table-responsive table-hover'>
                            <thead>
                                <td style={{fontFamily: 'Poppins', fontSize: 25}}>Order Details:</td>
                                <tr>
                                    <td style={{fontFamily: 'Poppins'}}>#</td>
                                    <td style={{fontFamily: 'Poppins'}}>Name</td>
                                    <td style={{fontFamily: 'Poppins'}}>Price</td>
                                    <td style={{fontFamily: 'Poppins'}}>Qty</td>
                                </tr>
                            </thead>
                            <tbody>
                                { cart ? cart.map((cartProduct, key) => <tr>
                                    <td>{cartProduct.id}</td>
                                    <td>{cartProduct.name}</td>
                                    <td>{cartProduct.price}</td>
                                    <td>{cartProduct.quantity}</td>
                                    <td>{cartProduct.totalAmount}</td>
                                </tr>)
                                : 'No Item in Cart' }
                                <button style={{fontFamily: 'Poppins', backgroundColor: 'white', color: 'black'}} className='btn btn-danger btn-lg' onClick={removeAllProductsFromCart}>Cancel</button>
                                <button style={{fontFamily: 'Poppins', backgroundColor: 'white', color: 'black'}} className='btn btn-success btn-lg'>Confirm</button>
                            </tbody>
                        </table>
                    <h2 style={{fontFamily: 'Poppins'}}>Total Amount: {totalAmount}</h2>
                    </div>
                </div>
            </div>
        {/* </MainLayout> */}
    )
}

export default Server