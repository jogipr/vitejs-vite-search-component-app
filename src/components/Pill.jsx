
export const Pill = ({ selectedResult }) => {
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