import React from 'react'

export default function CandidateListCard(props) {
    const styles = {
        container: {
            display: 'flex',
            width: '350px',
            minHeight: '80px',
            backgroundColor: '#ededed',
            color: '#00050f',
            borderRadius: '10px',
            margin: '0.5rem 0.5rem 0.5rem 0.5rem',
            cursor: 'pointer',
        },
        imgContainer: {
            padding: '10px'
        },
        imgStyle: {
            maxWidth: '80px',
            borderRadius: '50%',
            border: '2px solid #000',
            margin: '0.5rem 0 0 0',
        },
        textContainer: {
            flexGrow: '1',
            padding: '1rem 0 1rem 0.5rem',
        },
        surnameStyle: {
            fontWeight: 'bold',
            fontSize: '20px'
        },
        percentageText: {
            float: 'right',
            paddingRight: '15px',
            textAlign: 'right',
            fontSize: '22px',
            color: '#00050f',
            marginBottom: '0',
            fontWeight: '500',
        },
        sloganText: {
            textAlign: 'right',
            float: 'right',
            padding: '0px 15px 0px 0px',
            fontSize: '12px',
        },
    }

    const {image, name, polling, slogan, _id} = props.candidate;
    const lastName = name.substring(name.indexOf(' ')+1)
    const firstName = name.split(' ')[0]

    return (
        <div className="candidateListCard" style={styles.container} onClick={()=>props.onSelect(_id)}>
            <div style={styles.imgContainer}>
            {(image)?<img alt={name} style={styles.imgStyle} src={process.env.PUBLIC_URL + `/headshots/${image}`} />:null}
            </div>
            <div style={styles.textContainer}>
                <p style={styles.percentageText}>
                    <span>{(polling && polling > 0)?polling + '%':null}</span><br/>                    
                </p>
                <p>
                    <span>{firstName}</span><br />
                    <span style={styles.surnameStyle}>{lastName}</span><br />
                </p>
                <span style={{...styles.sloganText}}>{slogan}</span>
            </div>
        </div>

    )
}
