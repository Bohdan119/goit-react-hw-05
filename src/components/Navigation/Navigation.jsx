import { NavLink } from "react-router-dom";

const Navigation = () => {
  const handleGoBack = () => {
    if (document.referrer.includes("/movies")) {
      window.history.back();
    } else {
      window.location.href = "/movies";
    }
  };

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
      <button onClick={handleGoBack}>Back</button>
    </nav>
  );
};

export default Navigation;
