import { Link } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import { useCart } from "../../context/cart";
import { ReactComponent as Cart } from "../../assets/svgs/cart.svg";

const Navbar = () => {
  const { cart } = useCart();
  const numberOfItemsInInCart = cart?.items?.reduce((a, b) => a + b.quantity, 0) || 0;
  
  return (
    <nav className="sticky top-0 z-50 bg-white">
      <PageWrapper>
        <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between">
          <Link to="/">
            <h1 className="relative text-primary-100 font-extrabold text-2xl py-4 pr-0 pl-2 before:content-[''] before:absolute before:left-[40%] before:bottom-4 before:-z-10 before:w-25 before:h-2.5 before:bg-indigo-300/50 before:transform before:-skew-x-12 before:-translate-x-1/2">
              Ticket Master
            </h1>
          </Link>
          <Link to={cart?.items?.length ? "/checkout" : "#"}>
            <div className="flex gap-x-2" onClick={() => {
              if(!cart?.items?.length) alert('please add something to cart!')
            }}>
              <div className="w-12 h-12 p-2 bg-gray-200 rounded-full">
                <Cart className="w-full h-full" />
              </div>
              <div>
                <h3 className="font-bold text-gray-700">My Cart</h3>
                <p className="text-gray-500">{numberOfItemsInInCart} {numberOfItemsInInCart <= 1 ? 'item' : 'items'}</p>
              </div>
            </div>
          </Link>
        </div>
      </PageWrapper>
    </nav>
  );
};

export default Navbar;
