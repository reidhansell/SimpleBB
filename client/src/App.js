import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ExerciseList from './components/ExerciseList';
import ExerciseModal from './components/ExerciseModal';
import { Container } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from './actions/authActions';

import Calendar from 'react-calendar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
var date = new Date();
date.setHours(0,0,0,0);
class App extends Component {

  state = {
    date: date
  }

  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  onChange = date => this.setState({date});

  render() {
    const{ auth } = this.props
    return (
        <div className='App'>
          <AppNavbar />
          {auth.isAuthenticated ? (
          <Container>
            <Calendar
              onChange={this.onChange}
              value={this.state.date}
            />
            <ExerciseModal date={this.state.date.toISOString().substring(0, 10).concat('T00:00:00.000Z')}/>
            <ExerciseList date={this.state.date.toISOString().substring(0, 10).concat('T00:00:00.000Z')}/>
          </Container>):(<div style={{textAlign: 'center'}}>
            <h5>Welcome to Simple Bodybuilding
            <br />
            <br />
            Please log in or register above to start tracking activity</h5>
            </div>)}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {loadUser}
)(App);
