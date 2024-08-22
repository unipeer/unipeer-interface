import { BigNumber } from "ethers";
import { type Unipeer } from "../../contracts/types";
import { OrderStatus, getOrderStatus } from "./order_status";

export type BuyOrder = {
  orderID: number;
  buyer: string;
  seller: string;
  paymentID: number;
  paymentAddress: string;
  token: string;
  amount: BigNumber;
  feeAmount: BigNumber;
  sellerFeeAmount: BigNumber;
  status: OrderStatus;
  lastInteraction: BigNumber;
};

export async function getOrderFromRawData(
  orderRaw: any,
  unipeer: Unipeer,
): Promise<BuyOrder> {
  const { status, lastInteraction } = await unipeer.orders(orderRaw.args[0]);
  console.log(
    `parsing order ${orderRaw} status ${status} and interaction ${lastInteraction}`,
  );
  const orderStatusResult = getOrderStatus(status);
  console.log(`parsed order status ${orderStatusResult}`);
  console.log(`parsing 1 ${orderRaw.args[0].toNumber()}`);
  console.log(`parsing 2 ${orderRaw.args[1]}`);
  console.log(`parsing 3 ${orderRaw.args[2]}`);
  console.log(`parsing 4 ${orderRaw.args[3]}`);
  console.log(`parsing 5 ${orderRaw.args[4]}`);
  console.log(`parsing 6 ${orderRaw.args[5]}`);
  console.log(`parsing 7 ${orderRaw.args[6]}`);
  console.log(`parsing 8 ${orderRaw.args[7]}`);
  // return a new promise
  return new Promise<BuyOrder>((resolve, reject) => {
    const result = {
      orderID: orderRaw.args[0].toNumber(),
      buyer: orderRaw.args[1],
      seller: orderRaw.args[2],
      paymentID: orderRaw.args[3],
      paymentAddress: orderRaw.args[4],
      token: orderRaw.args[5],
      amount: orderRaw.args[6],
      feeAmount: orderRaw.args[7],
      sellerFeeAmount: orderRaw.args[7],
      status: orderStatusResult,
      lastInteraction: lastInteraction,
    };
    resolve(result);
  });
}
