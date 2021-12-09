export const initialState = {
    basket : [] ,
    user : null,    // shuru mein user exist nahi karta jaise hi log in karega hum state change kar denge
}

// Selector
export const getBasketTotal = (basket) => {
    let total = 0 ;
    basket.map(item => total += item.price) ;
    //console.log("hello there in reducer getBasketTotal" , total );
    return total ;
}

// reducer helps in pushing data to the central store/database for react
const reducer = (state , action) => {  // state is state of the app and action is add/remove etc
    console.log(action) ;
    switch(action.type) {

        case "EMPTY_BASKET" : 
            console.log("hello there in reducer.js empty basket case") ;
            return{
                ...state ,
                basket : [] ,
            }

        case "SET_USER" : 
            console.log("hello there in SET_USER in reducer") ;
            return {
                ...state ,
                user : action.user ,
            }

        case "ADD_TO_BASKET" :
            console.log("hello in add to basket")
            return {
                ...state, // jo pura state hai wo same rahe bas basket mein change karna hai jo neeche kiya gaya hai
                basket : [...state.basket , action.item] // jo pehle tha basket mein usmein action.item aur add kardo
            };

        case "REMOVE_FROM_BASKET" :
            const index = state.basket.findIndex(   // ye sabse pehla index find karega jahaan item ki id aur action id equal hain
                (item) => item.id === action.id         
            );
            // ab us particular index wale item ko remove karna hai
            let newBasket = [...state.basket] ;
            newBasket.splice(index , 1) ;
            return {
                ...state ,
                basket : newBasket ,
            }
            // return {
            //     ...state, 
            //     basket: state.basket.filter(item => item.id !== action.id) // filter wala lagane se same id wale saare delete ho jayenge
            // } ;

        default :
            return state ;
    }
    console.log("this is state ", state) ;
}

export default reducer ;