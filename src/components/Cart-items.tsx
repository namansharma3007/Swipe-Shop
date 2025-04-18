import { IoTrashOutline } from "react-icons/io5";
import { formatNumberWithCommas, getDiscountedPrice } from "../../utils/utils";
import { useCart } from "../context/CartContext";

export function CartItem({ apparel }: { apparel: Apparel }) {
  const { removeFromCart, updateCartItemQuantity, getCartItemQuantity } =
    useCart();
  const quantity = getCartItemQuantity(apparel.id);

  const handleDecreaseQuantity = () => {
    updateCartItemQuantity(apparel.id, quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    updateCartItemQuantity(apparel.id, quantity + 1);
  };

  return (
    <div className="w-full flex gap-3 bg-white shadow-lg rounded-xl p-3">
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={apparel.imageUrl}
          alt={apparel.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <h3 className="font-semibold capitalize text-sm line-clamp-1">
          {apparel.name}
        </h3>
        <p className="text-gray-500 text-sm capitalize">By {apparel.brand}</p>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold">
            ₹
            {formatNumberWithCommas(
              getDiscountedPrice(apparel.price, apparel.discountPercentage)
            )}
          </span>
          {apparel.discountPercentage !== 0 && (
            <>
              <span className="text-gray-400 line-through text-sm">
                ₹{formatNumberWithCommas(apparel.price)}
              </span>
              <span className="text-red-500 text-sm">
                -{apparel.discountPercentage}%
              </span>
            </>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3 border rounded-lg">
            <button
              type="button"
              className="px-3 py-0.5 text-lg text-gray-600 hover:text-gray-800"
              onClick={handleDecreaseQuantity}
            >
              -
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              type="button"
              className="px-3 py-0.5 text-lg text-gray-600 hover:text-gray-800"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="text-red-500 p-1 hover:text-red-600"
            onClick={() => removeFromCart(apparel.id)}
          >
            <IoTrashOutline size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
