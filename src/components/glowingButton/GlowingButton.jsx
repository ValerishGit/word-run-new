import PropTypes from "prop-types";

const GlowingButton = ({ children, onClick }) => {
  GlowingButton.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
  };
  return (
    <button
      onClick={onClick}
      className={`text-orange bg-red hover:before:bg-orange  relative h-[50px] w-40 overflow-hidden  border-orange-300 border-2  px-3 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-300 before:transition-all before:duration-300 hover:text-gray-800 hover:shadow-orange-300 hover:before:left-0 hover:before:w-full cursor-pointer`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GlowingButton;
