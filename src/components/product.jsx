import React from 'react'
import "../stylings/product.css" ;
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import { useStateValue } from '../stateProvider';

function Product({id, image, alternate, title, price, rating, description}) {

    let ratingList = [] ;
    for(let i=0; i<rating; i++){
        ratingList.push(<GradeOutlinedIcon key={i} />) ;
    }

    const [{basket , user} , dispatch] = useStateValue() ;
    console.log(basket) ;
    const addToBasket = () => {
        // Items are pushed/added in basket in the data layer or the global storage of react
        if(user){ // jab user sign in hoga tab hi add to basket ka option kaam karega
            dispatch({
                type : "ADD_TO_BASKET", 
                item : {
                    id, 
                    image, 
                    alternate, 
                    title, 
                    price, 
                    rating, 
                    description
                }
            })
        }
    }

    return (
        <div className="product">
            <div className="card product_info">
                <img 
                    className="card-img-top" 
                    src={image} 
                    alt={alternate}
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="product_price">
                        <small>Rs </small>
                        <strong>{price}</strong>
                    </p>
                    <div className="product_rating">
                        {ratingList}
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
            <button onClick={addToBasket} >Add to basket</button>
        </div>
    ) ;
}

export default Product ;
