import React from 'react';
import {Link} from "react-router-dom";

export default () => {

    const titleStyle = {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: '1em',
    }

  return (
    <nav className="navbar">
        <Link to="/"><span style={titleStyle}>ElectionsMaster</span></Link>
        <Link to="/candidates">Candidates</Link>
    </nav>
  )
}