import Navbar from './components/Layout/Navbar';
import Home from './components/Pages/Home';
import Footer from './components/Layout/Footer';
import { Route, Routes} from 'react-router-dom/dist';
import Product from './components/Layout/Product';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';

function App() {
  return (
    <div className="App">
       <Navbar />
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path='/about' element={<about/>} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path='*' element={<div>404</div>} />
       </Routes>
    <Footer />
    </div>
  );
}

export default App;
