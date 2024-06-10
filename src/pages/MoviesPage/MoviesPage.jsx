import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

const MoviesPage = ({ handleChangeInput, handleSubmit }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const input = event.target.elements.search.value.trim();
    if (input === "") {
      toast.error("Please enter a word");
      return;
    }
    handleSubmit(event);
  };

  return (
    <header >
      <form onSubmit={handleFormSubmit}>
        <input
          
          onChange={handleChangeInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button  type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

MoviesPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};

export default MoviesPage;
