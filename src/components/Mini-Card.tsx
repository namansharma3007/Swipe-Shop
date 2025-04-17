import { formatNumberWithCommas, getDiscountedPrice } from "../../utils/utils";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

export function MiniCard({ apparel }: { apparel: Apparel }) {
  const { toggleLikeItem, addToCart, getCartItemQuantity } = useCart();

  const quantity = getCartItemQuantity(apparel.id);

  const handleAddCart = (apparel: Apparel) => {
    if (quantity === 0) {
      toast.success("Item added to your cart!");
      addToCart(apparel);
    } else {
      toast("Item already in your cart", { icon: "👋" });
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl overflow-hidden bg-white shadow-sm h-[400px]">
      <div className="relative h-[260px] w-full">
        <img
          src={apparel.imageUrl}
          alt={apparel.name}
          className="w-full h-full object-cover object-center"
        />
        <span className="py-1 px-3 rounded-full bg-red-500 text-white font-semibold text-xs absolute z-10 top-3 left-3">
          -{apparel.discountPercentage}%
        </span>
        <button
          type="button"
          className="p-2 rounded-full bg-white absolute right-3 top-3 text-red-500 cursor-pointer shadow-sm"
          onClick={() => toggleLikeItem(apparel)}
        >
          <FaHeart size={16} />
        </button>
      </div>

      <div className="flex flex-col p-3 gap-1">
        <div className="flex flex-col">
          <span className="font-bold text-sm capitalize line-clamp-1">
            {apparel.name}
          </span>
          <span className="text-gray-500 text-xs font-semibold capitalize">
            By {apparel.brand}
          </span>
        </div>

        <div className="flex w-max text-sm gap-2 items-center mt-1">
          <span className="font-bold">
            ₹
            {formatNumberWithCommas(
              getDiscountedPrice(apparel.price, apparel.discountPercentage)
            )}
          </span>
          <span className="line-through text-gray-400">
            ₹{formatNumberWithCommas(apparel.price)}
          </span>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-red-500 text-white rounded-lg px-4 py-2 cursor-pointer"
            onClick={() => handleAddCart(apparel)}
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
