import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [photos, setPhotos] = useState([]),
    [currentPage, setCurrentPage] = useState(1),
    [fetching, setFetching] = useState(true),
    [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      console.log('fetching')
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
        .then(respons => {
          setPhotos([...photos, ...respons.data]);
          setCurrentPage(prevState => prevState + 1);
          setTotalCount(respons.headers['x-total-count'])
        })
        .finally(() => setFetching(false));
    }
  }, [fetching, currentPage]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [totalCount]);

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight
      - (e.target.documentElement.scrollTop + window.innerHeight) < 100
      && photos.length < totalCount) {
      setFetching(true);
    }
  }

  return (
    <div className={'app'}>
      {photos.map(photos => (
        <div className="photo" key={photos.id}>
          <div className="title">{photos.id}.) {photos.title}</div>
          <img src={photos.thumbnailUrl} alt="img for example" />
        </div>
      ))}
    </div>
  );
}

export default App;
