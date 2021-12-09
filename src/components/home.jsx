import React from 'react'
import "../stylings/home.css" ;
import Product from "./product" ;

function home() {
    return (
        <div className="home">
            <div className="home_container">
                <img 
                    className="home_logo"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                    alt="Home Background Image" 
                />

                <div className="home_row">
                    <Product 
                        id={1}
                        title="Razor" 
                        image="https://th.bing.com/th/id/OIP.Galhi4okxWcCi-Y_r6A2WAHaHa?w=168&h=180&c=7&o=5&dpr=1.25&pid=1.7"
                        price={500}
                        description="The Razor has new technology"
                        rating={5}
                        alternate="Razor Image"
                    />
                    <Product 
                        id={2}
                        title="Book" 
                        image="https://th.bing.com/th/id/OIP.Galhi4okxWcCi-Y_r6A2WAHaHa?w=168&h=180&c=7&o=5&dpr=1.25&pid=1.7"
                        price={100}
                        description="It contains many stories"
                        rating={3}
                        alternate="Book Image"
                    />
                </div>
                <div className="home_row">
                    <Product 
                        id={3}
                        title="Fridge" 
                        image="https://th.bing.com/th/id/OIP.Galhi4okxWcCi-Y_r6A2WAHaHa?w=168&h=180&c=7&o=5&dpr=1.25&pid=1.7"
                        price={41094}
                        description="New Cooling Technology"
                        rating={4}
                        alternate="Fridge Image"
                    />
                    <Product 
                        id={4}
                        title="LED TV" 
                        image="https://th.bing.com/th/id/OIP.Galhi4okxWcCi-Y_r6A2WAHaHa?w=168&h=180&c=7&o=5&dpr=1.25&pid=1.7"
                        price={20000}
                        description="Sleek Design"
                        rating={3}
                        alternate="LED TV Image"
                    />
                    <Product 
                        id={5}
                        title="Mobile" 
                        image="https://th.bing.com/th/id/OIP.Galhi4okxWcCi-Y_r6A2WAHaHa?w=168&h=180&c=7&o=5&dpr=1.25&pid=1.7"
                        price={10000}
                        description="Best Camera and Performance"
                        rating={5}
                        alternate="Mobile Image"
                    />
                </div>
                <div className="home_row">
                    
                </div>
            </div>
        </div>
    )
}

export default home
