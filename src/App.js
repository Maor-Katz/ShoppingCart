import React, {Component} from 'react';
import './App.css';
import Basket from "./Basket";
import ChooseSize from "./ChooseSize";
import Home from "./Home";
import {addList, addToBasket, openOrCloseBasket} from "./redux/actions/action";
import {connect} from "react-redux";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faShoppingCart, faCat} from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
            filterModalIsOpen: false,
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


    updateDimensions = (e) => {
        e.target.innerWidth < 700 ? this.setState({isMobile: true}) : this.setState({isMobile: false})
    }

    componentDidMount() {
        window.innerWidth < 700 ? this.setState({isMobile: true}) : this.setState({isMobile: false})
        window.addEventListener("resize", (e) => this.updateDimensions(e));
    }

    render() {
        library.add(faShoppingCart, faFilter, faCat)
        const {counterMobile} = this.props
        const {isMobile, filterModalIsOpen} = this.state
        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <span className="cat">
                            <FontAwesomeIcon icon="cat"/>
                        </span>
                        <Link to="/">
                            <div className='mkApp'>MK APP</div>
                        </Link>
                        {isMobile &&
                        <span className='shoppingCartFilter'>
                            <Link to="/shopping-cart/"> <div className='shoppingIcon' onClick={() => this.setState({})}> <FontAwesomeIcon
                                icon="shopping-cart"/> </div> </Link><NotificationBadge count={counterMobile}
                                                                                        effect={Effect.SCALE}
                                                                                        label={'render'}
                        label={NotificationBadge.propTypes.label}/>
                                <span onClick={() => this.setState({filterModalIsOpen: true})}
                                      className='filterIcon'><FontAwesomeIcon icon="filter"/></span>
                        </span>
                        }
                    </div>
                    <Modal isOpen={filterModalIsOpen} style={this.customStyles}>
                        <ChooseSize mobileMode={true}/>
                        <div className='backToShop'>
                            <Button variant="contained" onClick={(e) =>  this.setState({filterModalIsOpen: false}) }>Back
                                To Shop</Button>
                        </div>
                    </Modal>
                </div>
                <Switch>
                    <Route path="/home" component={() => <Home isMobile={isMobile}/>}/>
                    <Route path="/shopping-cart" component={() => <Basket isMobile={isMobile}/>}/>
                    <Redirect strict from="/" to="home"/>
                </Switch>
            </Router>

        );
    }
}

const mapStateToProps = state => {
    return {
        isBasketTime: state.openOrCloseBasket.isBasketTime,
        counterMobile: state.counterMobile.counterMobile
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