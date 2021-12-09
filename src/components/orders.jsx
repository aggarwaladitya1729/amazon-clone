import React from 'react' ;
import { useState } from 'react';
import "../stylings/orders.css" ;
import {useStateValue} from "../stateProvider" ;
import {db} from "../firebase" ;
import { useEffect } from 'react';
import SingleOrder from './singleOrder';

function Orders() {

    const [{basket , user} , dispatch] = useStateValue() ;
    const [orders , setOrders] = useState([]) ;

    useEffect(() => {
        
        if(user){
            console.log("hello in useEffect db is " , db , user.uid) ;
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created' , 'desc')
            .onSnapshot(snapshot => {
                console.log('hello in on snapshot' , snapshot) ;
                return (
                setOrders(snapshot.docs.map(doc => {
                    console.log("Document exists or not in setOrders map" , doc.exists) ;
                    return (
                        {
                            id : doc.id ,
                            data : doc.data() ,
                        }
                    )
                })))
            } , err => {
                console.log("Error in snapshot" , err)
            })
            console.log("bye in useEffect orders are" , orders) ;
        }
    } , [user])

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders_container">
                {console.log("orders" , orders)}
                {
                    orders?.map((order) => {
                        console.log("In order" , order) ;
                        return (
                            <SingleOrder order={order}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Orders ;
