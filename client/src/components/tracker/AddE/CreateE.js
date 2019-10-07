import React from "react";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateE = props => {
  const {
    toggle,
    onSubmit,
    onChange,
    type,
    onChangeType,
    exitCreate,
    nameE
  } = props;
  return (
    <>
      <ModalHeader toggle={toggle}>Create exercise</ModalHeader>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
          <span className="form-group">
            <input
              style={{ fontFamily: "Lexend Deca" }}
              type="text"
              name="nameE"
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
          <input
            type="submit"
            className="btn btn-primary"
            value="Create exercise"
          />
          <Button color="secondary" onClick={() => exitCreate()}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default CreateE;
