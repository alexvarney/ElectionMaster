import React, {useState, useRef} from 'react'
import styles from './css/CandidatePositionButton.module.css';
import {Tooltip} from 'reactstrap';

export default function CandidatePositionButton(props) {
    
    const {name, image} = props.candidate;


    const [hoverStatus, onHover] = useState(false);
    const parentRef = useRef(null);

    const getSubtleColor = () => {
        const min = Math.ceil(0);
        const max = Math.floor(360);
        const randomVal = Math.floor(Math.random() * (max - min + 1)) + min; 
        return `hsla(${randomVal},42%,22%,1.0)`;
    }

    const [backgroundColor, setBackgroundColor] = useState(getSubtleColor);

    const initials = (name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)).toUpperCase();
    
    return (
        <div 
            style={{backgroundColor}} 
            className={styles.container}
            onMouseEnter={()=>onHover(true)}
            onMouseLeave={()=>onHover(false)}
            ref={parentRef}>

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
