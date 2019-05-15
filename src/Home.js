import React, {Component} from 'react';
import './App.css';
import ChooseSize from "./ChooseSize";
import ClothesList from "./ClothesList";
import Basket from "./Basket";
import {addList, addToBasket, openOrCloseBasket} from "./redux/actions/action";
import {connect} from "react-redux";
import NotificationBadge from 'react-notification-badge';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps, nextState);
        console.log(this.props, this.state);

        return false;
    }
    componentDidMount() {
        const {isMobile} = this.props
        if (isMobile) {
                document.getElementsByClassName('shoppingCartFilter')[0].style.display= ''
            }
    }

    render() {
        const {isBasketTime, openOrCloseBasket, isMobile, counterMobile} = this.props
        const home = 2
        debugger
        return (
            <div className="container">{
                !isMobile &&
                    <div className='sizesWrapper'>
                <div className="sizesContainer">
                    < ChooseSize/>
                    <div className='goToBasketWrapper'>
                        <div className="notficationSymbol"><NotificationBadge count={counterMobile}
                        /></div>
                        <button className="goToBasket" onClick={() => openOrCloseBasket(true)}>Open basket
                        </button>
                    </div>
                </div>
                    </div>
            }
                <div className={`listConatainer ${isMobile ? ' marginTop' : ''}`}>
                    <ClothesList isMobile={isMobile}/>
                </div>
                {isBasketTime &&
                <div>
                    <Basket isMobile={isMobile}/>
                </div>}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);