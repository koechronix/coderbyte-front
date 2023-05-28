import { useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper";
import { useCart } from "../../../context/cart";
import shows from "../../../mock/shows";

const Shows = () => {
  const { setcart, cart } = useCart();
  const [upcomingShows, setUpcomingShows] = useState([]);

  useEffect(() => {
    setUpcomingShows(shows);
  }, []);

  const handleQuantityChange = (event, upcomingShow) => {
    const selectedShow = cart?.items?.find((e) => e.id === upcomingShow.id);
    const quantity = parseInt(event.target.value);

    if (selectedShow) {
      setcart((item) => ({
        ...item,
        items: item?.items?.map((item) =>
          item.id === upcomingShow.id ? { ...item, quantity } : item
        ),
      }));
    } else {
      setcart((item) => ({
        ...item,
        items: item?.items
          ? [...item.items, { ...upcomingShow, quantity }]
          : [{ ...upcomingShow, quantity }],
      }));
    }
  };

  const handleCartButtonClick = (upcomingShow) => {
    const selectedShow = cart?.items?.find((item) => item.id === upcomingShow.id);

    if (selectedShow) {
      setcart((item) => ({
        ...item,
        items: item?.items?.filter((item) => item.id !== upcomingShow.id),
      }));
    } else {
      setcart((item) => ({
        ...item,
        items: item?.items
          ? [...item.items, { ...upcomingShow, quantity: 1 }]
          : [{ ...upcomingShow, quantity: 1 }],
      }));
    }
  };

  return (
    <div className="py-20">
      <PageWrapper>
        <h2 className="mb-10 text-2xl font-bold tracking-wide text-center text-green-500 upperc">
          Upcoming shows
        </h2>
        <div className="grid grid-cols-1 gap-5 md:gap-20 md:grid-cols-2 lg:grid-cols-3">
          {upcomingShows.map((upcomingShow) => (
            <div
              key={upcomingShow.id}
              className="border border-slate-200 bg-green p-1.5 rounded-[3px]"
            >
              <div className="h-40 md:h-[130px] block">
                <img
                  src={upcomingShow.image}
                  alt=""
                  className="object-cover h-full w-full rounded-[3px]"
                />
              </div>
              <div className="py-2 rounded-[3px] p-2 px-1.5 flex flex-col gap-y-2">
                <h1 className="text-lg font-semibold text-green-700 capitalize">
                  {upcomingShow.title}
                </h1>
                <p className="text-sm text-primary-350">{upcomingShow.city} • {upcomingShow.country}</p>
                <p className="text-sm text-primary-350">Ksh{upcomingShow.price.toFixed(2)}</p>
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>Quantity</p>
                    <select
                      value={cart?.items?.find((e) => e.id === upcomingShow.id)?.quantity || 0}
                      onChange={(event) => handleQuantityChange(event, upcomingShow)}
                    >
                      {[1, 2, 3].map((value) => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleCartButtonClick(upcomingShow)}
                    className="my-1 active:scale-95  hover:bg-opacity-100 text-green px-3 py-[6px]  leading-4 font-medium  text-[12px] bg-primary-100 rounded-[2px]"
                  >
                    {cart?.items?.find((item) => item.id === upcomingShow.id)
                      ? "Remove [-]"
                      : "Add [+]"}
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
