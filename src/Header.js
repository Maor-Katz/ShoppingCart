import React from "react";
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import {Link} from "react-router-dom";
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import ChooseSize from "./ChooseSize";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterModalIsOpen: false,}
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

    render() {

        const {isMobile, counterMobile} = this.props
        const {filterModalIsOpen} = this.state
        return (
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
                                                                                        effect={Effect.SCALE}/>
                                <span onClick={() => this.setState({filterModalIsOpen: true})}
                                      className='filterIcon'><FontAwesomeIcon icon="filter"/></span>
                        </span>
                }
                <Modal isOpen={filterModalIsOpen} style={this.customStyles}>
                    <ChooseSize mobileMode={true}/>
                    <div className='backToShop'>
                        <Button variant="contained" onClick={() => this.setState({filterModalIsOpen: false})}>Back
                            To Shop</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counterMobile: state.counterMobile.counterMobile

    }
}

function mapDispatchToProps(dispatch) {
    return {


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);