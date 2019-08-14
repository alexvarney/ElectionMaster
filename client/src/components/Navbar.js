import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Login from './Login';
import styles from './css/Navbar.module.css';
import { connect } from 'react-redux'


export class Navbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      isExpanded: false,
    }
  }

  toggle = () => {
    this.setState(prevState=>({isExpanded: !prevState.isExpanded}));
  }

  getStyle = () => {
    return this.state.isExpanded ? styles.navbar_expanded : styles.navbar;
  }

  close = () => {
    this.setState({isExpanded: false})
  }

  render() {

    return (
      <nav className={this.getStyle()}>

          <div onClick={this.toggle} className={styles.mobileExpander}>
            <span className={styles.menuSelect}>
              <i class="fas fa-bars"></i>
            </span>
            <span className={styles.titleStyle}>
              {this.state.isExpanded ? 'Close Menu':'ElectionsMaster'}
            </span>
          </div>

          <Link onClick={this.close} to="/"><span className={styles.titleStyle}>ElectionsMaster</span></Link>
          
          <Link onClick={this.close} to="/candidates">Candidates</Link>

          <Link onClick={this.close} to="/issues">Issues</Link>

          {this.props.user.token !== "" ?
            <Link onClick={this.close} to="/issues/edit">Issue Editor</Link> : null}

          {this.props.user.token !== "" ?
            <Link onClick={this.close} to="/editpolls">Polling Editor</Link> : null}
          <div className={styles.loginContainer}>
            <Login />
          </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {})(Navbar)