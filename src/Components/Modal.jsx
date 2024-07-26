import { useState } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ onClose, onSave }) => {
  const [selectedWeek, setSelectedWeek] = useState(null);

  const handleWeekClick = (week) => {
    setSelectedWeek(week);
  };

  const handleSaveClick = () => {
    onSave(selectedWeek);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-10">
        <h2 className="text-xl font-bold mb-4 text-center">Select Week</h2>
        <div className="flex justify-center mb-4 space-x-4">
          {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week) => (
            <button
              key={week}
              className={`px-4 py-2 rounded-md ${selectedWeek === week ? 'bg-blue-200' : 'bg-gray-200'} text-gray-700`}
              onClick={() => handleWeekClick(week)}
            >
              {week}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-900 text-white px-10 rounded-sm py-2  hover:bg-blue-700" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Modal;
