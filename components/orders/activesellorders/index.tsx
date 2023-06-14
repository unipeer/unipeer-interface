import React from "react";

import SellOrderCard from "components/card/sellorder";

const activeSellOrdersData = [
  {
    id: 1,
    sentAmount: 340,
    sentCurrency: "xDAI",
    sentProvider: "xDAI",
    sentProviderLogo: "xdai-logo.png",
    receiveAmount: 338,
    receiveCurrency: "USD",
    receiveProvider: "Venmo",
    receiveProviderLogo: "ic_venmo.svg",
    status: "Awaiting payment from buyer",
    statusCode: "APB",
    timeLeft: "00:00:00",
  },
  {
    id: 2,
    sentAmount: 70,
    sentCurrency: "xDAI",
    sentProvider: "xDAI",
    sentProviderLogo: "xdai-logo.png",
    receiveAmount: 68,
    receiveCurrency: "USD",
    receiveProvider: "Paypal",
    receiveProviderLogo: "ic_paypal.svg",
    status: "Payment done by buyer",
    statusCode: "PDB",
    timeLeft: "00:26:23",
  },
  {
    id: 3,
    sentAmount: 100,
    sentCurrency: "USDC",
    sentProvider: "USDC",
    sentProviderLogo: "usdc-logo.svg",
    receiveAmount: 98.5,
    receiveCurrency: "USD",
    receiveProvider: "Paypal",
    receiveProviderLogo: "ic_paypal.svg",
    status: "Order disputed by you",
    statusCode: "ODY",
    timeLeft: "00:00:00",
  },
  {
    id: 4,
    sentAmount: 10,
    sentCurrency: "USDC",
    sentProvider: "USDC",
    sentProviderLogo: "usdc-logo.svg",
    receiveAmount: 9,
    receiveCurrency: "USD",
    receiveProvider: "Paypal",
    receiveProviderLogo: "ic_paypal.svg",
    status: "Dispute resolved",
    statusCode: "ODY",
    timeLeft: "00:00:00",
  },
];

const ActiveSellOrders = () => {
  return (
    <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
      {activeSellOrdersData.map((order) => {
        return (
          <SellOrderCard
            key={order.id}
            id={order.id}
            sentAmount={order.sentAmount}
            sentCurrency={order.sentCurrency}
            sentProvider={order.sentProvider}
            sentProviderLogo={order.sentProviderLogo}
            receiveAmount={order.receiveAmount}
            receiveCurrency={order.receiveCurrency}
            receiveProvider={order.receiveProvider}
            receiveProviderLogo={order.receiveProviderLogo}
            status={order.status}
            statusCode={order.statusCode}
            timeLeft={order.timeLeft}
          />
        );
      })}
    </div>
  );
};

export default ActiveSellOrders;
