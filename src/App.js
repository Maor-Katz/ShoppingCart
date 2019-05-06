import React, {Component} from 'react';
import './App.css';
import Basket from "./Basket";
import Header from "./Header";
import Home from "./Home";
import {addList, addToBasket, openOrCloseBasket} from "./redux/actions/action";
import {connect} from "react-redux";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faFilter, faShoppingCart, faCat} from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
        }
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
        const {isMobile} = this.state
        return (
            <Router>
                <div className="App">
                    <Header isMobile={isMobile}/>
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