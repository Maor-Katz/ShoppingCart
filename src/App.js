import React, {Component} from 'react';
import './App.css';
import {IconComponent} from "./IconComponent";
import ChooseSize from "./ChooseSize";
import ClothesList from "./ClothesList";
import Basket from "./Basket";
import {addList, addToBasket, openOrCloseBasket} from "./redux/actions/action";
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {isBasketTime, openOrCloseBasket} = this.props
        return (

            <div className="App">
                <div className="App-header">

                    <h1>MK APP</h1>
                </div>
                {this.props.todos}
                <div className="container">
                    <div className="sizesContainer">
                        < ChooseSize/>
                        <button className="goToBasket" onClick={() => openOrCloseBasket(true)}>Go to the Basket Dudes
                        </button>
                    </div>
                    <div className="listConatainer">
                        <ClothesList/></div>

                </div>
                {isBasketTime &&
                <div>
                    <Basket renderApp={this.renderApp}/>

                </div>}
                < IconComponent/>
            </div>
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