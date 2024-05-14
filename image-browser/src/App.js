import "./App.css"
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageList from "./Components/ImageList/ImageList";
import ImageDetails from './Components/ImageDetails/ImageDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ImageList />} />
        <Route path='/image/:id' element={<ImageDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
