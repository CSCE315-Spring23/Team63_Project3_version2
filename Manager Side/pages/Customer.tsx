import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Customer.module.css';

function Customer(): JSX.Element {

    interface product {
        itemNumber: number;
        food: string;
        price: number;
        image: string;
        totalAmount: number;
        quantity: number;
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

    // useEffect(() => {
    //     fetchProduct();
    // },[]);

    // keeps track of total amount
    useEffect(() => {
        let newTotalAmount = 0;
        cart.forEach(icart => {
            const temp_total = icart.totalAmount;
            newTotalAmount += parseFloat(temp_total.toFixed(2));
        })
        setTotalAmount(parseFloat(newTotalAmount.toFixed(2)));
    },[cart])

    // removes all items in cart
    const removeAllProductsFromCart = async() => {
        setCart([]);
        setTotalAmount(0);
    }


    return (
        <>
          
          {/* Navigation bar */}
          <div className={styles.navbar}>
            <img src="cabo_icon.png" alt="Logo" />
            <div className={styles.navbar_right}>
              <a className={styles.navbar_button}>View Menu</a>
              <a className={styles.navbar_button} href = "GoogleAuth">Staff Login</a>
            </div>
          </div>
    
          {/* Body */}
          <div className={styles.container}>
            <div className = {styles.container_of_containers}>

              {/* add before map */}
              {/* filter((product) => product.type === 'other'). */}
              
              {/* Bowls */}
              <h1> Bowls </h1> 
              {isLoading ? 'Loading' : <div className={styles.container_left}> 
                                       <button className={styles.custom_button}> Make-Your-Own Bowl </button>
                {products.map((product, key) =>
                  
                  <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                    <img src={product.image} className={styles.img_fluid} alt={product.food} />
                    <div className = {styles.product_info}>
                      <h3 className = {styles.product_name}>{product.food}</h3>
                      <p className = {styles.product_price}>${product.price}</p>
                    </div>
                  </button>
                )}
              </div>}

              {/* Burritos */}
              <h1> Burritos </h1>
              {isLoading ? 'Loading' : <div className = {styles.container_left}>
                                       <button className = {styles.custom_button}> Make-Your-Own Burrito </button>
                {products.map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                      <img src={product.image} className={styles.img_fluid} alt={product.food} />
                      <div className = {styles.product_info}>
                        <h3 className = {styles.product_name}>{product.food}</h3>
                        <p className = {styles.product_price}>${product.price}</p>
                      </div>
                    </button>
                )}
              </div>}

              {/* Tacos */}
              <h1> Tacos </h1>
              {isLoading ? 'Loading' : <div className = {styles.container_left}>
                                       <button className = {styles.custom_button}> Make-Your-Own Taco </button>
                {products.map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                      <img src={product.image} className={styles.img_fluid} alt={product.food} />
                      <div className = {styles.product_info}>
                        <h3 className = {styles.product_name}>{product.food}</h3>
                        <p className = {styles.product_price}>${product.price}</p>
                      </div>
                    </button>
                )}
              </div>}

              {/* Other */}
              <h1> Other </h1>
              {isLoading ? 'Loading' : <div className = {styles.container_left}>
                {products.map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                      <img src={product.image} className={styles.img_fluid} alt={product.food} />
                      <div className = {styles.product_info}>
                        <h3 className = {styles.product_name}>{product.food}</h3>
                        <p className = {styles.product_price}>${product.price}</p>
                      </div>
                    </button>
                )}
              </div>}
            </div>

            {/* Right Container */}
            <div className={styles.container_right}>
              <h2>Order Details</h2>
              <div className={styles.order_details}>

                {/* table */}
                <table className={styles.order_table}>
                    <thead className={styles.table_head}>
                        <tr>
                            {/* <td>#</td> */}
                            <td className = {styles.table_desc}>Name</td>
                            <td className = {styles.table_desc}>Price</td>
                            <td className = {styles.table_desc}>Qty</td>
                            <td className = {styles.table_desc}>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        { cart ? cart.map((cartProduct, key) => <tr>
                            {/* <td>{cartProduct.id}</td> */}
                            <td className = {styles.table_desc}>{cartProduct.food}</td>
                            <td className = {styles.table_desc}>{cartProduct.price}</td>
                            <td className = {styles.table_desc}>{cartProduct.quantity}</td>
                            <td className = {styles.table_desc}>{(cartProduct.totalAmount * 100 / 100).toFixed(2)}</td>
                        </tr>)
                        : 'No Item in Cart' }
                    </tbody>
                </table>
              </div>

              {/* button panel */}
              <div className = {styles.button_panel}>
                <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
                <button className={styles.cancel} onClick={removeAllProductsFromCart}>Cancel</button>
                <button className={styles.confirm}>Confirm</button>
              </div>
            </div>
          </div>
        </>
      )


}

export default Customer;