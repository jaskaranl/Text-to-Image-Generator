import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useState } from "react";

const Modal = ({ setModelOpen, setSelectedImage, selectedImage }) => {
  const [error, setError] = useState(null);

  const closeModal = () => {
    setModelOpen(false);
    setSelectedImage(null);
  };
  return (
    <div className="modal">
      <div onClick={closeModal}>X</div>
      <div className="img-container">
        {selectedImage && (
          <img src={URL.createObjectURL(selectedImage)} alt="uploaded"></img>
        )}
      </div>
      <button>Generate</button>
    </div>
  );
};

export default Modal;
