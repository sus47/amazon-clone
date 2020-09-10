import React from 'react';
import "./Home.css";
import Product from "./Product";
function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img
                    className="home_image"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Projects/GlobalStore/US_AU_3000x1200_1218557_1136095_au_xsite_desktop_hero._CB436107287_.jpg"
                    alt="" />
            </div>
            <div className="home_row">
                <Product
                    id="1231342312"
                    title='The Lean Startup'
                    price={29.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/81D7LkzP4tL.__BG0,0,0,0_FMpng_AC_SY220_.jpg"
                    rating={4}
                />
                <Product
                    id="1222312312"
                    title='The Quick Brown Fox Jumps over the lazy dog. hhahahah'
                    price={2000.00}
                    image="https://images-na.ssl-images-amazon.com/images/I/81D7LkzP4tL.__BG0,0,0,0_FMpng_AC_SY220_.jpg"
                    rating={2}
                />
            </div>
            <div className="home_row">
                <Product
                    id="12312990312"
                    title='Amazon Echo (3rd generation) Speaker with Alexa and Google Support'
                    price={290.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/81D7LkzP4tL.__BG0,0,0,0_FMpng_AC_SY220_.jpg"
                    rating={1}
                />
                <Product
                    id="1222312312"
                    title='The Quick Brown Fox Jumps over the lazy dog. hhahahah'
                    price={2000.00}
                    image="https://images-na.ssl-images-amazon.com/images/I/81D7LkzP4tL.__BG0,0,0,0_FMpng_AC_SY220_.jpg"
                    rating={2}
                />
                <Product
                    id="1231652312"
                    title='The Lean Startup'
                    price={29.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/81D7LkzP4tL.__BG0,0,0,0_FMpng_AC_SY220_.jpg"
                    rating={5}
                />

            </div>
            <div className="home_row">
                <Product
                    id="1231237712"
                    title='The Lean Startup'
                    price={29.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/81D7LkzP4tL.__BG0,0,0,0_FMpng_AC_SY220_.jpg"
                    rating={5}
                />             </div>
        </div>
    )
}

export default Home
