import { ReactComponent as Diners } from "../../../assets/svgs/diners.svg";
import { ReactComponent as Maestro } from "../../../assets/svgs/maestro.svg";
import { ReactComponent as MasterCard } from "../../../assets/svgs/mastercard.svg";
import { ReactComponent as Discover } from "../../../assets/svgs/discover.svg";
import { ReactComponent as Visa } from "../../../assets/svgs/visa.svg";
import { ReactComponent as AmericanExpress } from "../../../assets/svgs/american-express.svg";
import { ReactComponent as AtmCard } from "../../../assets/svgs/card.svg";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { usePayment } from "../../../context/payment";
import { useForm } from "react-hook-form";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    getCardNumberProps,
    getCardImageProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
    meta,
  } = usePaymentInputs();

  const {
    onSubmitPayment,
    handlePaymentFormInput,
    country,
    handleNoPaymentFormInputs,
    setIsOpenPaymentForm,
    cardToEdit,
  } = usePayment();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (meta.error !== undefined) return;
        setIsOpenPaymentForm(false);
        onSubmitPayment({ ...data, id: cardToEdit.id });
      })}
    >
      <div className="flex mt-2 mb-4">
        <AmericanExpress className="w-8 h-6 mt-1 mr-2" />
        <Visa className="w-8 h-6 mt-1 mr-2" />
        <MasterCard className="w-8 h-6 mt-1 mr-2" />
        <Discover className="w-8 h-6 mt-1 mr-2" />
        <Diners className="w-8 h-6 mt-1 mr-2" />
        <Maestro className="w-8 h-6 mt-1 mr-2" />
      </div>
      <label className="flex flex-col gap-y-1">
        <span>Name on Card</span>
        <input
          type="text"
          name="cardName"
          className="py-2 pl-4 pr-8 border outline-none border-slate-300"
          {...register("cardName", {
            value: cardToEdit?.cardName || "",
            required: "Card name is required",
          })}
        />
        {errors.cardName && (
          <p className="text-red-400">{errors.cardName.message}</p>
        )}
      </label>
      <label className="flex flex-col gap-y-1">
        <span>Card Number</span>
        <PaymentInputsWrapper {...wrapperProps}>
          <svg {...getCardImageProps({ images })} />
          <input
            type="text"
            className="py-2 pl-4 pr-8 border outline-none border-slate-300"
            name="cardNumber"
            defaultValue={cardToEdit.cardNumber}
            {...getCardNumberProps({
              onChange: handlePaymentFormInput,
            })}
          />
        </PaymentInputsWrapper>
      </label>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4">
        <div className="flex flex-col col-span-3 lg:flex-row lg:items-center lg:gap-x-2">
          <label className="flex flex-col w-full md:w-1/2 gap-y-1">
            <span>Expiration Date</span>
            <input
              type="text"
              placeholder="MM/YY"
              className="py-2 pl-4 pr-8 border outline-none border-slate-300"
              name="expiryDate"
              defaultValue={cardToEdit.expiryDate || ""}
              {...getExpiryDateProps({
                onChange: handlePaymentFormInput,
              })}
            />
          </label>

          <label className="flex flex-col w-full md:w-1/2 gap-y-1">
            <span>Security Code</span>
            <input
              type="text"
              placeholder="CVV"
              name="cvc"
              defaultValue={cardToEdit.cvc}
              className="py-2 pl-4 pr-8 border outline-none border-slate-300"
              {...getCVCProps({
                onChange: handlePaymentFormInput,
              })}
            />
          </label>
        </div>
        <div className="flex items-center w-full col-span-2 mt-4 text-xs lg:mt-8">
          <AtmCard />
          <p>3-digits on back of card</p>
        </div>
      </div>
      <ul className="ml-3 list-disc">
        {meta.erroredInputs.cardNumber && (
          <li className="text-red-400">{meta.erroredInputs.cardNumber}</li>
        )}
        {meta.erroredInputs.expiryDate && (
          <li className="text-red-400">{meta.erroredInputs.expiryDate}</li>
        )}
        {meta.erroredInputs.cvc && (
          <li className="text-red-400">{meta.erroredInputs.cvc}</li>
        )}
      </ul>
      <label className="flex flex-col gap-y-1">
        <span>Country</span>
        <select
          className="py-2 pl-4 pr-8 border outline-none border-slate-300"
          name="country"
          {...register("country", {
            value: cardToEdit.country || country,
            validate: () => Boolean(country) || "Country is required",
          })}
          onChange={handleNoPaymentFormInputs}
        >
          <option value=""></option>
          <option value="AO">Angola</option>
          <option value="AU">Australia</option>
          
        </select>
        {errors.country && !country && (
          <p className="text-red-400">{errors.country.message}</p>
        )}
      </label>
      <div>
        <label className="flex flex-col gap-y-1">
          <span>Address</span>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <input
              type="text"
              name="address"
              className="w-full py-2 pl-4 pr-8 border outline-none border-slate-300"
              {...register("address", {
                value: cardToEdit?.address || "",
                required: "Please your billing address",
              })}
            />
          </div>
          {errors.address && (
            <p className="text-red-400">{errors.address.message}</p>
          )}
        </label>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-x-1">
          <label className="flex flex-col w-full gap-y-1">
            <span>City</span>
            <input
              type="text"
              name="city"
              className="py-2 pl-4 pr-8 border outline-none border-slate-300"
              {...register("city", {
                value: cardToEdit?.city || "",
                required: "Please add your city",
              })}
            />
            {errors.city && (
              <p className="text-red-400">{errors.city.message}</p>
            )}
          </label>
          <label className="flex flex-col w-full gap-y-1">
            <span>Postal Code</span>
            <input
              type="text"
              name="postalCode"
              className="py-2 pl-4 pr-8 border outline-none border-slate-300"
              {...register("postalCode", {
                value: cardToEdit?.postalCode || "",
                required: "Please add postal code",
              })}
            />
            {errors.postalCode && (
              <p className="text-red-400">{errors.postalCode.message}</p>
            )}
          </label>
        </div>
        <label className="flex flex-col gap-y-1">
          <span>Phone Number</span>
          <input
            type="text"
            name="phoneNumber"
            className="py-2 pl-4 pr-8 border outline-none border-slate-300"
            {...register("phoneNumber", {
              value: cardToEdit?.phoneNumber || "",
              required: "Please add your phone number",
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-400">{errors.phoneNumber.message}</p>
          )}
        </label>
      </div>
      <div className="flex justify-center mt-4 lg:justify-end gap-x-4">
        <button
          onClick={() => {
            setIsOpenPaymentForm(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-base text-white rounded-sm hover:bg-primary-200/50 bg-primary-200"
        >
          Add new card
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
