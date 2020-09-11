import axios from "axios";
const instance = axios.create({
    baseURL: 'https://us-central1-clone-4acce.cloudfunctions.net/api' // THE API (Cloud Function) URL

    // baseURL: 'http://localhost:5001/clone-4acce/us-central1/api' // THE API (Cloud Function) URL


});

export default instance;
moment with npm install moment * /} <
    p > { moment.unix(order.data.created).format("MMMM Do YYYY, h:mma") } < /p> <
    p className = "order_id" >
    <
    small > { order.id } < /small> <
    /p> {
        order.data.basket ? .map(item => ( <
            CheckoutProduct id = { item.id }
            title = { item.title }
            image = { item.image }
            price = { item.price }
            rating = { item.rating }
            hideButton /
            >
        ))
    } <
    CurrencyFormat
renderText = {
    (value) => ( <
        h3 className = "order_total" > Order Total: { value } < /h3>
    )
}
decimalScale = { 2 }
value = { order.data.amount / 100 }
displayType = { "text" }
thousandSeparator = { true }
prefix = { "$" }
/> <
/div>
)
}

export default Order