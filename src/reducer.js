export const initialState = {
    basket: [],
    user: null
};
//calculate total sum of money from the basket
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            // this should dispatch something to data layer
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case "REMOVE_FROM_BASKET":
            // return {
            //     ...state,
            //     basket: state.basket
            //     .filter (item => item.id 
            //         !== action.id)
            // }
            // if this is ever done it will remove every single element from the basket with same id so DON'T EVER DO THIS
            // return whatever the state store look like but change the basket, filter out the item id from the action where action is matching the action id
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id == action.id
            );

            // we get the state, get basket and use findIndex function that goes through all of the basket item and check if any basket item id match the action id
            // and will return the first one which matches
            let newBasket = [...state.basket]
            // copy everything state.basket currently has to new basket
            if (index >= 0) {
                //this means they actually found something inside the basket
                newBasket.splice(index, 1);
                //pass the index and splice by 1 i.e cutting basket value by 1
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }

            return {
                ...state,
                basket: newBasket
                //basket is going to be new basket
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
};
export default reducer;