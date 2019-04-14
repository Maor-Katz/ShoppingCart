const initialState = {
    isBasketTime: false,

};

export const openOrCloseBasket = (state = initialState, action) => {
    switch (action.type) {
        case 'CLOSE_OR_OPEN_BASKET':
            let newState= Object.assign({}, state, {isBasketTime: action.isBasketTime});
            return newState;
        default:
            return state;
    }
}