import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Menu.module.css';
import logo from '../images/cabo_icon.png';

function Menu(): JSX.Element {

    interface product {
        itemNumber: number;
        food: string;
        price: number;
        image: string;
        totalAmount: number;
        quantity: number;
        type: string;
    }


    const [cart, setCart] = useState<product[]>([]);
    const [products, setProducts] = useState<product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);


    // fetchProduct is an async function that shows if items are loading in (test function) but also loads in data from products 
    useEffect(() => {
        const fetchProduct = async () => {
          setIsLoading(true);
          console.log("Before axios request");
          try {
            const response = await axios.get("http://127.0.0.1:8000/menu");
            console.log(response.data);
            setProducts(response.data);
          } catch (error) {
            console.log(error);
          }
          setIsLoading(false);
          console.log("After axios request");
        };
        fetchProduct();
      }, []);

    /*

    get all data from the table
    create an array that will be used to display items in the cart
    
    */

    const addProductToCart = async(product: product) =>{
        let findProductInCart = await cart.find(i=>{
            return i.itemNumber == product.itemNumber
        });

        if(findProductInCart) {
            let newCart: product[] = [];
            let newItem;
            cart.forEach(cartItem =>{
                if(cartItem.itemNumber == product.itemNumber) {
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

    // removes all items in cart

    const burritos = products.filter(product => product.type === 'burrito' || true);
    const numBurritos = burritos.length;
    
    return (
        <>
          <style jsx global>{`
            body{
              margin: 0;
              padding: 0;
              font-family: Poppins;
              overflow-y: scroll;
              font-weight: 500;
              background-color: #9fb0a8;
            }
          `}</style>
            {/* Navigation bar */}
            <div className={styles.navbar}>
                <img className={styles.logo} src="cabo_logo.jpg" alt="Welcome To Cabo!"/>
                <div className={styles.navbar_right}>
                  <a className={styles.navbar_button} href = "Customer">Back to Order</a>
                </div>
            </div>

            {/* Body */}
            <div className={styles.container}>
            <div className = {styles.container_of_containers}>

                <h1>Entrees: Make your own for $10.99 or check out our options!</h1>
              
                {/* Bowls */}
                <h3> Bowls: </h3> 
                
                    {isLoading ? 'Loading' : <div className = {styles.container_left}> 
                                            <div className = {styles.animation}>
                    {products.map((product, key) =>
                    
                        <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                            <img src={product.image} className={styles.img_fluid} alt={product.food} />
                            <div className = {styles.product_info}>
                                <p className = {styles.product_name}>{product.food}</p>
                                <p className = {styles.product_price}>${product.price}</p>
                            </div>
                        </button>
                    )}
                    </div>
                    </div>}
                

                {/* Burritos */}
                <h3> Burritos </h3>
                {isLoading ? 'Loading' : <div className = {styles.container_left}>
                                        <div className = {styles.animation}>
                {products.map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                        <img src={product.image} className={styles.img_fluid} alt={product.food} />
                        <div className = {styles.product_info}>
                            <p className = {styles.product_name}>{product.food}</p>
                            <p className = {styles.product_price}>${product.price}</p>
                        </div>
                    </button>
                    )}
                </div>
                </div>}

                {/* Tacos */}
                <h3> Tacos </h3>
                {isLoading ? 'Loading' : <div className = {styles.container_left}>
                                        <div className = {styles.animation}>
                {products.map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                        <img src={product.image} className={styles.img_fluid} alt={product.food} />
                        <div className = {styles.product_info}>
                            <p className = {styles.product_name}>{product.food}</p>
                            <p className = {styles.product_price}>${product.price}</p>
                        </div>
                    </button>
                )}
                </div>
                </div>}

                {/* Other */}
                <h1> Sides </h1>
                {isLoading ? 'Loading' : <div className = {styles.container_left}>
                                        <div className = {styles.animation}>
                {products.map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                        <img src={product.image} className= {styles.img_fluid} alt={product.food} />
                        <div className = {styles.product_info}>
                            <p className = {styles.product_name}>{product.food}</p>
                            <p className = {styles.product_price}>${product.price}</p>
                        </div>
                    </button>
                )}
                </div>
                </div>}
            </div>

            <div className = {styles.container_of_containers}>
                <h1>Other</h1>
                {isLoading ? 'Loading' : <div className = {styles.container_left}>
                                        <div className = {styles.animation}>
                {products.map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                        <img src={product.image} className= {styles.img_fluid} alt={product.food} />
                        <div className = {styles.product_info}>
                            <p className = {styles.product_name}>{product.food}</p>
                            <p className = {styles.product_price}>${product.price}</p>
                        </div>
                    </button>
                )}
                </div>
                </div>}
            </div>

            <div className = {styles.container_of_containers}>
                <h1>Extras</h1>
                {isLoading ? 'Loading' : <div className = {styles.container_left}>
                                        <div className = {styles.animation}>
                {products.map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                        <img src={product.image} className= {styles.img_fluid} alt={product.food} />
                        <div className = {styles.product_info}>
                            <p className = {styles.product_name}>{product.food}</p>
                            <p className = {styles.product_price}>${product.price}</p>
                        </div>
                    </button>
                )}
                </div>
                </div>}
            </div>

            {/* Right Container */}
            <div className={styles.container_right}>
                <h2>Daily Deals</h2>
                <div className={styles.special_details}>
                  <ul>
                    <li>50% off Tacos</li>
                    <li>Free drink when you buy any side!</li>
                  </ul>
                </div>
            </div>
        </div>
      </>
      )


}

export default Menu;