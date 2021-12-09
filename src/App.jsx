import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header" ;
import Home from "./components/home" ;
import {BrowserRouter as Router, Switch, Route} from "react-router-dom" ;
import Checkout from "./components/checkout" ;
import Login from "./components/login" ;
import React , {useEffect} from "react" ;
import { auth } from './firebase';
import {useStateValue} from "./stateProvider" ;
import Payment from "./components/payment" ;
import Orders from "./components/orders" ;
// For Payment below two libraries
import {loadStripe} from "@stripe/stripe-js" ;
import {Elements} from "@stripe/react-stripe-js" ;


// For integrating payment we used Stripe Payment Gateway. To use it, first create an account.
// Then in terminal install stripe packages
// npm i @stripe/stripe-js and then npm i @stripe/react-stripe-js

const promise = loadStripe("Your Own Stripe API Key") ;


function App() {

	const [{} , dispatch] = useStateValue() ;

	useEffect(() => {
		auth.onAuthStateChanged(authUser => {
			
			if(authUser){
				// User just logged in or the user is already logged in(in case page is refreshed)
				console.log("The user is (see in App.jsx > useEffect if) : " , authUser) ;
				dispatch({
					type : "SET_USER" ,
					user : authUser ,
				})
			}
			else{
				// The user is logged out
				console.log("The user is (see in App.jsx > useEffect else) : " , authUser) ;
				dispatch({
					type : "SET_USER" ,
					user : null ,	// jab user log out karega to user exist nahi karega isliyre null
				})
				
			}
		})
	}, []) // empty bracket means the useEffect does not depend on change of any value i.e. it will run only once
	// agar brackets[] mein kuch dalte to vo value jitni baar bhi change hoti utni baar ye useEffect wala chalta
	// par jab bracket khaali hain iska matlab hai kisi ki value change hone na hone se koi fark nahi padta ye sirf ek baar hi chalega

    return (
        <Router>
            <div className="App">
				{/* <Header/>	kyunki ye header har page par chahiye isliye route wagerah se koi lena dena nahi iska  */}
				<Switch>
					<Route path="/" exact>
						<Header/>
						<Home/>
					</Route>
					<Route path="/login" exact>
						<Login/>
					</Route>
					<Route path="/checkout" exact>
						<Header/>
						<Checkout/>
					</Route>
					<Route path="/payment" exact>
						<Header/>
						<Elements stripe={promise}> 	{/* Payment wale k liye */}
							<Payment/>
						</Elements>
					</Route>
					<Route path="/orders" exact>
						<Orders/>
					</Route>
				</Switch>
          	</div>
        </Router>
    );
}


export default App;
