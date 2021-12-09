import React from 'react' ;
import "../stylings/checkout.css" ;
import Subtotal from "./subtotal" ;
import { useStateValue } from '../stateProvider';
import CheckOutProduct from './checkOutProduct';

function Checkout() {

    const [{basket , user}] = useStateValue() ;

    return (
        <div className="checkout">
            <div className="checkout_left">
                <img
                    src="https://th.bing.com/th/id/OIP.AXWIf6AfE1w5IA5s8wwx0QHaEK?w=263&h=180&c=7&o=5&dpr=1.25&pid=1.7" 
                    alt="flower image" 
                />
                <div>
                    <h2>{user?.email}</h2> {/* ?. optional chaining hai matlab agar user exist karta hai(matlab null nahi hai) tabhi uska email show ho */}
                    <h2 className="checkout_title">Your Shopping Basket</h2>
                    {
                        basket.map(item => {
                            // console.log("In checkout" + item) ;
                            return (
                            <CheckOutProduct 
                                key={item.id}
                                id={item.id}
                                image={item.image} 
                                alternate={item.alternate} 
                                title={item.title} 
                                price={item.price} 
                                rating={item.rating} 
                                description={item.description}
                            />)
                        })
                    }
                </div>
            </div>

            <div className="checkout_right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout ;
