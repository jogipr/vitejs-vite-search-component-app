import { useEffect, useRef, useState } from 'react';
import { ChildComponentExposedFeature } from './components/ChildComponentExposedFeature';
import { Pill } from './components/Pill'
import { SearchList } from './components/SearchList'
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);
  const refExample = useRef()

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

  const handleClickMe = () => {
    if (refExample.current) {
      console.log(refExample.current);
      refExample.current.handleClickMe();
    }
  }

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
      <div className='ref-conatiner'>
        <div>Ref and useImperativeHandle Exmaple</div>
        <button onClick={handleClickMe}>Parent Component Button</button>
        <ChildComponentExposedFeature ref={refExample} />
      </div>
    </>
  );
}

export default App;
