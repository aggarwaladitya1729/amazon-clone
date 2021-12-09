import React from 'react' ;
import "../stylings/checkOutProduct.css" ;
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import { useStateValue } from '../stateProvider';

function CheckOutProduct({id, image, alternate, title, price, rating, description}) {

    let ratingList = [] ;
    for(let i=0; i<rating; i++){
        ratingList.push(<GradeOutlinedIcon key={i} />) ;
    }

    const [{basket} , dispatch] = useStateValue() ;

    const removeBasket = () => {
        dispatch({
            type : "REMOVE_FROM_BASKET", 
            id : id,
        })
    }

    return (
        <div className="checkoutProduct">
            <img 
                className="checkoutProduct_image" 
                src={image} 
                alt={alternate} 
            />
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_description">{description}</p>
                <p className="checkoutProduct_price">
                    <small>Rs </small>
                    <strong>{price}</strong> 
                </p>
                <div className="checkoutProduct_rating">{ratingList}</div>
                <button onClick={removeBasket}>Remove From Basket</button>
            </div>
        </div>
    )
}

export default CheckOutProduct
