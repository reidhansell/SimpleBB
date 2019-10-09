import React from "react";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import uuid from "uuid";
const CreateW = props => {
  const {
    toggle,
    onSubmitEditW,
    nameW,
    onChange,
    exercises,
    onRemoveExercise,
    searchExercise,
    user,
    onClick2,
    onDeleteExercise,
    toCreateE,
    toEditE,
    exitEditW
  } = props;
  return (
    <>
      <ModalHeader toggle={toggle}>Edit workout</ModalHeader>
      <form className="form" onSubmit={e => onSubmitEditW(e)}>
        <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
          <span className="form-group">
            <input
              style={{ fontFamily: "Lexend Deca" }}
              className="ml-3"
              type="text"
              placeholder="Name of workout..."
              value={nameW}
              name="nameW"
              onChange={e => onChange(e)}
              required
            />
          </span>
          <br />
          <br />
          {exercises.length === 0 ? (
            <div className="ml-3 border-bottom">
              No exercises added
              <br />
              <br />
            </div>
          ) : (
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {exercises.map(x => {
                return x.name === null ? null : (
                  <div
                    key={x._id || uuid.v4()}
                    className="border-top border-bottom my-2"
                    style={{ display: "flex" }}
                  >
                    <li className="my-1 ml-3 mr-auto">{x.name}</li>
                    <Button
                      className="ml-auto"
                      color="primary"
                      style={{ borderRadius: "0" }}
                      onClick={e => onRemoveExercise(e, x)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </div>
                );
              })}
            </ul>
          )}
          <br />
          <p className="ml-3">Add exercises to new workout:</p>

          <input
            style={{ fontFamily: "Lexend Deca" }}
            className="ml-3"
            type="search"
            name="searchExercise"
            placeholder="Search..."
            value={searchExercise}
            onChange={e => onChange(e)}
          />
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {user.exercises.map(x => {
              return x.name === null ? null : x.name.includes(
                  searchExercise
                ) ? (
                <div
                  key={x._id}
                  className="border-top border-bottom my-2"
                  style={{ display: "flex" }}
                >
                  <li
                    className="clickable mr-auto my-1 ml-3 w-100"
                    onClick={e => onClick2(e, x)}
                  >
                    {x.name}
                  </li>
                  <span
                    className="text-secondary clickable pl-2 pr-2 pt-2"
                    onClick={() => toEditE(x)}
                  >
                    Edit
                  </span>
                  <Button
                    color="primary"
                    style={{ borderRadius: "0" }}
                    onClick={e => onDeleteExercise(e, x._id)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </div>
              ) : null;
            })}
          </ul>
          <div className="w-100 text-center">
            <Button color="primary" onClick={() => toCreateE()}>
              <small>Create new exercise</small>
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save workout"
          />

          <Button color="secondary" onClick={() => exitEditW()}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default CreateW;
