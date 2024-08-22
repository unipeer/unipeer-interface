export enum OrderStatus {
  CREATED,
  PAID,
  COMPLETED,
  CANCELLED,
  DISPUTED,
  RESOLVED,
  UNDEFINED,
}

export function getOrderStatus(status: number): OrderStatus {
  switch (status) {
    case 0:
      return OrderStatus.CREATED;
    case 1:
      return OrderStatus.PAID;
    case 2:
      return OrderStatus.COMPLETED;
    case 3:
      return OrderStatus.CANCELLED;
    case 4:
      return OrderStatus.DISPUTED;
    case 5:
      return OrderStatus.RESOLVED;
  }
  return OrderStatus.UNDEFINED;
}

export function getOrderStatusText(
  status: OrderStatus,
  isBuyOrder: boolean,
): String {
  switch (status) {
    case 0:
      return isBuyOrder ? "Pay & Confirm" : "Awaiting payment from buyer";
    case 1:
      return isBuyOrder ? "Awaiting seller response" : "Payment done by buyer";
    case 2:
      return "Completed";
    case 3:
      return "Cancelled";
    case 4:
      return !isBuyOrder ? "Order disputed by you" : "Order disputed";
    case 5:
      return "Dispute resolved";
  }
  return "None";
}
