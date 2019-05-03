import { combineReducers } from 'redux'
import {clothesListReducers} from './clothesListReducer';
import {addToBasket} from './addToBasket';
import {openOrCloseBasket} from './openBasket';
import {openOrCloseModalSize} from './sizeModal';
import {counterMobile} from './cartCounterReducer';

export const allReducers = combineReducers({
    clothesListReducers,
    addToBasket,
    openOrCloseBasket,
    openOrCloseModalSize,
    counterMobile

});