import React from "react";
import Modal from 'react-modal';
import logo1 from "./images_for_project/download.jpeg"
import logo2 from "./images_for_project/RENUAR416G.jpg"
import logo3 from "./images_for_project/7770097.01.0100_c5c12e9.jpg"
import logo4 from "./images_for_project/f_1428_12513_12533_13520121482293181.jpg"
import logo5 from "./images_for_project/4fdd2948-7ec7-442a-ac27-68634efa6f8a.jpg"
import {connect} from 'react-redux'
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {addList, addToBasket, openOrCloseModalSize, basketCounter} from "./redux/actions/action";
import BackToTop from "react-back-to-top-button";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStroopwafel, faCat, faWindowClose} from '@fortawesome/free-solid-svg-icons'

const {listFromJson, getSelectedSize} = require('./usefullFunctions');

class ClothesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [logo5, logo4, logo3, logo2, logo1],
            size: '',
            modalImageOpen: false,
            modalImageIndex: 0,
        }
        this.customStyles = {
            content: {
                top: '50%',
                height: '83%',
                width: '35%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                textAlign: 'center',
                fontSize: '20px',
                backgroundColor: '#039be5',
                color: 'white',

            }
        };
        this.customStylesImage = {
            content: {
                top: '50%',
                height: '11%',
                width: '18%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                textAlign: 'center',
                fontSize: '20px',
                backgroundColor: '#039be5',
                color: 'white',

            }
        };
        this.customStylesMobile = {
            content: {
                top: '50%',
                height: '15%',
                width: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                textAlign: 'center',
                fontSize: '20px',
                backgroundColor: '#039be5',
                color: 'white',
            }
        }
        this.customStylesMobileImage = {
            content: {
                top: '50%',
                height: '60%',
                width: '80%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                textAlign: 'center',
                fontSize: '20px',
                backgroundColor: '#039be5',
                color: 'white',
            }
        }
    }

    backToTop = {
        backgroundColor: 'black',
        borderRadius: '20px',
        width: '150px',
        height: '50px',
        fontSize: '18px',
        bottom: '80px',
        right: '20%',
        color: 'white',
        zIndex: '5',
    }

    handleChange = (index, e) => {
        this.setState({
            size: e.target.value,
        });
    }
    getSizeOfShirtAndAdd = (index) => {
        const {addToBasket, list, openOrCloseModalSize, basketCounter} = this.props
        if (getSelectedSize('mySelect', index)) {
            let chosenSize = getSelectedSize('mySelect', index)
            addToBasket(list[index], 'ADD_TO_BASKET', chosenSize)
            basketCounter('ADD_TO_COUNTER')
        }
        else
            openOrCloseModalSize(true);
    }
    openModalImage = (modalImageIndex) => {
        const {modalImageOpen} = this.state
        this.setState({
            modalImageOpen: true,
            modalImageIndex
        });
    }

    componentWillMount() {
        const {addList, list} = this.props
        list.length === 0 && listFromJson(addList) // if list is empty, add all products to the list
    }

    render() {
        library.add(faWindowClose);
        const {filteredList, modalOpen, openOrCloseModalSize, isMobile} = this.props;
        const {images, modalImageIndex, modalImageOpen} = this.state;
        const clothesList=3
        debugger
        return (
            <div className="clothes">
                <div
                    className="productsText">{filteredList.length > 1 ? `${filteredList.length} Product(s) found.` : `${filteredList.length} Product found`}</div>
                <div className="clothesList">
                    {filteredList.map((shirt, index) => {
                        return <div key={index} className="shirt">
                            <div className="titleShirt">{shirt.title}</div>
                            <div className="lineInShirt"></div>
                            <div className="priceShirt">
                                <span>{shirt.currencyFormat}</span><span> {shirt.price}</span>
                            </div>
                            <div className="availableSizes">{<Select id={'mySelect' + index} className='mySelect'
                                                                     native={true}>
                                <option>Choose size</option>
                                {shirt.availableSizes.map((size, index) => <option key={index}
                                                                                   onChange={() => this.handleChange(index)}>{size}</option>)}
                            </Select>}</div>
                            <div><img alt="description" className="imgShop"
                                      src={images[shirt.imageIndex]}
                                      onClick={() => this.openModalImage(shirt.imageIndex)}/>
                            </div>
                            <div>
                                <button className="addButton"
                                        onClick={() => this.getSizeOfShirtAndAdd(index)
                                        }>Add To Cart
                                </button>
                            </div>
                        </div>
                    })}
                </div>
                <div className='footer'></div>
                <Modal
                    isOpen={modalOpen}
                    ariaHideApp={false}
                    style={!isMobile ? this.customStylesMobileImage : this.customStylesMobile}
                >
                    <div className='chooseAnySize'>Please Select Size</div>
                    <div className="okButton">
                        <Button variant="contained" className="addButton" className="okButton"
                                onClick={() => openOrCloseModalSize(false)}>OK</Button>
                    </div>
                </Modal>
                <Modal// image modal
                    isOpen={modalImageOpen}
                    ariaHideApp={false}
                    style={!isMobile ? this.customStyles : this.customStylesMobileImage}
                >

                    <span className="imageModal">
                        <img alt="description" className="imgModal"
                             src={images[modalImageIndex]}/>
                    </span>
                    <span className="closeModalImage" onClick={() => this.setState({modalImageOpen: false})}>
                                <FontAwesomeIcon icon="window-close"/></span>
                </Modal>
                {!modalImageOpen &&
                    <BackToTop
                        showAt={100}
                        speed={1500}
                        easing="easeInOutQuint"
                        showOnScrollUp={false}
                        style={this.backToTop}
                    >
                        <span>Back to Top</span>
                    </BackToTop>
                }
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state && state.clothesListReducers ? state.clothesListReducers.list : [],
        filteredList: state && state.clothesListReducers ? state.clothesListReducers.filteredList : [],
        myList: state.addToBasket.myList,
        modalOpen: state.openOrCloseModalSize.modalOpen,
        counterMobile: state.counterMobile.counterMobile
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addList: (val) => dispatch(addList(val)),
        addToBasket: (shirt, action, chosenSize, imageIndex) => dispatch(addToBasket(shirt, action, chosenSize, imageIndex)),
        openOrCloseModalSize: value => dispatch(openOrCloseModalSize(value)),
        basketCounter: action => dispatch(basketCounter(action))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothesList);
