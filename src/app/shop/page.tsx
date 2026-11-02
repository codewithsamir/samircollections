"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Our Collection
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64 w-full">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-gray-500 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <Link
                      href={`/shop/${product._id}`}
                      className="bg-brand text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-dark transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No products available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
