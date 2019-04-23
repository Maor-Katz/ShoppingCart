import React, {Component} from 'react';
import './App.css';
import {IconComponent} from "./IconComponent";
import ChooseSize from "./ChooseSize";
import ClothesList from "./ClothesList";
import Modal from 'react-modal';
import Basket from "./Basket";
import {addList, addToBasket, openOrCloseBasket} from "./redux/actions/action";
import {connect} from "react-redux";
import BackToTop from "react-back-to-top-button";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
            filterModalIsOpen: false

        }
        this.customStyles = {
            content: {
                top: '50%',
                height: '45%',
                width: '60%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '20px',
                textAlign: 'center',
                fontSize: '20px',
                backgroundColor: '#C0E6F8'
            }
        };
    }

    backToTop = {
        backgroundColor: '#039be5',
        borderRadius: '20px',
        width: '150px',
        height: '50px',
        fontSize: '18px',
        bottom: '80px',
        right: '20%',
        color: 'white',
        zIndex: '5',


    }
    updateDimensions = (e) => {
        e.target.innerWidth < 700 ? this.setState({isMobile: true}) : this.setState({isMobile: false})
    }

    componentDidMount() {
        window.innerWidth < 700 ? this.setState({isMobile: true}) : this.setState({isMobile: false})
        window.addEventListener("resize", (e) => this.updateDimensions(e));
    }

    render() {
        library.add(faShoppingCart, faFilter)
        const {isBasketTime, openOrCloseBasket} = this.props
        const {isMobile, filterModalIsOpen} = this.state

        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <Link to="/"><div className='mkApp'>MK APP</div></Link>
                        {isMobile &&
                        <span className='shoppingCartFilter'>
                        <Link to="/shopping-cart/"><span className='shoppingIcon'><FontAwesomeIcon
                            icon="shopping-cart"/></span></Link>
                        <span onClick={() => this.setState({filterModalIsOpen: true})}
                              className='filterIcon'><FontAwesomeIcon icon="filter"/></span>
                    </span>
                        }
                    </div>

                    <BackToTop
                        showAt={100}
                        speed={1500}
                        easing="easeInOutQuint"
                        showOnScrollUp={false}
                        style={this.backToTop}
                    >

                        <span>Back to Top</span>
                    </BackToTop>

                    {this.props.todos}
                    <div className="container">{

                        !isMobile &&
                        <div className="sizesContainer">
                            < ChooseSize/>
                            <button className="goToBasket" onClick={() => openOrCloseBasket(true)}>Open basket
                            </button>
                        </div>

                    }
                        <div className="listConatainer">
                            <ClothesList/></div>

                    </div>
                    {isBasketTime &&
                    <div>
                        <Basket isMobile={isMobile}/>

                    </div>}
                    < IconComponent/>
                    <Modal
                        isOpen={filterModalIsOpen}
                        //onAfterOpen={this.afterOpenModal}
                        //onRequestClose={this.closeModal}
                        style={this.customStyles}
                        //contentLabel="Example Modal"
                    >
                        < ChooseSize mobileMode={true}/>
                        <div className='backToShop'>
                            <Button variant="contained" onClick={() => this.setState({filterModalIsOpen: false})}>Back
                                To Shop</Button>
                        </div>
                    </Modal>
                </div>

                <Route path="/shopping-cart/" component={() => <Basket isMobile={isMobile}/>} />

            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        isBasketTime: state.openOrCloseBasket.isBasketTime
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addList: (val) => dispatch(addList(val)),
        addToBasket: (shirt) => dispatch(addToBasket(shirt)),
        openOrCloseBasket: (open) => dispatch(openOrCloseBasket(open))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);