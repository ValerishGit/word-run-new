import PropTypes from "prop-types";
import "./CustomModal.css";
import myImage from "../../assets/how_to.png"; // Adjust the path to your image

const Modal = ({ isModalOpen, onClose }) => {
  Modal.propTypes = {
    onClose: PropTypes.func,
    isModalOpen: PropTypes.bool,
  };
  return (
    <div
      className={`fixed inset-0 flex transition-opacity duration-700 items-center justify-center bg-opacity-87 bg-opacity-50   ${
        isModalOpen ? "opacity-100 z-50  " : "opacity-0 -z-99"
      } `}
    >
      <div className={`bg-gray-800 p-8  rounded-lg  max-w-md m-4 relative`}>
        <button
          className="absolute top-0 left-0 mt-2 ml-2 p-2 text-gray-300 hover:text-red-400 transition-colors"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <br></br>
        <h1 className="text-3xl font-bold mb-4 text-orange-300 ">
          How to Play
        </h1>
        <p className="mb-4 text-left">
          WordRun is a game to test how fast you type. You have 30 seconds to
          type out as many words as you see that appear on the screen.
        </p>
        <h3 className="text-xl font-bold mb-2">Instructions:</h3>
        <div>
          <img src={myImage} alt="My Image" className="rounded-lg" />
        </div>
        <br></br>
        <ol className="list-decimal ml-6 text-left">
          <li>Type the word you see on the screen.</li>
          <li>You will receive the next word.</li>
          <li>Keep typing as many words as you can within 30 seconds.</li>
          <li>Earn points based on the length of each word you type.</li>
        </ol>
      </div>
    </div>
  );
};
export default Modal;
