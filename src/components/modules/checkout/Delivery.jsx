import { ReactComponent as CheckMark } from "../../../assets/svgs/checkmark.svg";

const Delivery = () => {
    return (
      <div className="border border-slate-300 bg-white p-4 rounded-3px">
        <div className="py-2 rounded-3px p-2 px-1.5 flex flex-col gap-y-2">
          <div className="flex items-center text-lg font-semibold text-green-700 gap-x-2">
            <p className="text-xl">Delivery</p>
            <CheckMark className="w-6 h-6" />
          </div>
          <div className="pt-4 text-sm text-gray-600">
            <h3 className="text-base font-semibold">Mobile - Free</h3>
            <p className="pt-2 text-sm">Your phone, your ticket. Locate your tickets in your account - or in your app. When you go mobile, your tickets will not be emailed to you or available for print.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Delivery;
  