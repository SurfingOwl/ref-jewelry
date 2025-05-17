import { StateSetter } from "@/app/types";
import { Product } from "@/models/Product";
import { RefProduct } from "@/models/RefProduct";
import { Dayjs } from "dayjs";
import { EChartsOption, SetOptionOpts } from "echarts";
import { CSSProperties, MouseEvent, ReactNode } from "react";

export type Order = 'asc' | 'desc';

export type HeadCell = {
  id: keyof Product;
  label: string;
  numeric: boolean;
}

export type EnhancedTableProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Product) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export type SelectProps = {
  label: string;
  elements: string[];
  company?: boolean;
}

export type FreeAutoCompleteProps = {
  options: RefProduct[];
};

export type DatePickerProps = {
  date: Dayjs | null;
  label: string;
  setDate: StateSetter<Dayjs | null>;
}

export type NumberPickerProps = {
  label: string;
}

export type ReactEChartProps = {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export type AuthInterceptorProps = {
  children: ReactNode;
}