import {Product} from "./Product";
import dayjs from "dayjs";

export const products: Product[] = [
  {
    "user": "USER-1",
    "id": "UUID-1",
    "name": "12-134",
    "company": "Fred",
    "type": "CM",
    "count": 1,
    "receptionDate": dayjs(new Date("Sat Feb 22 2025 09:52:08 GMT+0100 (heure normale d’Europe centrale)")),
    "deliveryDate": dayjs(new Date("Tue May 13 2025 10:33:22 GMT+0200 (heure d’été d’Europe centrale)")),
  },
  {
    "user": "USER-2",
    "id": "UUID-2",
    "name": "83-139",
    "company": "Fred",
    "type": "Stock",
    "count": 20,
    "receptionDate": dayjs(new Date("Sat Feb 22 2025 09:53:13 GMT+0100 (heure normale d’Europe centrale)")),
    "deliveryDate": dayjs(new Date("Tue May 13 2025 10:33:22 GMT+0200 (heure d’été d’Europe centrale)")),
  },
  {
    "user": "USER-3",
    "id": "UUID-3",
    "name": "27-470",
    "company": "Chaumet",
    "type": "SAV",
    "count": 1,
    "receptionDate": dayjs(new Date("Sat Feb 22 2025 09:53:37 GMT+0100 (heure normale d’Europe centrale)")),
    "deliveryDate": dayjs(new Date("Tue May 13 2025 10:33:22 GMT+0200 (heure d’été d’Europe centrale)")),
  }
]