import React from 'react';
import styles from './css/CandidatePanelCircle.module.css';

export default function CandidatePanelCircle(props) {
    return (
        <div className={styles.circle_container}>
        <div className={styles.circle}>
            <div className={styles.circle__inner}>
                <div className={styles.circle__wrapper}>
                    <div className={styles.circle__content}>                    
                        {props.children}
                    </div>
                </div>
            </div>
            <div style={props.style} className={styles.circle__after}></div>
        </div>
    </div>
    )
}
