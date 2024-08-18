import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      onSearch(searchTerm);
      setSearchTerm(''); // 검색 후 입력 필드 초기화
    }
  };

  return (
    <div className="search-bar">

<InputGroup className="mb-3">
        <Form.Control
        type="text" 
        placeholder="Search for a city" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="success" id="button-addon2">
          Button
        </Button>
      </InputGroup>

      {/* <input 
        type="text" 
        placeholder="Search for a city" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Enter 키로 검색
        className="search-input"
      />
      <Button onClick={handleSearch} className="search-button" variant="success">Search</Button> */}
    </div>
  );
};

export default SearchBar;