import React from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { getUserName } from './reducer';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }

    }
    return (
        <nav className="header">
            {/*logo on the left ->img*/}
            <Link to="/">
                <img
                    className="header_logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="amazon logo"
                />
            </Link>
            {/* Search Box */}
            <div className="header_search">
                <input type="text" className="header_searchInput" />
                <SearchIcon class="header_searchIcon" />
            </div>
            {/* 3 links on the right*/}
            <div className="header_nav">
                {/* 1st link*/}
                <Link to={!user && "/login"} className="header_link">
                    <div
                        onClick={handleAuthentication}
                        className="header_option">
                        <span className="header_optionLineOne">
                            Hello {user?.email}
                        </span>
                        <span className="header_optionLineTwo">
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>

                {/* 2nd link*/}
                <Link to="/orders" className="header_link">
                    <div className="header_option">
                        <span className="header_optionLineOne">
                            Returns
                            </span>
                        <span className="header_optionLineTwo">
                            & Order
                            </span>
                    </div>
                </Link>
                {/* 3rd link*/}
                <Link to="/login" className="header_link">
                    <div className="header_option">
                        <span className="header_optionLineOne">
                            Your
                            </span>
                        <span className="header_optionLineTwo">
                            Prime
                            </span>
                    </div>
                </Link>
                <Link to="/checkout">
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header_optionLineTwo header_basketCount">
                            {basket?.length}
                            {/* ? means optional chaining meaning if you for any reason don't have defined value or some error occur in basket, it will be handled gracefully */}
                        </span>
                    </div>
                </Link>


            </div>
            {/*basket icon with number*/}
        </nav>
    )
}

export default Header
