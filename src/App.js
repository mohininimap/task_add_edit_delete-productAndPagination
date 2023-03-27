import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/addProduct" element={<AddProduct/>}> </Route>
      <Route path="/editProduct/:id" element={<EditProduct/>}> </Route>

    </Routes>
    </div>
  );
}

export default App;
