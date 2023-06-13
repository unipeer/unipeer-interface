import React, { useState } from "react";

const dummySellers = [
  {
    address: "0xd4...345b",
    liquidity: "1,000 xDAI",
    fee: "0.01%",
    paymentModes: [
      {
        id: 1,
        name: "Paypal",
        icon: "ic_paypal.svg",
      },
      {
        id: 2,
        name: "Venmo",
        icon: "ic_venmo.svg",
      },
    ],
    reputation: 70,
  },
  {
    address: "0xb5...34fb",
    liquidity: "5,000 USDC",
    fee: "1%",
    paymentModes: [
      {
        id: 1,
        name: "Paypal",
        icon: "ic_paypal.svg",
      },
    ],
    reputation: 93,
  },
  {
    address: "0xe5...34fb",
    liquidity: "10,000 xDAI",
    fee: "5%",
    paymentModes: [
      {
        id: 2,
        name: "Venmo",
        icon: "ic_venmo.svg",
      },
    ],
    reputation: 20,
  },
];

const SellerInfo = () => {
  const [sellers, setSellers] = useState(dummySellers);

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle ">
            <div className="overflow-hidden border-t-2 border-black border-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 font-paragraphs text-12 font-semibold text-dark-500 sm:pl-8"
                    >
                      SELLER ADDRESS
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 font-paragraphs text-12 font-semibold text-dark-500"
                    >
                      LIQUIDITY
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 font-paragraphs text-12 font-semibold text-dark-500"
                    >
                      FEE%
                    </th>
                    <th
                      scope="col"
                      className="pl-3 pr-0 py-3.5 font-paragraphs text-12 font-semibold text-dark-500"
                    >
                      PAYMENT MODES
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 font-paragraphs text-12 font-semibold text-dark-500"
                    >
                      REPUTATION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sellers.map((seller) => (
                    <tr key={seller.address}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-8 flex flex-row items-center gap-1">
                        <div className="font-paragraphs text-14 font-normal text-dark-500">
                          {seller.address}
                        </div>
                        <div className="cursor-pointer">
                          <img src="duplicate.svg" alt="" />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 font-paragraphs text-14 font-normal text-dark-500">
                        {seller.liquidity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 font-paragraphs text-14 font-normal text-dark-500">
                        {seller.fee}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 flex flex-row gap-1">
                        {seller.paymentModes.map((paymentMode) => (
                          <div key={paymentMode.id}>
                            <img
                              src={paymentMode.icon}
                              alt={paymentMode.name}
                            />
                          </div>
                        ))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="w-full bg-dark-100 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full bg-${
                              seller.reputation > 70
                                ? "success"
                                : seller.reputation >= 40
                                ? "warning"
                                : "alert"
                            }`}
                            style={{
                              width: `${seller.reputation}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
