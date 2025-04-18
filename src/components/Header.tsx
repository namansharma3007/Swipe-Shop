import { useEffect, useState } from "react";
import { IoMdHeartEmpty, IoIosSearch } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

export function Header() {
  const location = useLocation();
  const [headerTitle, setHeaderTitle] = useState<string>("Swipe Shop");
  const { cartItems, likedItems } = useCart();

  useEffect(() => {
    const pathname = location.pathname;

    switch (pathname) {
      case "/":
        setHeaderTitle("Swipe Shop");
        break;
      case "/liked":
        setHeaderTitle("Liked Items");
        break;
      case "/cart":
        setHeaderTitle("Shopping Cart");
        break;
      case "/dashboard":
        setHeaderTitle("Discover");
        break;
      default:
        setHeaderTitle("Swipe Shop");
    }
  }, [location]);

  const isHomePage = location.pathname === "/";

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-gray-50 sticky top-0 z-50">
      <h1 className="font-semibold text-xl">{headerTitle}</h1>

      <div className="flex gap-3 items-center justify-between">
        <Link to="/dashboard" className="cursor-pointer p-1">
          <IoIosSearch size={24} />
        </Link>
        {!isHomePage && (
          <Link to="/" className="cursor-pointer p-1" replace>
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
