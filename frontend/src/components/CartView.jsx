import api from "../api/api";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartView({ cart, refresh, onCheckout }) {
  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await api.patch("/cart/" + id, { qty });
    refresh();
  };

  const remove = async (id) => {
    await api.delete("/cart/" + id);
    refresh();
  };

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl p-6 sm:p-10 shadow-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3 sm:mb-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 6.76A1 1 0 007.64 21h8.72a1 1 0 00.99-.79L19 13M10 21h4"
          />
        </svg>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">
          Your cart is empty
        </h3>
        <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
          Looks like you haven't added anything yet.
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Your Cart
      </h2>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg p-3 sm:p-4 shadow-sm"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Product Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full p-1 sm:p-2"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Img</span>
                )}
              </div>

              {/* Product Info & Controls */}
              <div className="flex-1 min-w-0">
                {/* Name and Price */}
                <div className="mb-2 sm:mb-3">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => updateQty(item._id, item.qty - 1)}
                      className="p-1 sm:p-1.5 rounded bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-colors"
                    >
                      <Minus size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      className="p-1 sm:p-1.5 rounded bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-colors"
                    >
                      <Plus size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-indigo-600">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                  <button
                    onClick={() => remove(item._id)}
                    className="p-1.5 sm:p-2 rounded bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-600 transition-colors"
                  >
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-4 sm:mt-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <span className="text-lg sm:text-xl font-semibold text-gray-700">
              Total:
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-indigo-600">
              ${cart.total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-indigo-600 text-white py-3 sm:py-4 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors text-base sm:text-lg font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
