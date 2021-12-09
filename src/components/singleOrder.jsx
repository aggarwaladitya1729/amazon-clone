import React from 'react' ;
import "../stylings/singleOrder.css" ;
import moment from "moment" ;
import CheckOutProduct from './checkOutProduct';

function SingleOrder({order}) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Dd YYYY , h:mma")}</p>
            <p className="order_id">
                <small>{order.id}</small>
            </p>
            {
                order.data.basket?.map(item => {
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
    )
}

export default SingleOrder ;
