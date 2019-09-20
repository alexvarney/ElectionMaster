import React from 'react'

export default function ContestHome(props) {

    const {contest} = props;

    if(!contest) return (
        <div>
            <p>No contest selected</p>
        </div>
    )

    return (
        <div>
            <h1>{contest.name}</h1>
            <p>{contest.description}</p>
        </div>
    )
}
