import BuyOrderCard from "components/card/buyorder";
import React from "react";

const activeOrdersData = [
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
    status: "Pay & Confirm",
    statusCode: "PC",
    timeLeft: "00:26:23",
  },
  {
    id: 2,
    sentAmount: 10000,
    sentCurrency: "USD",
    sentProvider: "Paypal",
    sentProviderLogo: "ic_paypal.svg",
    receiveAmount: 9995,
    receiveCurrency: "xDAI",
    receiveProvider: "xDAI",
    receiveProviderLogo: "xdai-logo.png",
    status: "Awaiting seller response",
    statusCode: "ASR",
    timeLeft: "00:23:23",
  },
  {
    id: 3,
    sentAmount: 25,
    sentCurrency: "USD",
    sentProvider: "Paypal",
    sentProviderLogo: "ic_paypal.svg",
    receiveAmount: 24.5,
    receiveCurrency: "USDT",
    receiveProvider: "USDT",
    receiveProviderLogo: "usdt-logo.svg",
    status: "Awaiting seller response",
    statusCode: "ASR",
    timeLeft: "00:00:00",
  },
  {
    id: 4,
    sentAmount: 50,
    sentCurrency: "USD",
    sentProvider: "Venmo",
    sentProviderLogo: "ic_venmo.svg",
    receiveAmount: 48,
    receiveCurrency: "USDC",
    receiveProvider: "USDC",
    receiveProviderLogo: "usdc-logo.svg",
    status: "Completed",
    statusCode: "C",
    timeLeft: "00:00:00",
  },
];

const BuyOrders = () => {
  return (
    <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
      {activeOrdersData.map((order) => {
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

export default BuyOrders;
