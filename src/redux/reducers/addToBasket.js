const initialState = {
    myList: [],
};

export const addToBasket = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            action.newShirt['chosenSize']=action.chosenSize //addind chosen size property to shirt object
            let newState = Object.assign({}, state);
            newState.myList.push(action.newShirt);
            return newState;
        case 'DELETE_SHIRT':
            let afterDelete = Object.assign({}, state, {
                myList: state.myList.filter((shirt,index) => {

                    return index !== action.newShirt
                })
            })
            return afterDelete
        default:
            return state;
    }
}