import React, { useState } from 'react';
import './Dropdown.css'; // Import your component styles if needed

type DropdownProps = {
  options: string[];
  onSelect: (option: string) => void;
};

/* Dropdown component for selecting bank */
const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
    onSelect(option); // Call onSelect callback with selected option
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption || 'Select bank'}
        <i className={`arrow ${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

