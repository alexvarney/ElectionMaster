import React, {useState, useRef} from 'react'
import styles from './css/CandidatePositionButton.module.css';
import {Tooltip} from 'reactstrap';
import {getSubtleColor} from '../_helpers';

export default function CandidatePositionButton(props) {
    
    const {name, image} = props.candidate;


    const [hoverStatus, onHover] = useState(false);
    const parentRef = useRef(null);

    const [backgroundColor, setBackgroundColor] = useState(getSubtleColor);

    const initials = (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    
    return (
        <div 
            style={{backgroundColor}} 
            className={styles.container}
            onMouseEnter={()=>onHover(true)}
            onMouseLeave={()=>onHover(false)}
            ref={parentRef}
        >

            {image ? 
                <img alt={name} className={styles.imgStyle} src={process.env.PUBLIC_URL + `/headshots/${image}`} /> 
            : null}

            <span>{initials}</span>
            <Tooltip placement="auto" isOpen={hoverStatus} target={parentRef.current}>
                {name}
            </Tooltip>
        </div>
    )
}
