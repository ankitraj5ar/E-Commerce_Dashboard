import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* /* //privateComponent */}
          <Route  element={<PrivateComponent/>}>
            <Route path='/' element={<Products /> }/>
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/delete' element={<h1>Delete Product Component </h1>} />
            <Route path='/profile' element={<h1>Profile Component </h1>} />
          </Route>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login'  element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
