'use client';

import {Context} from "@/app/context"
import {useMemo, useState} from "react";
import {Product} from "@/models/Product";
import {RefProduct} from "@/models/RefProduct";
import {FloatingButton} from "@/components/FloatingButton";
import {ModalGen} from "@/components/ModalGen";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [refProducts, setRefProducts] = useState<RefProduct[]>([]);

  const contextValue = useMemo(() =>
      ({open, setOpen, products, setProducts, refProducts, setRefProducts}),
    [open, products, refProducts]);

  return (
    <Context.Provider value={contextValue}>
      <div className="relative">
        <FloatingButton/>
        <ModalGen/>
      </div>
    </Context.Provider>
  );
}
