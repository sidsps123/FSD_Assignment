import {Login,Signup,Food,FoodPage} from './components';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
                 <Route exact path='/' element={<Login />}></Route>
                 <Route exact path='/signup' element={< Signup />}></Route>
                 <Route exact path='/food' element={<Food />}></Route>
                 <Route exact path='/food/:id' element={<FoodPage />}></Route>
     </Routes>
     </Router>
  );
}

export default App;
