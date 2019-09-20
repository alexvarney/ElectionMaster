import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {ContestContext} from '../contest/ContestProvider';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import styles from './css/CandidateListCard.module.css'

function CandidateSidebarCard(props) {

    const {match, candidate} = props;

    const {image, name, polling, _id} = candidate;


    const isLoggedIn = () => {
        return props.user.token && props.user.token !== "";
    }

    const [isDropdownOpen, setDropdown] = useState(false);
    const toggle = (e) => {
        setDropdown(!isDropdownOpen);
    }

    const [mouseEnter, setMouseState] = useState(false);
    const mouseLeave = () => {
        setMouseState(false);
        setDropdown(false);
    }

    return (
        <ContestContext.Consumer>
        {(selectedContest) => (
            <div 
            className={props.selected === props.candidate._id ? styles.active : styles.container} 
            onClick={()=>props.onSelect(_id)}
            onMouseEnter={()=>setMouseState(true)}
            onMouseLeave={mouseLeave}
            >
            
            <div className={styles.imgContainer}>
                {(image)?
                    <img alt={name} className={styles.imgStyle} src={process.env.PUBLIC_URL + `/headshots/${image}`} />:null}
            </div>
            
            <div className={styles.textContainer}>
                <p className={styles.nameStyle}>{name}</p>
                <p className={styles.percentageText}>
                    <span>{(polling && polling > 0)?polling + '%':null}</span><br/>                    
                </p>
            </div>

            {mouseEnter && isLoggedIn() ? 
            <div className={styles.menuContainer}>
                <Dropdown onClick={(e)=>e.stopPropagation()} isOpen={isDropdownOpen} toggle={toggle}>
                    <DropdownToggle
                    tag="span"
                    onClick={toggle}
                    data-toggle="dropdown"
                    aria-expanded={isDropdownOpen}
                    >
                        <i className="fas fa-ellipsis-h"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem tag={Link} onClick={()=>props.onSelect(_id)} to={`${match.url}/edit`}>
                            Edit Data
                        </DropdownItem>
                        <DropdownItem tag={Link} onClick={()=>props.onSelect(_id)} to={`${match.url}/editpositions`}>
                            Edit Positions
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            : null}
        </div>
        )}
        </ContestContext.Consumer>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default withRouter(connect(mapStateToProps, {})(CandidateSidebarCard));