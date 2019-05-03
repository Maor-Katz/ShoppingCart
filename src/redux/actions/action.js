export const addList = val => ({
    type: 'ADD_LIST',
    shirtList: val
})

export const addToBasket = (val, action, chosenSize) => {
    return {
        type: action,
        newShirt: val,
        chosenSize
    }
}

export const openOrCloseBasket = val => {
    return {
        type: 'CLOSE_OR_OPEN_BASKET',
        isBasketTime: val
    }
}

export const sortList = val => ({
    type: 'FILTER_LIST',
    sizeOfShirts: val
})

export const deleteShirt = shirtId => {
    return {
        type: 'DELETE_SHIRT',
        shirtId: shirtId,
    }
}
export const openOrCloseModalSize= val => {
    return {
        type: 'OPEN_MODAL',
        modalOpen: val
    }
}
export const basketCounter= (action) => {
    return {
        type: action,
    }
}