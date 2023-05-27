import { useState } from "react";
import { useCart } from "../../../context/cart";
import { ReactComponent as ArrowUp } from "../../../assets/svgs/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../../assets/svgs/arrow-down.svg";
import { usePayment } from "../../../context/payment";
import { useNavigate } from "react-router-dom";
import Modal from "../../common/Modal";

const Invoice = () => {
  const navigate = useNavigate()
  const { cart ,setcart} = useCart();
  const {setPayment, payment}=usePayment()
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleClick = () => setIsOpen(!isOpen);

  const handleChecked = () => setIsChecked(!isChecked);
  

  const total = 
    cart?.items
      .map((e) => ({ ...e, subTotal: e.quantity * e.price }))
      ?.reduce((a, b) => a + b.subTotal, 0) || 0;

  const handlePlaceOrder = () => {
    if(!isChecked || !payment?.length )return;
    setPaymentProcessing(true);
    setShowModal(true);
    setTimeout(() => {
      setPaymentProcessing(false);
    }, 3000)

    setTimeout(() => {
      setShowModal(false);
      setPayment(localStorage.clear())
      setcart(localStorage.clear())
      navigate('/')
    }, 5000)
  }

  

  return (
    <>
    {showModal && <Modal paymentProcessing={paymentProcessing} />}
    <div className="mt-6 lg:mt-0">
      <div className="border border-slate-300 bg-white py-6 rounded-[3px]">
        <div className="py-2 rounded-[3px] p-2 px-4 flex flex-col gap-y-2">
          <div className="flex items-center justify-between text-xl font-semibold text-green-700">
            <h3>Total</h3>
            <div className="flex items-center gap-x-1">
              <p>${total.toFixed(2)}</p>
              <button onClick={handleClick}>
                {isOpen ? <ArrowUp /> : <ArrowDown />}
              </button>
            </div>
          </div>
          {isOpen && (
            <div>
              <div>
                <h4 className="mb-2 text-base font-semibold">Tickets</h4>
                {cart?.items?.map( item => (
                <div className="flex justify-between my-2 text-sm" key={item.id}>
                  <p>{item.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}: ${item.price} x {item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>))}
              </div>
              <div>
                <h4 className="mb-2 text-base font-semibold">Fees</h4>
                <div className="flex justify-between text-sm">
                  <p>Service Fee: $0.00</p>
                  <p>$0.00</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Order Processing Fee</p>
                  <p>$0.00</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col text-sm gap-y-3">
            <p>*All Sales Final - No Refunds or Exchanges</p>
            <div className="flex items-center gap-x-1">
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={handleChecked}
              />
              <label>
                I have read and agree to the current{" "}
                <span className="text-primary-200">Terms of Use</span>.
              </label>
            </div>
            <button 
              onClick={handlePlaceOrder}
              className={`px-3.5 py-2  text-base text-white rounded-sm ${isChecked && payment?.length ? "bg-primary-150":'bg-primary-150/40 cursor-not-allowed'}`}
              disabled={!isChecked}
            >
              Place Order
            </button>
            <p className="text-xs font-semibold">
              *Exceptions may apply, see our Terms of Use.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Invoice;
