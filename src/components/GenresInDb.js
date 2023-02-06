import React from "react";
import { useState, useEffect, useRef} from 'react';



function GenresInDb() {

  // const [genresCount, setGenresCount] = useState();
  const [categories, setCategories] = useState([]);
  
  function fetchGenres() {
    fetch(`/api/products`)
    .then(res => res.json())
    .then(data => {
      let values = Object.entries(data.countByCategory)
      setCategories(values)
      // setGenresCount(data.countByCategory)
    })
  }

  useEffect(() => {
    fetchGenres();
  }, [])

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Products by Category
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {categories.map((category, i) => {
              return(
                <div className="col-lg-6 mb-4">
                  <div className="card bg-dark text-white shadow">
                    <div className="card-body">
                      {category[0]}
                      <p>{category[1]}</p>
                    </div>
                  </div>
                </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenresInDb;
