import React from 'react' ;
import "../stylings/payment.css" ;
import { useStateValue } from '../stateProvider';
import CheckOutProduct from './checkOutProduct';
import {Link , useHistory} from "react-router-dom" ;
import {CardElement , useStripe , useElements} from "@stripe/react-stripe-js" ;
import { useState , useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import axios from "../axios" ;
import {db} from "../firebase" ;
import {getBasketTotal} from "../reducer" ;

function Payment() {

    const [{basket , user} , dispatch] = useStateValue() ;
    console.log("hello there in payment.jsx " , basket) ;

    const history = useHistory() ;


    const stripe = useStripe() ;    // Stripe se payments k liye
    const elements = useElements() ;    // Stripe se payment k liye
    const [error , setError] = useState(null) ;
    const [disabled , setDisabled] = useState(true) ;
    const [processing , setProcessing] = useState("") ;
    const [succeeded , setSucceeded] = useState(false) ;
    const [clientSecret , setClientSecret] = useState("") ;

    // const getBasketTotal = () => {
    //     let total = 0 ;
    //     basket.forEach(product => {
    //         total += product.price ; 
    //     });
    //     return total ;
    // }

    useEffect(() => {

        // Generate stripe secret which allows us to charge the customer
        console.log(" in useEffect payment total " , getBasketTotal(basket)) ;
        const getClientSecret = async () => {
            const response = await axios({
                method : "POST" ,           // 100 se multiply kiya kyunki stripe payments ko base unit mein accept karega matlab Rs(dollars) ki jagah paise(cents) likhne honge
                url : `/payments/create?total=${getBasketTotal(basket)*100}`
            })
            console.log("hello there in payment.jsx useEffect response is : " , response) ;
            setClientSecret(response.data.clientSecret) ;
        }
        getClientSecret() ;
    }, [basket])

    console.log("hello there in payment.jsx Client Secret is " , clientSecret) ;

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        setProcessing(true) ;
                                                // clientSecret se hi pata chalta hai kitne ki payment karni hai
        const payload = await stripe.confirmCardPayment(clientSecret , {
            payment_method : {
                card : elements.getElement(CardElement),
            }
        }).then(({paymentIntent}) => {
            setSucceeded(true) ;
            setError(null) ;
            setProcessing(false) ;

            // Getting the order items(for Orders page) before we set basket item to empty
            db
                .collection("user")
                .doc(user?.uid)
                .collection("orders")
                .doc(paymentIntent.id)
                .set({
                    basket : basket ,
                    amount : paymentIntent.amount ,
                    created : paymentIntent.created ,
                }).then(() => {
                    console.log("Document successfully written! in payment");
                })
                .catch((error) => {
                    console.log("in payment Error writing document: ", error);
                });
            // user wale collection mein jaa kar particular user id wala document create kiya fir us bande k orders wale collection mein jaa kar particular payment id ko create kiya
            // ab us order wale collection mein basket, amount, created fields(columns) set karenge
            // dispatch({
            //     type : "EMPTY_BASKET" ,
            // })
            })
            .catch(err => {
                console.log("error in handleSubmit payment.jsx" , err) ;
            })
            history.replace("/orders") ;    // replace se current page jo hai wo replace ho jata hai aur payment button press karne k baad hum nahi chahte ki user fir usi page par aaye
                                            // par push se current page hat ta nahi to back jaane se wo payment wale page par aa jaayega

    }

    const handleChange = (e) => {
        console.log("Hello there in payment.jsx handleChange" , e) ;
        setDisabled(e.empty) ; // e.empty is a boolean. It is true when nothing is typed in card number else it is false
        setError(e.error ? e.error.message : "") ;
    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout {<Link to="/checkout">({basket?.length} items)</Link>}
                </h1>
                {/* Delivery Address */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 , Bose nagar</p>
                        <p>Jind, Haryana</p>
                    </div>
                </div>
                {/* Review Item */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {
                            basket.map(item => {
                                return(
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
                {/* Payment method */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Title</h3>
                    </div>
                    <div className="payment_detail">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>  {/* Stripe se payment k liye */}
                            <div className="payment_priceContainer">
                                <CurrencyFormat 
                                    renderText = {(value) => (
                                        <>
                                            <h5>Amount Payable ({basket.length} items) : <strong>{value}</strong></h5>
                                        </>
                                    )}
                                    value={getBasketTotal(basket)} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'Rs '} 
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing ? "Processing" : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {/* In case of error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment ;
