
import { Link } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import { useCart } from "../../context/cart";
import { ReactComponent as Cart } from "../../assets/svgs/cart.svg";

const Navbar = () => {
  const { cart } = useCart();
  const numberOfItemsInCart = cart?.items?.reduce((a, b) => a + b.quantity, 0) || 0;

  const handleCartClick = () => {
    if (!cart?.items?.length) {
      alert("Please add something to cart!");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <PageWrapper>
        <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="logo-link">
            <h1 className="relative text-primary-100 font-logo text-2xl">
              Ticket Master
            </h1>
          </Link>
          <Link
            to={cart?.items?.length ? "/checkout" : "#"}
            className={`cart-link ${cart?.items?.length ? "" : "disabled"}`}
            onClick={handleCartClick}
          >
            <div className="flex gap-x-2 items-center">
              <div className="w-12 h-12 p-2 bg-gray-200 ">
                <Cart className="w-full h-full" />
              </div>
              <div>
                <h3 className="font-bold text-red-700">My Cart</h3>
                <p className="text-gray-500">
                  {numberOfItemsInCart}{" "}
                  {numberOfItemsInCart <= 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </PageWrapper>
    </nav>
  );
};

export default Navbar;
