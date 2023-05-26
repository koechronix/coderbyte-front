import { createContext, useCallback, useContext, useState } from "react";
const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [isOpenPaymentForm, setIsOpenPaymentForm] = useState(false);
  const [cardToEdit, setCardToEdit] = useState({});

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [country, setCountry] = useState("");
  const [payment, setPayment] = useState(
    () => JSON.parse(localStorage.getItem("payment")) || []
  );

  const handlePaymentFormInput = useCallback((event) => {
    setCardInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleNoPaymentFormInputs = useCallback((event) => {
    setCountry(event.target.value);
  }, []);

  const deletePayment = (pay) => {
    const filtered = payment.filter((e) => e.id !== pay.id);
    setPayment(filtered);
    localStorage.setItem("payment", JSON.stringify(filtered));
  };

  const updateCard = (data) => {
    const existingPayments =
      JSON.parse(localStorage.getItem("payment")) || [];
    const updatedPayments = existingPayments.map((payment) => {
      if (payment.id !== data.id) return payment;
      return {
        cardName: data.cardName || cardToEdit.name,
        cardNumber: cardInfo.cardNumber || cardToEdit.cardNumber,
        id: data.id || cardToEdit.id,
        expiryDate: cardInfo.expiryDate || cardToEdit.expiryDate,
        cvc: cardInfo.cvc || cardToEdit.cvc,
        country: data.country || cardToEdit.country,
        address: data.address || cardToEdit.address,
        city: data.city || cardToEdit.city,
        postalCode: data.postalCode || cardToEdit.postalCode,
        phoneNumber: data.phoneNumber || cardToEdit.phoneNumber,
      };
    });

    localStorage.setItem("payment", JSON.stringify(updatedPayments));
    setPayment(updatedPayments);
    setCardToEdit({});
  };

  const createCard = (data) => {
    // update the existing payment in the local storage
    const existingPayments =
      JSON.parse(localStorage.getItem("payment")) || [];
    const newPaymentCard =   { ...data, ...cardInfo, id: payment?.length + 1 }

    const updatedPayments = JSON.stringify([
      ...existingPayments,
      newPaymentCard,
    ]);
    localStorage.setItem("payment", updatedPayments);

    // update the existing payment in the app state
    setPayment((prev) => {
      if (prev) return [...prev, newPaymentCard];
      return [newPaymentCard];
    });
  };

  const onSubmitPayment = (data) => {
    if (data.id) updateCard(data);
    else createCard(data);
  };

  return (
    <PaymentContext.Provider
      value={{
        cardInfo,
        payment,
        setPayment,
        handlePaymentFormInput,
        handleNoPaymentFormInputs,
        onSubmitPayment,
        country,
        isOpenPaymentForm,
        setIsOpenPaymentForm,
        setCardInfo,
        deletePayment,
        cardToEdit,
        setCardToEdit,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
