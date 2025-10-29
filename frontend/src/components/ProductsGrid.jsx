import React from "react";
import { motion } from "framer-motion";

export default function ProductsGrid({ products, onAdd, loading }) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
        Products
      </h2>
      {loading ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 transition-opacity duration-200"
          aria-busy="true"
        >
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-3">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <motion.div
          className="grid gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all flex flex-col"
              >
                <div className="h-40 sm:h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-40 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 truncate">
                    {p.name}
                  </h3>
                  <p className="text-indigo-600 mt-1 font-semibold">
                    ${p.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => onAdd(p)}
                  className="mt-4 py-2 rounded-lg bg-indigo-600 text-white text-sm sm:text-base hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
