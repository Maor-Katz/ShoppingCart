import React from "react";
import {connect} from 'react-redux'
import {addList, sortList} from "./redux/actions/action";

const {listFromJson} = require('./usefullFunctions');


export class ChooseSize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const {list, dispatch, sortList, addList} = this.props
        return (
            <div className="sizes">
                <div className="sizeText">Sizes:</div>
                <div className="sizeButtons">
                    <button className="buttonCircle blue" onClick={() => listFromJson(addList)}>ALL</button>
                    <button className="buttonCircle" onClick={() => sortList('XS')}>XS</button>
                    <button className="buttonCircle" onClick={() => sortList('S')}>S</button>
                    <button className="buttonCircle" onClick={() => sortList('M')}>M</button>
                    <button className="buttonCircle" onClick={() => sortList('L')}>L</button>
                    <button className="buttonCircle" onClick={() => sortList('XL')}>XL</button>
                    <button className="buttonCircle" onClick={() => sortList('XXL')}>XXL</button>
                </div>
                <div className="textGithub">like my project github dude!</div>
                <a className="starButton" href="https://github.com/Maor-Katz/ShoppingCart" target="_blank">Click To Star</a>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state && state.clothesListReducers ? state.clothesListReducers.list : [],

    }
}

function mapDispatchToProps(dispatch) {
    return {
        addList: (val) => dispatch(addList(val)),
        sortList: (sortBy) => dispatch(sortList(sortBy)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSize);