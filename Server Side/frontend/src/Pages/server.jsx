
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from "axios"
import mainlayout from '../Layouts/MainLayout'

function Server() {    
        // Use states for cart, products, and loading 
        const [cart, setCart] = useState([]);
        const [products, setProducts] = useState([]);
        const [isLoading, setIsLoading] = useState(false);

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

        // test function to print
        useEffect(() => {
            console.log(products);
        } ,[products]);

return (
    <mainlayout>
      <div className='row'>
        <header>
            <nav className='navbar navbar-light bg-primary'>
                <div className='conainer'>
                    <td style={{fontSize: 50}}>Server</td>
                </div>
            </nav>

        </header>
        <td style={{fontSize: 50}}>Entrees\Drinks</td>
        <div className='col-lg-8'>
          {isLoading ? 'Loading' : <div className='row'>
              {products.map((product, key) =>
                <div key={key} className='col-lg-4 mb-4'>
                    <button onClick={()=>addProductToCart(product)}>
                      <p>{product.name}</p>
                      <p>${product.price}</p>
                      </button>
                </div>
              )}
            </div>}
        </div>

        <div className='col-lg-4 mb-4'>
            <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                    <thead>
                        <td style={{ fontSize: 25}}>Order Details:</td>
                        <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Total</td>
                            <td>Action</td>

                        </tr>
                    </thead>
                    <tbody>
                        { cart ? cart.map((cartProduct, key) => <tr>
                            <td>{cartProduct.id}</td>
                            <td>{cartProduct.name}</td>
                            <td>{cartProduct.price}</td>
                            <td>{cartProduct.quantity}</td>
                            <td>{cartProduct.totalAmount}</td>
                            <td>
                                <button className='btn btn-danger btn-sm'>Remove</button>
                            </td>
                        </tr>)
                        : 'No Item in Cart' }
                        <td>Order Total: $0.00</td>
                        <button className='btn btn-danger btn-lg'>Cancel</button>
                        <button className='btn btn-success btn-lg'>Confirm</button>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </mainlayout>
    
    
)
}

export default Server