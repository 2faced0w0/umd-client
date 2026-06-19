import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData } from '../store/characterReducer';

const CharacterList = () => {
  const dispatch = useDispatch();
  const { 
    data, 
    error, 
    totalPages 
  } = useSelector((state) => state.characters);
  
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllData(page));
  }, [page]);

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
    return <div className="alert alert-danger" role="alert">
      Error fetching characters
    </div>;
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

        <nav className="mt-4">
          <ul className="pagination justify-content-center mb-0">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePrevious}>
                Previous
              </button>
            </li>
            
            {page > 1 && (
              <li className="page-item">
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  {page - 1}
                </button>
              </li>
            )}
            
            <li className="page-item active" aria-current="page">
              <button className="page-link">
                {page}
              </button>
            </li>
            
            {page < totalPages && (
              <li className="page-item">
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  {page + 1}
                </button>
              </li>
            )}
            
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="text-center mt-2 text-muted small">
          Page {page} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
