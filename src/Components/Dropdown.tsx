import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
    if (dropdownRef.current) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="dropdown">
      <button onClick={toggleDropdown}>Toggle Dropdown</button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default Dropdown;
