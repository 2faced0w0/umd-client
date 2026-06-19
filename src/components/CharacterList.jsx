import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData } from '../store/characterReducer';

const CharacterList = () => {
  const dispatch = useDispatch();
  const { data, error, totalPages } = useSelector((state) => state.characters);
  
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllData(page));
  }, [dispatch, page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (error) {
    console.log("Error fetching characters", error);
    return <div className="">Error</div>;
  }

  return (
    <div className="card mt-3 shadow-sm">
      <div className="card-body">
        <h4 className="card-title mb-4">Rick & Morty Characters</h4>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Species</th>
                  <th>Origin Name</th>
                  <th>Location Name</th>
                </tr>
              </thead>
              <tbody>
                {data.map(char => (
                  <tr key={char.id}>
                    <td>{char.name}</td>
                    <td>
                      <span>
                        {char.status}
                      </span>
                    </td>
                    <td>{char.species}</td>
                    <td>{char.origin.name}</td>
                    <td>{char.location.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <button 
            className="btn btn-outline-primary" 
            onClick={handlePrevious} 
            disabled={page === 1}
          >
            Previous
          </button>
          
          <span>
            Page {page} of {totalPages}
          </span>
          
          <button 
            className="btn btn-outline-primary" 
            onClick={handleNext} 
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
