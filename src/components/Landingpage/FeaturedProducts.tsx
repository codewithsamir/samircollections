"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get("/api/products");
        // For now, just take the first 4 products as featured
        setProducts(response.data.products.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <div key={product._id} className="group relative">
          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
          </div>
          <h3 className="mt-4 text-sm text-brand-dark font-medium">
            <Link href={`/shop/${product._id}`}>
              <span className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-medium text-brand-dark">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
