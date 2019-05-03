const initialState = {
    counterMobile:0
};

export const counterMobile = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case 'ADD_TO_COUNTER':
            var newState = Object.assign({}, state, {counterMobile: state.counterMobile+1});
            return newState
        case 'REMOVE_FROM_COUNTER':

             newState = Object.assign({}, state, {counterMobile: state.counterMobile-1});
            return newState
        default:
            return state;
    }
}