import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getExercises, deleteExercise } from '../actions/exerciseActions';
import PropTypes from 'prop-types';

class ExerciseList extends Component {

  static propTypes = {
    getExercises: PropTypes.func.isRequired,
    exercise: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.getExercises();
  }

  onDeleteClick = id => {
    this.props.deleteExercise(id);
  };

  render() {
    const { exercises } = this.props.exercise;

    return (
      <Container>
        {this.props.isAuthenticated ? (
        <ListGroup style={{width:'80%', margin: 'auto'}}>
          <TransitionGroup className='Exercise-list'>
            {exercises.map(({ _id, name, email, date, sets}) => (
              (this.props.auth.user.email === email && this.props.date === date) ? (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem style={{background:'lightgray'}} className="mb-2"> 
                <Row>
                <h4 style={{marginLeft: '0.5em'}}>{name}</h4>
                  <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                      style={{marginLeft: 'auto'}}
                    >
                      &times;
                    </Button>
                  </Row>
                  <Row style={{background:'white'}} className="border-bottom"><Col><h5>Weight</h5></Col><Col><h5>Reps</h5></Col></Row>
                  {sets.map((index) =>(
                    <div key={index}>
                      <Row style={{background:'white'}} className="border-top border-bottom"><Col>{index[0]}</Col><Col>{index[1]}</Col></Row>
                    </div>
                  ))}
                </ListGroupItem>
              </CSSTransition>
              ) : null
            ))}
          </TransitionGroup>
        </ListGroup>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  exercise: state.exercise,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getExercises, deleteExercise }
)(ExerciseList);
