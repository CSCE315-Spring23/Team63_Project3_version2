
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from "axios"
import MenuLayout from '../Layouts/MenuLayout';
import '../Layouts/ServerLayout.css';

function Menu() {    
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
                return i.id === product.id
            });

            if(findProductInCart) {
                let newCart = [];
                let newItem;
                cart.forEach(cartItem =>{
                    if(cartItem.id === product.id) {
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
        <MenuLayout>

            <div className='row'>

                <td style={{fontSize: 50, fontFamily: 'Poppins'}}>Burritos:</td>
                <div className='col-lg-8'>
                {isLoading ? 'Loading' : <div className='row'>
                    {products.map((product, key) =>
                        <div key={key} className='col-lg-4 mb-4'>
                            {product.type==="burrito" &&
                            <button onClick={()=>addProductToCart(product)}>
                            <p style={{fontFamily: 'Poppins'}}>{product.name}</p>
                            <img src={product.image} className="img-fluid" alt={product.name} />
                            <p style={{fontFamily: 'Poppins'}}>${product.price}</p>
                            </button>
                            }
                        </div>
                    )}
                    </div>}
                </div>




                <td style={{fontSize: 50, fontFamily: 'Poppins'}}>Bowls:</td>
                <div className='col-lg-8'>
                {isLoading ? 'Loading' : <div className='row'>
                    {products.map((product, key) =>
                        <div key={key} className='col-lg-4 md-4'>
                            {product.type==="bowl" &&
                            <button onClick={()=>addProductToCart(product)}>
                            <p style={{fontFamily: 'Poppins'}}>{product.name}</p>
                            <img src={product.image} className="img-fluid" alt={product.name} />
                            <p style={{fontFamily: 'Poppins'}}>${product.price}</p>
                            </button>
                            }
                        </div>
                    )}
                    </div>}
                </div>


                <td style={{fontSize: 50, fontFamily: 'Poppins'}}>Tacos:</td>
                <div className='col-lg-8'>
                {isLoading ? 'Loading' : <div className='row'>
                    {products.map((product, key) =>
                        <div key={key} className='col-lg-4 mb-4'>
                            {product.type==="taco" &&
                            <button onClick={()=>addProductToCart(product)}>
                            <p style={{fontFamily: 'Poppins'}}>{product.name}</p>
                            <img src={product.image} className="img-fluid" alt={product.name} />
                            <p style={{fontFamily: 'Poppins'}}>${product.price}</p>
                            </button>
                            }
                        </div>
                    )}
                    </div>}
                </div>


                <td style={{fontSize: 50, fontFamily: 'Poppins'}}>Sides:</td>
                <div className='col-lg-8'>
                {isLoading ? 'Loading' : <div className='row'>
                    {products.map((product, key) =>
                        <div key={key} className='col-lg-4 mb-4'>
                            {product.type==="side" &&
                            <button onClick={()=>addProductToCart(product)}>
                            <p style={{fontFamily: 'Poppins'}}>{product.name}</p>
                            <img src={product.image} className="img-fluid" alt={product.name} />
                            <p style={{fontFamily: 'Poppins'}}>${product.price}</p>
                            </button>
                            }
                        </div>
                    )}
                    </div>}
                </div>


                <td style={{fontSize: 50, fontFamily: 'Poppins'}}>Drinks:</td>
                <div className='col-lg-8'>
                {isLoading ? 'Loading' : <div className='row'>
                    {products.map((product, key) =>
                        <div key={key} className='col-lg-4 mb-4'>
                            {product.type==="drink" &&
                            <button onClick={()=>addProductToCart(product)}>
                            <p style={{fontFamily: 'Poppins'}}>{product.name}</p>
                            <img src={product.image} className="img-fluid" alt={product.name} />
                            <p style={{fontFamily: 'Poppins'}}>${product.price}</p>
                            </button>
                            }
                        </div>
                    )}
                    </div>}
                </div>


                <td style={{fontSize: 50, fontFamily: 'Poppins'}}>Others:</td>
                <div className='col-lg-8'>
                {isLoading ? 'Loading' : <div className='row'>
                    {products.map((product, key) =>
                        <div key={key} className='col-lg-4 mb-4'>
                            {product.type==="other" &&
                            <button onClick={()=>addProductToCart(product)}>
                            <p style={{fontFamily: 'Poppins'}}>{product.name}</p>
                            <img src={product.image} className="img-fluid" alt={product.name} />
                            <p style={{fontFamily: 'Poppins'}}>${product.price}</p>
                            </button>
                            }
                        </div>
                    )}
                    </div>}
                </div>


                

                
            </div>
        </MenuLayout>
    )
}

export default Menu