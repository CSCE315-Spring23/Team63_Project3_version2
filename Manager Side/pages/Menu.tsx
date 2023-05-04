import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Menu.module.css';
import logo from '../images/cabo_icon.png';
import { useWeather } from '@/hooks/useWeather';
import WeatherBar from '@/components/WeatherBar';


/**
 * 
 * @returns a JSX elemet that returns the Menu Screen
 */
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

    const [myMap, setMyMap] = useState(new Map([[1, "https://media.istockphoto.com/id/1317280854/photo/mexican-rice-and-chicken-burrito.jpg?s=612x612&w=is&k=20&c=yhM5t2gNIA_NJi1IwVVUcFK7OghxZyFWCS-Tz1GAMUQ="], 
                                                [2, "https://media.istockphoto.com/id/475556736/photo/two-beef-steak-burritos.jpg?s=612x612&w=is&k=20&c=pzkVJ2V8vRSVafrJFXuRyBW7A0PJul_YG2VC0F0wKwc="],
                                                [3, "https://media.istockphoto.com/id/117179418/photo/burrito.jpg?s=612x612&w=is&k=20&c=I6-mKVDMQjhhmOpGTaJCxwNTVKghHJKOanbIHBLeUAY="],
                                                [4, "https://cdn.pixabay.com/photo/2018/07/01/16/00/eating-3509799_1280.jpg"],
                                                [5, "https://cdn.pixabay.com/photo/2015/05/31/13/02/salad-791643_1280.jpg"],
                                                [6, "https://cdn.pixabay.com/photo/2017/11/24/17/30/steak-2975331_1280.jpg"],
                                                [7, "https://cdn.pixabay.com/photo/2022/11/28/17/07/meatballs-7622499_1280.jpg"],
                                                [8, "https://cdn.pixabay.com/photo/2016/11/22/18/58/bowl-1850039_1280.jpg"],
                                                [9, "https://cdn.pixabay.com/photo/2019/09/28/16/55/tacos-4511272_1280.jpg"],
                                                [10, "https://cdn.pixabay.com/photo/2019/05/31/01/52/tacos-4241262_1280.jpg"],
                                                [11, "https://cdn.pixabay.com/photo/2015/11/02/20/27/taco-1018962_1280.jpg"],
                                                [12, "https://cdn.pixabay.com/photo/2016/01/20/20/50/tacos-1152345_1280.jpg"],
                                                [13, "https://cdn.pixabay.com/photo/2016/06/12/15/56/avocado-1452326_1280.jpg"],
                                                [14, "https://cdn.pixabay.com/photo/2020/09/02/17/49/nachos-5539014_1280.jpg"],
                                                [15, "https://cdn.pixabay.com/photo/2017/05/30/19/30/california-2357953_1280.jpg"],
                                                [16, "https://cdn.pixabay.com/photo/2014/09/26/19/51/drink-462776_1280.jpg"],
                                                [17, "https://cdn.pixabay.com/photo/2016/11/19/20/55/apples-1841132_1280.jpg"],
                                                [18, "https://cdn.pixabay.com/photo/2016/11/19/20/55/apples-1841132_1280.jpg"],
                                                [19, "https://cdn.pixabay.com/photo/2016/11/19/20/55/apples-1841132_1280.jpg"],
                                                [20, "https://cdn.pixabay.com/photo/2020/03/03/09/20/skittles-4898096_1280.jpg"]
                                                ]));

    function getValue(key: number) {
      return myMap.get(key);
    }


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

    const addProductToCart = async (product: product) => {
        let findProductInCart = await cart.find(i => {
            return i.itemNumber == product.itemNumber
        });

        if (findProductInCart) {
            let newCart: product[] = [];
            let newItem;
            cart.forEach(cartItem => {
                if (cartItem.itemNumber == product.itemNumber) {
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
    const { weatherData, loading } = useWeather();

    return (
        <>
            {/* Weather Bar */}
            {loading ? <div>Loading weather data...</div> : <WeatherBar weatherData={weatherData} />}
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
                <img className={styles.logo} src="cabo_logo.jpg" alt="Welcome To Cabo!" />
                <div className={styles.navbar_right}>
                    <a className={styles.navbar_button} href="Customer">Back to Order</a>
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
                    {products.filter((product) => product.food.toLowerCase().includes('bowl')).map((product, key) =>
                    
                        <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                            <img src={getValue(product.itemNumber)} className={styles.img_fluid} alt={product.food} />
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
                {products.filter((product) => product.food.toLowerCase().includes('burrito')).map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                        <img src={getValue(product.itemNumber)} className={styles.img_fluid} alt={product.food} />
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
                {products.filter((product) => product.food.toLowerCase().includes('taco')).map((product, key) =>
                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                        <img src={getValue(product.itemNumber)} className={styles.img_fluid} alt={product.food} />
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
                {products.filter((product) => !product.food.toLowerCase().includes('bowl'))
                .filter((product) => !product.food.toLowerCase().includes('burrito'))
                .filter((product) => !product.food.toLowerCase().includes('taco')).map((product, key) =>                    <button key = {key} className = {styles.product_button} onClick={()=>addProductToCart(product)}>
                        <img src={getValue(product.itemNumber)} className= {styles.img_fluid} alt={product.food} />
                        <div className = {styles.product_info}>
                            <p className = {styles.product_name}>{product.food}</p>
                            <p className = {styles.product_price}>${product.price}</p>
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