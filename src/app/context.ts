import {createContext} from "react";
import {StateSetter} from "./types";
import {Product} from "@/models/Product";
import {RefProduct} from "@/models/RefProduct";
import {Dayjs} from "dayjs";


export type ContextProps = {
  open: boolean;
  setOpen: StateSetter<boolean>;
  products: Product[];
  setProducts: StateSetter<Product[]>;
  refProducts: RefProduct[];
  setRefProducts: StateSetter<RefProduct[]>;
};

export const Context = createContext({} as ContextProps);

export type FormContextProps = {
  date: Dayjs;
  setDate: StateSetter<Dayjs>;
  company: string;
  setCompany: StateSetter<string>;
  type: string;
  setType: StateSetter<string>;
  ref: RefProduct;
  setRef: StateSetter<RefProduct>;
  count: number;
  setCount: StateSetter<number>;
}

export const FormContext = createContext({} as FormContextProps);