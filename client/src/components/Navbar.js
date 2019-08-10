import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Login from './Login';
import styles from './css/Navbar.module.css';
import { connect } from 'react-redux'

export class Navbar extends Component {

  render() {

    return (
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <Link to="/"><span className={styles.titleStyle}>ElectionsMaster</span></Link>
          
          <Link to="/candidates">Candidates</Link>

          <Link to="/issues">Issues</Link>

          {this.props.user.token !== "" ?
            <Link to="/issues/edit">Issue Editor</Link> : null}

          {this.props.user.token !== "" ?
            <Link to="/editpolls">Polling Editor</Link> : null}

          {this.props.user.token !== "" ?
            <Link to="/profile">Profile</Link> : null}

        </div>

        <Login />
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {})(Navbar)