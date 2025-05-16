import {Product} from "@/models/Product";
import {Order} from "@/models/types";
import dayjs, {Dayjs} from "dayjs";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof Product>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | Dayjs },
  b: { [key in Key]: number | string | Dayjs },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function isInReceptionRange(receptionTo: Dayjs | null,
                                   receptionFrom: Dayjs | null,
                                   receptionDate: Dayjs) {
  let isWithinReceptionRange = true;

  const minDate = dayjs('0000-01-01');
  const maxDate = dayjs('9999-12-31');

  const receptionFromDate = receptionFrom || minDate;
  const receptionToDate = receptionTo || maxDate;

  console.log('product reception date', receptionDate)
  console.log('reception from date', receptionFromDate)
  console.log('reception to date', receptionToDate)

  if (receptionFromDate && receptionToDate) {
    console.log("DO WE REACH ?")
    console.log("isSame from", receptionDate!.isSame(receptionFromDate))
    console.log("isAfter from", receptionDate!.isAfter(receptionFromDate))
    console.log("isSame to", receptionDate!.isSame(receptionToDate))
    console.log("isBefore to", receptionDate!.isBefore(receptionToDate))
    isWithinReceptionRange =
      (receptionDate.isSame(receptionFromDate) || receptionDate.isAfter(receptionFromDate))
      && (receptionDate.isSame(receptionToDate) || receptionDate.isBefore(receptionToDate));
  }

  console.log("is within range", isWithinReceptionRange)

  return isWithinReceptionRange;
}

export function isInDeliveryRange(deliveryTo: Dayjs | null,
                                  deliveryFrom: Dayjs | null,
                                  deliveryDate: Dayjs) {
  let isWithinDeliveryRange = true;

  const minDate = dayjs('0000-01-01');
  const maxDate = dayjs('9999-12-31');

  const deliveryFromDate = deliveryFrom || minDate;
  const deliveryToDate = deliveryTo || maxDate;

  if (deliveryFromDate && deliveryToDate) {
    isWithinDeliveryRange =
      (deliveryDate.isSame(deliveryFromDate) || deliveryDate.isAfter(deliveryFromDate))
      && (deliveryDate.isSame(deliveryToDate) || deliveryDate.isBefore(deliveryToDate));
  }

  return isWithinDeliveryRange;
}