import { BigNumber } from "ethers";
import { type Unipeer } from "../../contracts/types";

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
  return new Promise<BuyOrder>(() => {
    return {
      orderID: orderRaw.args[0].toNumber(),
      buyer: orderRaw.args[1],
      seller: orderRaw.args[2],
      paymentID: orderRaw.args[3],
      paymentAddress: orderRaw.args[4],
      token: orderRaw.args[5],
      amount: orderRaw.args[6],
      feeAmount: orderRaw.args[7],
      sellerFeeAmount: orderRaw.args[7],
      status: getOrderStatus(status),
      lastInteraction: lastInteraction,
    };
  });
}
