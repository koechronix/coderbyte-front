import { ReactComponent as ArrowLeft } from "../../../assets/svgs/arrow-left.svg";
import { ReactComponent as PayPalSlogan } from "../../../assets/svgs/paypal-slogan.svg";
import CardInfo from "./CardInfo";
import PaymentForm from "./PaymentForm";
import { ReactComponent as CheckMark } from "../../../assets/svgs/checkmark.svg";
import { ReactComponent as PayPal } from "../../../assets/svgs/paypal.svg";
import { ReactComponent as Card } from "../../../assets/svgs/card.svg";
import { ReactComponent as Add } from "../../../assets/svgs/add.svg";
import { usePayment } from "../../../context/payment";

const Payment = () => {
  const { setIsOpenPaymentForm, isOpenPaymentForm, setCardToEdit } = usePayment();

  return (
    <div className="border border-slate-300 bg-white p-4 rounded-[3px]">
      <div className="py-2 rounded-[3px] p-2 px-1.5 flex flex-col gap-y-2">
        <div className="flex flex-col items-center mb-4 text-lg font-semibold text-gray-700 md:flex-row md:justify-between md:mb-0">
          <div className="flex items-center text-lg font-semibold text-green-700 gap-x-2">
            <p className="text-xl">Payment</p>
            <CheckMark className="w-6 h-6" />
          </div>
          <PayPalSlogan />
        </div>
        <h2 className="px-4 pt-0 pb-4 text-base font-semibold">
          Use Credit / Debit Card
        </h2>
        <div className="lg:px-4">
          <a
            href="#"
            className="flex items-center mb-4 md:mb-0"
            onClick={() => setIsOpenPaymentForm(false)}
          >
            <ArrowLeft />
            <p className="ml-1 text-primary-200">Back to Stored Cards</p>
          </a>
          {isOpenPaymentForm && <PaymentForm />}
        </div>
        <div>
          {!isOpenPaymentForm && (
            <CardInfo setIsOpenPaymentForm={setIsOpenPaymentForm} />
          )}
          {!isOpenPaymentForm && (
            <div className="flex items-center pb-6 border-b border-slate-200">
              <Add onClick={() => setIsOpenPaymentForm(true)} />
              <Card
                className="ml-4"
                onClick={() => setIsOpenPaymentForm(true)}
              />
              <div
                className="ml-4 text-base font-semibold cursor-pointer text-primary-200"
                onClick={() => {
                  setCardToEdit({})
                  setIsOpenPaymentForm(true)}}
              >
                Add New Card
              </div>
            </div>
          )}
        </div>
        {!isOpenPaymentForm && (
          <div className="px-4 pt-6 text-sm">
            <h2 className="pt-0 pb-4 text-base font-semibold">Or Pay With</h2>
            <div className="flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row gap-x-4">
              <button className="flex items-center justify-center px-10 py-2 rounded-md bg-primary-250">
                <PayPal className="w-12 h-auto" />
              </button>
            </div>
            <p className="pt-6 font-semibold">
             pay later
              options from PayPal or.
            </p>
            <p>
              By using a digital wallet and continuing past this page, you have
              read and are accepting the{" "}
              <span className="text-primary-200">Terms of Use</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
