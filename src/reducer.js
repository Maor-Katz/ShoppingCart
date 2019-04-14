const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            let newState = Object.assign({}, state)
            newState.list.push(state.list[action.shirtIndex])
            return newState
        default:
            return state
    }
}
export default todos