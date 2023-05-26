import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/cart";
import { PaymentProvider } from "./context/payment";

function App() {
  return (
    <CartProvider>
      <PaymentProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </PaymentProvider>
    </CartProvider>
  );
}

export default App;
