const initialState = {
    list: [],
    filteredList: [],
    shirtsList: [],
};

export const clothesListReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            const newState = Object.assign({}, state, {
                list: action.shirtList,
                filteredList: action.shirtList,
            });
            return newState
        case 'FILTER_LIST':
            let filteredListArr = [];
            state.list.forEach(shirt => {
                shirt.availableSizes.map(size => {
                  return  size === action.sizeOfShirts && filteredListArr.push(shirt)
                })
            })
            var newState = Object.assign({}, state, {filteredList: filteredListArr});
            return newState
        default:
            return state;
    }
}