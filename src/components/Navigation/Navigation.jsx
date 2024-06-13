import { NavLink } from "react-router-dom";
// import PropTypes from 'prop-types';

const Navigation = () => {


  

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
      {/* <button onClick={handleGoBack}>Back</button> */}
    </nav>
  );
};

// Navigation.propTypes = {
//   handleGoBack: PropTypes.func.isRequired,
// };

export default Navigation;
