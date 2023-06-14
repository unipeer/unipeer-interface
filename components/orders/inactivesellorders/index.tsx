import BuyOrderCard from "components/card/buyorder";
import React from "react";

const inactiveSellOrdersData = [
  {
    id: 1,
    sentAmount: 1000,
    sentCurrency: "USD",
    sentProvider: "Paypal",
    sentProviderLogo: "ic_paypal.svg",
    receiveAmount: 990,
    receiveCurrency: "xDAI",
    receiveProvider: "xDAI",
    receiveProviderLogo: "xdai-logo.png",
    status: "Cancelled",
    statusCode: "CANCEL",
    timeLeft: "00:26:23",
  },
  {
    id: 2,
    sentAmount: 50,
    sentCurrency: "USD",
    sentProvider: "Venmo",
    sentProviderLogo: "ic_venmo.svg",
    receiveAmount: 48,
    receiveCurrency: "USDC",
    receiveProvider: "USDC",
    receiveProviderLogo: "usdc-logo.svg",
    status: "Cancelled",
    statusCode: "CANCEL",
    timeLeft: "00:23:23",
  },
];

const InActiveSellOrders = () => {
  return (
    <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
      {inactiveSellOrdersData.map((order) => {
        return (
          <BuyOrderCard
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

export default InActiveSellOrders;
