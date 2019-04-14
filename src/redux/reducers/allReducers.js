import { combineReducers } from 'redux'
import {clothesListReducers} from './clothesListReducer';
import {addToBasket} from './addToBasket';
import {openOrCloseBasket} from './openBasket';
import {openOrCloseModalSize} from './sizeModal';

export const allReducers = combineReducers({
    clothesListReducers,
    addToBasket,
    openOrCloseBasket,
    openOrCloseModalSize,

});