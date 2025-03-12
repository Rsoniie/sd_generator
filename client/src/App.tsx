
// import React  from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';



import HomePage from './pages/Home';
import Response from './pages/Response';

const App = () => {

    return (

        <BrowserRouter>

            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/response" element={<Response/>} />
            </Routes>
        </BrowserRouter>

        
    )
}
  


export default App;