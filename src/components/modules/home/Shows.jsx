import { useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper";
import { useCart } from "../../../context/cart";
import shows from "../../../mock/shows";

const Shows = () => {
  const [upcomingShows, setUpcomingShows] = useState([]);

  useEffect(() => {
    setUpcomingShows(shows);
  }, []);

  const { setcart, cart } = useCart();

  return (
    <div className="py-20">
      <PageWrapper>
        <h2 className="mb-10 text-2xl font-bold tracking-wide text-center text-green-500 upperc">
          Upcoming shows
        </h2>
        <div className="grid grid-cols-1 gap-5 md:gap-20 md:grid-cols-2 lg:grid-cols-3">
          {upcomingShows.map(upcomingShow => (
            <div
              key={upcomingShow.id}
              className="border border-slate-200 bg-white p-1.5 rounded-[3px]"
            >
              <div className="h-40 md:h-[130px] block">
                <img
                  src={upcomingShow.image}
                  alt=""
                  className="object-cover h-full w-full rounded-[3px]"
                />
              </div>
              <div className="py-2 rounded-[3px] p-2 px-1.5 flex flex-col gap-y-2">
                <h1 className="text-lg font-semibold text-gray-700 capitalize">
                  {upcomingShow.title}
                </h1>
                <p className="text-sm text-primary-350">{upcomingShow.city} • {upcomingShow.country}</p>
                <p className="text-sm text-primary-350">${upcomingShow.price.toFixed(2)}</p>
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>Quantity</p>
                    <select
                      value={
                        cart?.items?.find((e) => e.id === upcomingShow.id)
                          ?.quantity || 1
                      }
                      onChange={(event) => {
                        if (cart?.items?.find((item) => item.id === upcomingShow.id)) {
                          setcart((item) => {
                            return {
                              ...item,
                              items: item?.items?.map((item) =>
                                item.id === upcomingShow.id
                                  ? { ...item, quantity: parseInt(event.target.value) }
                                  : item
                              ),
                            };
                          });
                        }else{
                          setcart((item) => {
                            return {
                              ...item,
                              items: item?.items
                                ? [...item.items, { ...upcomingShow, quantity:  parseInt(event.target.value) }]
                                : [{ ...upcomingShow, quantity: parseInt(event.target.value) }],
                            };
                          });
                        }
                       
                      }}
                      className="my-1 active:scale-95 bg-opacity-95 hover:bg-opacity-100 text-gray-700 outline-none border border-gray-300 px-3 py-1.5  leading-4 font-medium  text-xs bg-gray-200 rounded-sm"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      if (cart?.items?.find((item) => item.id === upcomingShow.id)) {
                        setcart((item) => {
                          return {
                            ...item,
                            items: item?.items?.filter(
                              (item) => item.id !== upcomingShow.id
                            ),
                          };
                        });
                      } else {
                        setcart((item) => {
                          return {
                            ...item,
                            items: item?.items
                              ? [...item.items, { ...upcomingShow, quantity: 1 }]
                              : [{ ...upcomingShow, quantity: 1 }],
                          };
                        });
                      }
                    }}
                    className="my-1 active:scale-95 bg-opacity-95 hover:bg-opacity-100 text-white px-3 py-[6px]  leading-4 font-medium  text-[12px] bg-primary-100 rounded-[2px]"
                  >
                    {cart?.items?.find((item) => item.id === upcomingShow.id)
                      ? "Remove from cart"
                      : "add to cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
};

export default Shows;
