import React, { useState, useEffect } from 'react';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "./firebase";
function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //genereate special client strip secred which allows us to change a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits
                //if dollars then input must be in cents so we time it by 100
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket]);

    console.log("The secret is >>>", clientSecret);
    const handleSubmit = async (event) => {
        //do all fancy stripes
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment Confirmation

            //push into the database
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });


            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
    }
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <div className="payment">

            <div class="payment_container">
                <h1>
                    Checkout
                (<Link to="/checkout">{basket.length} items</Link>)
                </h1>
                <div class="payment_section">
                    <div className="payment_title">
                        <h3> Delivery Address </h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>235 Scott Parade</p>
                        <p>Brown Hill, VIC 3350</p>

                    </div>
                </div>

                <div class="payment_section">
                    <div className="payment_title">
                        <h3> Review items and Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map(items => (
                            <CheckoutProduct
                                id={items.id}
                                title={items.title}
                                image={items.image}
                                price={items.price}
                                rating={items.rating}
                            />
                        ))}

                    </div>
                </div>
                <div class="payment_section">
                    <div className="payment_title">
                        <h3> Payment Method </h3>
                    </div>
                    <div className="payment_details">
                        {/* Stripe magic will go here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement
                                onChange={handleChange}
                            />
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3> Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled | succeeded}>
                                    <span>
                                        {processing ? <p>Processing</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
                {/* <PaymentSection /> */}
            </div>
        </div>
    )
}

export default Payment
