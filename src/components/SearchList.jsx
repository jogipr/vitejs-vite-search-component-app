

export const SearchList = ({ searchResult, handleSelection }) => {
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