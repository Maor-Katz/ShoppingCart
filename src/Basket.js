import React from "react";
import {connect} from 'react-redux'
import {addList, addToBasket, basketCounter, openOrCloseBasket} from "./redux/actions/action";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStroopwafel, faCat, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import logo1 from "./images_for_project/download.jpeg"
import logo2 from "./images_for_project/RENUAR416G.jpg"
import logo3 from "./images_for_project/7770097.01.0100_c5c12e9.jpg"
import logo4 from "./images_for_project/f_1428_12513_12533_13520121482293181.jpg"
import logo5 from "./images_for_project/4fdd2948-7ec7-442a-ac27-68634efa6f8a.jpg"
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";


export class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {images: [logo5, logo4, logo3, logo2, logo1],}
    }

    componentDidMount() {
        const {isMobile} = this.props
        if (isMobile) {
            document.getElementsByClassName('shoppingCartFilter')[0].style.display= 'none'
        }
    }

    render() {
        library.add(faCat, faStroopwafel, faWindowClose)
        const {openOrCloseBasket, myList, addToBasket, isMobile, basketCounter} = this.props;
debugger

        const {images} = this.state;
        return (

            <div className="basket">
                {!isMobile &&
                <div className="closeDrawer" onClick={() => {
                    openOrCloseBasket(false);
                }}>
                    <FontAwesomeIcon icon="window-close"/>
                </div>
                }
                <div className="basketList">

                    {myList && myList.map((shirt, index) => {
                        return <div className="shirtInBasket" key={index}>
                            <div className="shirtDetails">
                                <div className="title">{shirt.title}</div>
                                <div className="descriptionShirt">{shirt.description}</div>
                                <div className="sizeOfShirt">Size: {shirt.chosenSize}</div>
                                <div className="priceShirt"><span>{shirt.price}</span><span>{shirt.currencyId}</span>
                                    <div><img alt="description" className="imgBasket"
                                              src={images[Math.floor(Math.random() * images.length)]}/></div>
                                </div>

                            </div>
                            <span className="deleteShirt" onClick={() => {
                                addToBasket(index, 'DELETE_SHIRT');
                                 basketCounter('REMOVE_FROM_COUNTER')
                            }}>
                                <FontAwesomeIcon icon="window-close"/></span>
                        </div>
                    })
                    }

                </div>
                {isMobile &&
                <div className='backToTopBasket'><Link to="/home"><Button variant="contained">Back
                    To Shop</Button></Link></div>
                }

            </div>

        );
    }
}

const mapStateToProps = state => {
    debugger
    return {
        isBasketTime: state.openOrCloseBasket.isBasketTime,
        myList: state.addToBasket.myList,
        filteredList: state && state.clothesListReducers ? state.clothesListReducers.filteredList : [],
    }
}

function mapDispatchToProps(dispatch) {
    debugger
    return {
        addList: (val) => dispatch(addList(val)),
        addToBasket: (shirt, action) => dispatch(addToBasket(shirt, action)),
        openOrCloseBasket: (close) => dispatch(openOrCloseBasket(close)),
        basketCounter: action => {
            debugger
            dispatch(basketCounter(action))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);