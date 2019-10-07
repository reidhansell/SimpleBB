import React from "react";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditE = props => {
  const {
    toggle,
    onChange,
    type,
    onChangeType,
    onSubmitEdit,
    exitEdit,
    nameE
  } = props;
  return (
    <>
      <ModalHeader toggle={toggle}>Edit exercise</ModalHeader>
      <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
        <span className="form-group">
          <input
            style={{ fontFamily: "Lexend Deca" }}
            type="text"
            nameE="nameE"
            value={nameE}
            onChange={e => onChange(e)}
            placeholder="Name of exercise"
            className="mx-3"
            required
          />
        </span>
        <br />
        <br />
        <span className="form-group">
          <span className="ml-3">Type:</span>
          <select
            style={{ fontFamily: "Lexend Deca" }}
            name="type"
            value={type}
            onChange={e => onChangeType(e)}
            className="mx-3"
          >
            <option value="lbs">lbs / reps</option>
            <option value="kg">kg / reps</option>
            <option value="mi">mi / time</option>
            <option value="km"> km / time</option>
          </select>
        </span>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={e => onSubmitEdit(e)}>
          Save Exercise
        </Button>
        <Button color="secondary" onClick={() => exitEdit()}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

export default EditE;
