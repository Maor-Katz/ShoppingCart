import React from "react";
import Modal from 'react-modal';
import logo1 from "./images_for_project/download.jpeg"
import logo2 from "./images_for_project/RENUAR416G.jpg"
import logo3 from "./images_for_project/7770097.01.0100_c5c12e9.jpg"
import logo4 from "./images_for_project/f_1428_12513_12533_13520121482293181.jpg"
import logo5 from "./images_for_project/4fdd2948-7ec7-442a-ac27-68634efa6f8a.jpg"
import {connect} from 'react-redux'
import Select from '@material-ui/core/Select';
import {addList, addToBasket, openOrCloseModalSize} from "./redux/actions/action";


const {listFromJson, getSelectedSize} = require('./usefullFunctions');


class ClothesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [logo5, logo4, logo3, logo2, logo1],
            size: '',
        }
        this.customStyles = {
            content: {
                top: '50%',
                height: '30%',
                width: '30%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                textAlign: 'center',
                fontSize: '20px'
            }
        };
    }


    handleChange = (index, e) => {
        this.setState({
            size: e.target.value,
        });
    }
    getSizeOfShirtAndAdd = (index) => {

        const {addToBasket, list, openOrCloseModalSize} = this.props
        if (getSelectedSize('mySelect', index)) {
            let chosenSize = getSelectedSize('mySelect', index)
            addToBasket(list[index], 'ADD_TO_BASKET', chosenSize)
        }
        else
            openOrCloseModalSize(true);
    }

    componentDidMount() {
        const {addList} = this.props
        listFromJson(addList)
    }

    render() {
        const { filteredList, modalOpen, openOrCloseModalSize} = this.props;
        const {images} = this.state;
        return (
            <div className="clothes">
                <div className="productsText">{filteredList.length} Product(s) found.</div>
                <div className="clothesList">
                    {filteredList.map((shirt, index) => {
                        return <div key={index} className="shirt">
                            <div className="titleShirt">{shirt.title}</div>
                            <div className="lineInShirt"></div>
                            <div className="priceShirt">
                                <span>{shirt.currencyFormat}</span><span> {shirt.price}</span>
                            </div>
                            <div className="availableSizes">{<Select id={'mySelect' + index} className='mySelect'
                                                                     native={true} >
                                <option>Choose size</option>
                                {shirt.availableSizes.map((size, index) => <option key={index}
                                                                                   onChange={() => this.handleChange(index)}>{size}</option>)}
                            </Select>}</div>
                            <div><img alt="description" className="imgShop" src={images[Math.floor(Math.random() * images.length)]}/>
                            </div>
                            <div>
                                <button className="addButton" onClick={(e) => {
                                    this.getSizeOfShirtAndAdd(index)
                                    e.preventDefault()
                                }}>Add To Cart
                                </button>
                            </div>
                        </div>
                    })}

                </div>
                <div className='footer'></div>
                <Modal
                    isOpen={modalOpen}
                    //onAfterOpen={this.afterOpenModal}
                    //onRequestClose={this.closeModal}
                    style={this.customStyles}
                    //contentLabel="Example Modal"
                >
                    <div className='chooseAnySize'>Please Select Size</div>
                    <div>
                        <button className="addButton" onClick={() => openOrCloseModalSize(false)}>OK</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state && state.clothesListReducers ? state.clothesListReducers.list : [],
        filteredList: state && state.clothesListReducers ? state.clothesListReducers.filteredList : [],
        myList: state.addToBasket.myList,
        modalOpen: state.openOrCloseModalSize.modalOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addList: (val) => dispatch(addList(val)),
        addToBasket: (shirt, action, chosenSize) => dispatch(addToBasket(shirt, action, chosenSize)),
        openOrCloseModalSize: value => dispatch(openOrCloseModalSize(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothesList);
