import React from 'react'

import styles from './css/CandidateListCard.module.css'

export default function CandidateListCard(props) {

    const {image, name, polling, slogan, _id} = props.candidate;
    const lastName = name.substring(name.indexOf(' ')+1)
    const firstName = name.split(' ')[0]


    return (
        <SidebarContainer active={props.selected === props.candidate._id} onClick={()=>props.onSelect(_id)}>
            <div className={styles.imgContainer}>
            {(image)?<img alt={name} className={styles.imgStyle} src={process.env.PUBLIC_URL + `/headshots/${image}`} />:null}
            </div>
            <div className={styles.textContainer}>
                <p className={styles.percentageText}>
                    <span>{(polling && polling > 0)?polling + '%':null}</span><br/>                    
                </p>
                <p>
                    <span>{firstName}</span><br />
                    <span className={styles.surnameStyle}>{lastName}</span><br />
                </p>
                <span className={{...styles.sloganText}}>{slogan}</span>
            </div>
        </SidebarContainer>

    )
}

const SidebarContainer = (props) => {

    if(props.active){
        return (
            <div className={styles.active} onClick={props.onClick} >
                {props.children}
            </div>
    )}

    return (
        <div className={styles.container} onClick={props.onClick} >
            {props.children}
        </div>
    )
}