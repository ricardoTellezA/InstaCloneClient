import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import ComentForm from "./ComentForm/ComentForm";
import Comment from "./Comment/Comment";
import Actions from "./Actions";
import "./ModalPublication.scss";

const ModalPublication = ({ showModal, setShowModal, publication }) => {
  const onClose = () => setShowModal(false);
  return (
    <Modal open={showModal} onClose={onClose} className="modal-publication">
      <Grid>
        <Grid.Column
          className="modal-publication__left"
          width={10}
          style={{ backgroundImage: `url("${publication.file}")` }}
        />

        <Grid.Column className="modal-publication__right" width={6}>
          <Comment publication={publication} />
          <Actions publication={publication} />
          <ComentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

export default ModalPublication;
