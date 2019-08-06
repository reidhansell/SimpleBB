import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AddWModal = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
  };

  return (
    <div>
      <Button className="mt-1" color="primary" onClick={toggle}>Add Workout</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

AddWModal.propTypes = {
  auth: PropTypes.object.isRequired,
  modal: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal
});

export default connect(mapStateToProps)(AddWModal);
