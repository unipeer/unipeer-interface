export enum OrderStatus {
  CREATED,
  PAID,
  COMPLETED,
  CANCELLED,
  DISPUTED,
  RESOLVED,
  UNDEFINED
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
