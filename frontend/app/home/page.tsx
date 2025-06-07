"use client";
import { useEffect, useState } from "react";
import { CardComponent } from "../../components/card";
import { fetchProducts } from "../../services/api";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {products.map((product) => (
        <CardComponent
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          price={`$${product.price}`}
        />
      ))}
    </div>
  );
}