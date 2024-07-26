import { useEffect, useState } from 'react';
import Card from './Card';
import Modal from './Modal';

const Home = () => {
  const [activeButton, setActiveButton] = useState('All Meals');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const url = "https://dummyjson.com/recipes";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      const updatedRecipes = data.recipes.map((recipe, index) => ({
        ...recipe,
        week: weeks[index % weeks.length]
      }));

      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes); 
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (storedRecipes) {
      setRecipes(storedRecipes);
      setFilteredRecipes(storedRecipes);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const filterRecipes = () => {
      if (activeButton === 'All Meals') {
        setFilteredRecipes(recipes);
      } else {
        const weekFilter = activeButton.toLowerCase();
        setFilteredRecipes(recipes.filter(recipe => 
          (recipe.week || '').toLowerCase() === weekFilter
        ));
      }
    };
    filterRecipes();
  }, [activeButton, recipes]);

  const handleCardClick = (id) => {
    setSelectedCard(id);
  };

  const handleAddToWeekClick = () => {
    if (selectedCard !== null) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveWeek = async (week) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === selectedCard ? { ...recipe, week: week } : recipe
    );

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    const weekFilter = activeButton.toLowerCase();
    if (activeButton === 'All Meals') {
      setFilteredRecipes(updatedRecipes);
    } else {
      setFilteredRecipes(updatedRecipes.filter(recipe => 
        (recipe.week || '').toLowerCase() === weekFilter
      ));
    }

    setRecipes(updatedRecipes);
    closeModal();
  };

  const handleRemoveWeek = (id) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, week: null } : recipe
    );

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    const weekFilter = activeButton.toLowerCase();
    if (activeButton === 'All Meals') {
      setFilteredRecipes(updatedRecipes);
    } else {
      setFilteredRecipes(updatedRecipes.filter(recipe => 
        (recipe.week || '').toLowerCase() === weekFilter
      ));
    }

    setRecipes(updatedRecipes);
  };

  return (
    <div className='bg-color'>
      <div className="container mx-auto lg:px-24 md:px-24 p-5 pt-5 pb-5 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Week Orders</h1>
      </div>
      <nav className="bg-white shadow sticky top-0 z-50 p-4">
        <div className="container mx-auto flex flex-wrap lg:px-24">
          <div className="hidden md:flex flex-wrap items-center space-x-4 mb-4 md:mb-0 lg:me-56 md:me-20">
            <div className="flex lg:space-x-20 md:space-x-12">
              {['All Meals', 'Week 1', 'Week 2', 'Week 3', 'Week 4'].map((label) => (
                <button
                  key={label}
                  onClick={() => setActiveButton(label)}
                  className={`font-semibold ${
                    activeButton === label
                      ? 'text-blue-900 border-b-4 border-blue-900'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <button
            className={`bg-blue-900 text-white px-4 py-2  hover:bg-blue-800 ${selectedCard === null ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleAddToWeekClick}
            disabled={selectedCard === null}
          >
            Add to Week
          </button>
          <div className="md:hidden flex ps-32">
            <button
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col space-y-2 p-4">
              {['All Meals', 'Week 1', 'Week 2', 'Week 3', 'Week 4'].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    setActiveButton(label);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`font-semibold ${
                    activeButton === label
                      ? 'text-blue-900 border-b-4 border-blue-900'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="container mx-auto p-4 mt-4">
        <div className="flex flex-wrap lg:px-14 md:px-14">
          {filteredRecipes.map(recipe => (
            <Card 
              key={recipe.id} 
              recipe={recipe} 
              onClick={() => handleCardClick(recipe.id)} 
              isSelected={selectedCard === recipe.id} 
              onRemove={handleRemoveWeek} 
              showDeleteIcon={activeButton !== 'All Meals'}
            />
          ))}
        </div>
      </div>
      {isModalOpen && <Modal onClose={closeModal} onSave={handleSaveWeek} />}
    </div>
  );
};

export default Home;
