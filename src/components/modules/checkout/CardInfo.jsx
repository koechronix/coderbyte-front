import { useState } from "react";
import { ReactComponent as Checkmark } from "../../../assets/svgs/checkmark.svg";
import { ReactComponent as Card } from "../../../assets/svgs/card.svg";
import { usePayment } from "../../../context/payment";

const CardInfo = () => {
  const [isCorrectCvc, setCorrectCvc] = useState({ status: false, id: "" });
  const { payment, deletePayment, setIsOpenPaymentForm, setCardToEdit } =
    usePayment();
  const [selectedCard, setSelectedCard] = useState(payment[0]?.id);

  return (
    <>
      {payment?.map((p) => (
        <div
          key={p?.cardName}
          className="border mb-2 border-slate-300 p-4 rounded-[3px] bg-sky-100"
        >
          <div className="flex flex-col items-start gap-y-2 sm:gap-y-0 sm:flex-row gap-x-4">
            <input
              type="radio"
              name="card"
              checked={p?.id === selectedCard}
              onChange={() => setSelectedCard(p?.id)}
            />
            <div>
              <div className="flex gap-x-4">
                <p>VISA - {p?.id}</p>
                <div>
                  <h3 className="text-lg font-semibold">
                    Visa -{" "}
                    {
                      p?.cardNumber?.split(" ")[
                        p?.cardNumber?.split(" ").length - 1
                      ]
                    }
                  </h3>
                  <p>
                    {p?.cardName} | exp. {p?.expiryDate.split(" ").join("")}{" "}
                  </p>
                  <div>
                    <button
                      onClick={() => {
                        setIsOpenPaymentForm(true);
                        setCardToEdit(p);
                      }}
                      className="pr-2 border-r border-black text-[#026CDF]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deletePayment(p);
                      }}
                      className="pl-2 text-[#026CDF]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex flex-col w-full sm:w-1/3 gap-y-1">
                  <span>Security Code</span>
                  <div>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full py-2 pl-4 pr-8 border outline-none border-slate-300"
                        placeholder="CVV"
                        maxLength={3}
                        onChange={(e) =>
                          e.target.value === p.cvc
                            ? setCorrectCvc((prev) => ({
                                ...prev,
                                id: p.id,
                                status: true,
                              }))
                            : setCorrectCvc((prev) => ({
                                ...prev,
                                id: p.id,
                                status: false,
                              }))
                        }
                      />
                      {isCorrectCvc.status && isCorrectCvc.id === p?.id && (
                        <Checkmark className="absolute w-5 h-auto right-5 inset-y-1/4" />
                      )}
                    </div>
                  </div>
                </label>
                <Card className="mt-8 ml-4" />
                <p className="mt-8 ml-4 text-xs">3-digits on back of card</p>
              </div>
              {!isCorrectCvc.status && isCorrectCvc.id !== p?.id && (
                <p className="text-sm text-red-400">
                  Please enter your card security code
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardInfo;
