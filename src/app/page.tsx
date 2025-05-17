'use client';

import { Context } from "@/app/context"
import { useMemo, useState } from "react";
import { Product } from "@/models/Product";
import { RefProduct } from "@/models/RefProduct";
import { FloatingButton } from "@/components/FloatingButton";
import { ModalGen } from "@/components/ModalGen";
import { Header } from "@/components/Header";
import { DataTable } from "@/components/DataTable";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [refProducts, setRefProducts] = useState<RefProduct[]>([]);

  const contextValue = useMemo(() =>
    ({ open, setOpen, products, setProducts, filteredProducts, setFilteredProducts, refProducts, setRefProducts }),
    [open, products, refProducts, filteredProducts]);

  return (
    <SessionProvider>
      <div className="flex flex-col items-center justify-center w-full">
        <Header />
        <Context.Provider value={contextValue}>
          <div className="relative flex w-full justify-center m-2 p-3">
            <DataTable />
            <FloatingButton />
            <ModalGen />
          </div>
        </Context.Provider>
      </div>
    </SessionProvider>
  );
}
