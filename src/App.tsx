import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import BigSmall from './components/BigSmall';



function App() {
  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bigsmall" element={<BigSmall />} />
        

       </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App