import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { addExercise } from '../actions/exerciseActions';
import PropTypes from 'prop-types';

class ExerciseModal extends Component {
  state = {
    modal: false,
    name: '',
    sets: [[0, 0]],
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeWeight = e => {
    var sets = this.state.sets;
    sets[e.target.name][0] = e.target.value;
    this.setState({});
  };

  onChangeReps = e => {
    var sets = this.state.sets;
    sets[e.target.name][1] = e.target.value;
    this.setState({});
  };

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newExercise = {
      name: this.state.name,
      email: user.email,
      date: this.props.date,
      weight: this.state.weight,
      reps: this.state.reps,
      sets: this.state.sets
    };

    // Add exercise via addExercise action
    this.props.addExercise(newExercise);

    // Close modal
    this.toggle();
  };

  addSet = e =>{
    var sets = this.state.sets;
    sets.push([0, 0]);
    this.setState({});
  };

  

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Button
          color='dark'
          style={{ marginTop: '2rem', marginBottom: '2rem', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={this.toggle}
        >
          Add Exercise
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To exercise List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='exercise'>Exercise</Label>
                <Input
                  type='text'
                  name='name'
                  id='exercise'
                  placeholder='Add exercise'
                  onChange={this.onChange}
                />
                <Label for='exercise'>Weight / Reps</Label>
                {this.state.sets.map((value, index) => (
                  <li key={index} style={{listStyle: 'none'}}>
                  <Row>
                  <Col><Input
                    type='text'
                    name={index}
                    id='weight'
                    placeholder='Add weight'
                    onChange={this.onChangeWeight}
                  /></Col>
  
                  <Col><Input
                    type='text'
                    name={index}
                    id='reps'
                    placeholder='Add reps'
                    onChange={this.onChangeReps}
                  /></Col>
                  </Row>
                  </li>
                ))}
                
                <Button type="button" color='dark' style={{ marginTop: '2rem' }} block onClick={this.addSet}>
                  Add Set
                </Button>
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Exercise
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
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
  { addExercise }
)(ExerciseModal);
