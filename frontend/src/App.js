import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import ProductsGrid from "./components/ProductsGrid";
import CartView from "./components/CartView";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";

import api from "./api/api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [view, setView] = useState("products");
  const [receipt, setReceipt] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCart(data || { items: [], total: 0 });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await api.post("/cart", {
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.image,
      });
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleCheckoutComplete = (receiptData) => {
    setReceipt(receiptData);
    setShowCheckout(false);
    fetchCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600 truncate">
            Mock E-Com Cart
          </h1>

          <nav className="flex gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => setView("products")}
              className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                view === "products"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="hidden sm:inline">Products</span>
              <span className="sm:hidden">Shop</span>
            </button>

            <button
              onClick={() => setView("cart")}
              className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                view === "cart"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">
                Cart {cart.items.length > 0 && `(${cart.items.length})`}
              </span>
              <span className="xs:hidden">
                {cart.items.length > 0 && `${cart.items.length}`}
              </span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-4 sm:py-6 md:py-8">
        {view === "products" && (
          <ProductsGrid
            products={products}
            onAdd={handleAddToCart}
            loading={loadingProducts}
          />
        )}

        {view === "cart" && (
          <CartView
            cart={cart}
            refresh={fetchCart}
            onCheckout={() => setShowCheckout(true)}
          />
        )}

        {showCheckout && (
          <CheckoutForm
            cart={cart}
            onBack={() => setShowCheckout(false)}
            onDone={handleCheckoutComplete}
          />
        )}
      </main>

      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}
