import {Dayjs} from "dayjs";

export type Product = {
  user: string
  id: string;
  name: string;
  company: string;
  type: string;
  count: number;
  receptionDate: Dayjs;
  deliveryDate: Dayjs;
}