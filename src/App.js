import React, {Component} from 'react';
import './App.css';
import {IconComponent} from "./IconComponent";
import ChooseSize from "./ChooseSize";
import ClothesList from "./ClothesList";
import Basket from "./Basket";
import {addList, addToBasket, openOrCloseBasket} from "./redux/actions/action";
import {connect} from "react-redux";
import BackToTop from "react-back-to-top-button";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {scrollUp:true}

    }
    backToTop = {
        backgroundColor: '#039be5',
        borderRadius:'20px',
        width:'150px',
        height:'50px',
        fontSize:'18px',
        top:'20px',
        left:'17%',
        color:'white'
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        const {isBasketTime, openOrCloseBasket} = this.props
        const {scrollUp} = this.state
        return (

            <div className="App">

                <div className="App-header">
                    <h1>MK APP</h1>
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
                <div className="container">
                    <div className="sizesContainer">
                        < ChooseSize/>
                        <button className="goToBasket" onClick={() => openOrCloseBasket(true)}>Open basket
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
