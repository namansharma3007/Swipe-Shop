import { formatNumberWithCommas } from "../../utils/utils";
import { CartItem } from "../components/Cart-items";
import { useCart } from "../context/CartContext";
import { IoBagHandleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import useSound from "use-sound";
import NOTIFICATION from "../assets/notification-success-1.mp3";

export default function Cart() {
  const { cartItems, getTotalCartAmount, getDiscountAmount, clearCart } =
    useCart();

  const [play] = useSound(NOTIFICATION);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = getDiscountAmount();
  const delivery = cartItems.length > 0 ? 99 : 0;
  const total = getTotalCartAmount() + delivery;

  const checkout = () => {
    if (cartItems.length > 0) {
      toast(
        <span>
          Order placed successfully! Your items will be delivered soon.
        </span>,
        {
          icon: "🎉",
          style: {
            background: "#bbf7d0",
            color: "#16a34a",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }
      );
      play();
      clearCart();
    }
  };

  return (
    <section className="flex flex-col h-max">
      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center mt-10 p-8">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <IoBagHandleOutline size={32} className="text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 font-medium text-center max-w-[250px]">
            Explore our collection and swipe up or tap the cart icon to add
            items to your cart
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-3 p-4">
            {cartItems.map((apparel) => (
              <CartItem key={apparel.id} apparel={apparel} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-4 flex flex-col gap-4 border-t border-b border-gray-200">
            <h2 className="font-bold text-lg">Order Summary</h2>

            <div className="flex flex-col gap-3 text-[15px]">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{formatNumberWithCommas(+subtotal.toFixed(2))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-red-500">
                  -₹{formatNumberWithCommas(+discount.toFixed(2))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>₹{formatNumberWithCommas(+delivery.toFixed(2))}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{formatNumberWithCommas(+total.toFixed(2))}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={checkout}
              className="w-full bg-black text-white font-semibold rounded-xl py-4 mt-2 cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
