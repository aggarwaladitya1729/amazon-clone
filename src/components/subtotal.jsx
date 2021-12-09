import React from 'react' ;
import "../stylings/subtotal.css" ;
import CurrencyFormat from "react-currency-format" ;
import {useStateValue} from "../stateProvider"
import { useHistory } from 'react-router-dom';

function Subtotal() {

    const [{basket} , dispatch] = useStateValue() ;
    let total = 0 ;
    basket.forEach(product => {
        total += product.price ; 
    });

    const history = useHistory() ;

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText = {(value) => (
                    <>
                        <p>Subtotal of {basket.length} items : <strong>{value}</strong></p>
                        <small className="subtotal__gift"><input type="checkbox"/> This order contains gifts</small>
                    </>
                )}
                value={total} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'Rs '} 
            />
            <button onClick={e => history.push("./payment")}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
