const initialState = {
    modalOpen: false,
};
export const openOrCloseModalSize= (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            let newState = Object.assign({}, state,{modalOpen:action.modalOpen});
            return newState;
        default:
            return state;
    }
}