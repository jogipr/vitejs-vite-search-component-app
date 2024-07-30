import { useEffect, useState } from 'react';
import './App.css';

const Pill = ({ selectedResult }) => {
  return (
    <div className="pills-container">
      {selectedResult?.map((selection) => {
        return (
          <span className="pill">
            {selection}
            <span className="close">&#10006;</span>
          </span>
        );
      })}
    </div>
  );
};

const SearchList = ({ searchResult, handleSelection }) => {
  return (
    <div className="search-list-container">
      <ul className="search-list">
        {searchResult?.map((result) => {
          return (
            <li
              key={result.id}
              className="search-list-item"
              onClick={() => handleSelection(result)}
            >
              <img src={result.image} />
              <span>
                {' '}
                {result.lastName} {result.firstName}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${searchTerm}`
      );
      const users = (await response.json()) || [];
      const firstSixUsers = users.users?.slice(0, 6);
      console.log(firstSixUsers);
      setSearchResult(firstSixUsers);
    };
    if (searchTerm) getUsers();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelection = (selection) => {
    setSelectedResult([...selectedResult, selection.firstName]);
    setSearchTerm('');
    setSearchResult([]);
  };

  return (
    <>
      <header>Search Component</header>
      <div className="search-container">
        <div>
          <Pill selectedResult={selectedResult} />
          <input
            type="text"
            className="search-input"
            placeholder="Search a user"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
        {searchResult?.length > 0 && (
          <SearchList
            searchResult={searchResult}
            handleSelection={handleSelection}
          />
        )}
      </div>
    </>
  );
}

export default App;
