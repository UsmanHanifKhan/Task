import PropTypes from 'prop-types';

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-red-500"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 011-1h10a1 1 0 011 1v1h4a1 1 0 011 1v1a1 1 0 01-1 1v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a1 1 0 01-1-1V3a1 1 0 011-1h4V1a1 1 0 011-1zM7 4v1h10V4H7zm-1 3v14a1 1 0 001 1h12a1 1 0 001-1V7H6z"
      clipRule="evenodd"
    />
  </svg>
);

const Card = ({ recipe, onClick, isSelected, onRemove, showDeleteIcon }) => (
  <div
    className={`max-w-xs rounded-lg relative overflow-hidden bg-white shadow-lg lg:m-6 border-2 ${
      isSelected ? 'border-blue-900' : 'border-gray-200'
    }`}
    onClick={onClick}
  >
    <img
      className="w-full h-48 p-5 rounded-[2rem]"
      src={recipe.image}
      alt={recipe.name}
    />
    <div className="px-6 py-1">
      <h2 className="font-bold text-xl mb-2">{recipe.name}</h2>
      <p className="text-gray-700 text-[10px]">
        {typeof recipe.instructions === 'string'
          ? recipe.instructions.substring(0, 200)
          : String(recipe.instructions).substring(0, 200)}
        ...
      </p>
    </div>
    <div className="px-2 pt-4 pb-2 flex justify-between items-center">
      <span className="inline-block px-3 py-1 text-[10px] font-semibold text-gray-700 mr-2 mb-2">
        <span className="font-bold">Cuisine</span>: {recipe.cuisine}
      </span>
      <span className="px-3 py-1 text-[10px] font-semibold text-gray-700 mr-2 mb-2 flex">
        <span className="font-bold">Rating</span>: {recipe.rating}
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < Math.floor(recipe.rating);
          const isHalf = index === Math.floor(recipe.rating) && recipe.rating % 1 >= 0.5;

          return (
            <div key={index} className="relative w-4 h-4">
              <svg
                className={`w-4 h-4 ${isFilled ? 'text-blue-900' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.59L12 2 8.91 8.65 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {isHalf && (
                <svg
                  className="absolute top-0 left-0 w-4 h-4 text-blue-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ clipPath: 'inset(0 50% 0 0)' }}
                >
                  <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.59L12 2 8.91 8.65 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              )}
            </div>
          );
        })}
      </span>
      {showDeleteIcon && isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(recipe.id);
          }}
          className="absolute top-2"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  </div>
);

Card.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  showDeleteIcon: PropTypes.bool.isRequired,
};

export default Card;
