import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import ModalPublication from "../../Modal/ModalPublication";
import "./PreviewPublication.scss";

const PreviewPublication = ({ publication }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="preview-publication" onClick={() => setShowModal(true)}>
        <Image src={publication.file} className="preview-publication__image" />
      </div>

      <ModalPublication
        showModal={showModal}
        setShowModal={setShowModal}
        publication={publication}
      />
    </>
  );
};

export default PreviewPublication;
