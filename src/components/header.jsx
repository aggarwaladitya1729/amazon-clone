import React from 'react' ;
import "../stylings/header.css" ;
import logo from "../images/amazon_logo.png"
import SearchIcon from "@material-ui/icons/Search"
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import {Link} from "react-router-dom" ;
import { useStateValue } from '../stateProvider';
import { auth } from '../firebase';

function Header() {

    const [{basket , user} , dispatch] = useStateValue() ;

    const handleSignOut = () => {
        auth.signOut() ;
    }
    console.log("Hello there in header.jsx " , user) ;

    return (
        <div className="header">

            <Link to="/">
                <img 
                    className="header_logo" 
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="amazon logo" 
                />
            </Link>

            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon"/>
            </div>

            <div className="header_nav">
                {/* jab user exist na karta ho tab hi login/sign in wale page par redirect ho */}
                <Link to={!user && "/login"}> 
                    <div onClick={handleSignOut} className="header_option">
                        <span className="header_optionLineOne">
                            Hello {user ? user.email : "Guest"}
                        </span>
                        <span className="header_optionLineTwo">
                            {/* agar user exist karta hai to Sign out dikhayega else sign in */}
                            {user ? "Sign Out" : "Sign In"} 
                        </span>
                    </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">
                        Returns
                    </span>
                    <span className="header_optionLineTwo">
                        & Orders
                    </span>
                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">
                        Your
                    </span>
                    <span className="header_optionLineTwo">
                        Prime
                    </span>
                </div>
                <Link to="/checkout">
                    <div className="header_optionBasket">
                        <LocalMallOutlinedIcon/>
                        <span className="header_optionLineTwo header_basketCount">
                            {basket.length}
                        </span>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default Header
