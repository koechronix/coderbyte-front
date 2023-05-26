import { ReactComponent as Checkmark } from "../../assets/svgs/checkmark.svg";
import { Oval } from "react-loader-spinner";

const Modal = ({ paymentProcessing }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
      <div className="px-6 py-4 bg-primary-100 bg-opacity-90 bg-gradient-to-b w-11/12 sm:max-w-[400px] lg:max-w-[600px] mt-[40%] md:mt-[30%] lg:mt-[20%] mx-auto rounded-xl">
        <h1 className="text-lg font-semibold text-center text-white uppercase sm:text-2xl">
          {paymentProcessing ? "Payment Processing..." : "Payment Processed!"}
        </h1>

        <p className="flex justify-center">
          {paymentProcessing ? (
            <Oval
              height={72}
              width={72}
              color="#4fa94d"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
              visible={true}
              ariaLabel="oval-loading"
            />
          ) : (
            <Checkmark className="w-20 h-20" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Modal;
