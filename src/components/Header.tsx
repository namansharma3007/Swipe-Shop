import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [headerTitle, setHeaderTitle] = useState<string>("Swipe Shop");
  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const { cartItems, likedItems } = useCart();

  useEffect(() => {
    const pathname = location.pathname;

    switch (pathname) {
      case "/":
        setHeaderTitle("Swipe Shop");
        setShowBackButton(false);
        break;
      case "/liked":
        setHeaderTitle("Liked Items");
        setShowBackButton(true);
        break;
      case "/cart":
        setHeaderTitle("Shopping Cart");
        setShowBackButton(true);
        break;
      case "/dashboard":
        setHeaderTitle("Discover");
        setShowBackButton(true);
        break;
      default:
        setHeaderTitle("Swipe Shop");
        setShowBackButton(false);
    }
  }, [location]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-gray-50 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button onClick={handleBack} className="text-gray-700">
            <FaArrowLeft size={18} />
          </button>
        )}
        <h1 className="font-semibold text-xl">{headerTitle}</h1>
      </div>

      <div className="flex gap-3 items-center justify-between">
        {!isHomePage && (
          <Link to="/" className="cursor-pointer p-1 text-gray-700" replace>
            <IoHomeOutline size={24} />
          </Link>
        )}
        <Link to="/liked" className="cursor-pointer p-1 relative">
          <IoMdHeartEmpty size={24} />
          {likedItems.length > 0 && (
            <span className="absolute bg-red-500 text-[10px] rounded-full p-1 text-white top-1 right-1"></span>
          )}
        </Link>
        <Link to="/cart" className="cursor-pointer p-1 relative">
          <IoCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute bg-red-500 text-[10px] rounded-full p-1 text-white top-1 right-1"></span>
          )}
        </Link>
      </div>
    </nav>
  );
}
