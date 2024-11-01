
import './App.css';
import Footer from './components/Footer';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import ProductDetail from './Pages/ProductDetail';
import SearchPage from './Pages/SearchPage';
import HairCare from './Pages/HairCare';
import SkinCare from './Pages/SkinCare';
import Personal from './Pages/Personal';
import Fragrance from './Pages/Fragrance';
import Accessories from './Pages/Accessories';
import Cart from './Pages/Cart';
import Main from './Pages/Main';
import Makeup from './Pages/Makeup';
import { CartProvider } from './components/CartContext';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
function App() {
  return (
    <CartProvider> 
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/makeup" element={<Makeup />} />
            <Route path="/fragrance" element={<Fragrance />} />
            <Route path="/skincare" element={<SkinCare />} />
            <Route path="/haircare" element={<HairCare />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/productDetail/:id" element={<ProductDetail />} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/payment' element={<Payment/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </CartProvider>

  );
}

export default App;
