import './modal.css'; // se quiser estilização separada

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">X</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;