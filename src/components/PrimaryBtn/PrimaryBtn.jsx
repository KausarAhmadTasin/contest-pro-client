import PropTypes from "prop-types";

const PrimaryBtn = ({ children }) => {
  return (
    <div className="btn bg-[#F97316] hover:bg-[#f39b5b] border-none text-white">
      {children}
    </div>
  );
};

PrimaryBtn.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PrimaryBtn;
