import React, { useState, useMemo, useRef } from "react";
import { Card } from "../components/Card";
import { RxCross2 } from "react-icons/rx";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import TinderCard from "react-tinder-card";
import { data } from "../../constants/db";
import { useCart } from "../context/CartContext";
import { IoCart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(data.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const { addToCart, toggleLikeItem } = useCart();

  const childRefs = useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, apparel: Apparel, index: number) => {
    updateCurrentIndex(index - 1);

    // Only handle allowed swipe directions
    switch (direction) {
      case "right":
        toggleLikeItem(apparel);
        toast('❤️ Added to your favorites!',
          {
            duration: 1500,
            style: {
              background: "#fce7f3",
              color: "#be185d",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }
        );
        break;
      case "up":
        addToCart(apparel);
        toast("🛍️ Added to your cart!",
          {
            duration: 1500,
            style: {
              background: "#dbeafe",
              color: "#1e40af",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }
        );
        break;
      case "left":
        toast("👋 See you later!",
          {
            duration: 1500,
            style: {
              background: "#f3f4f6",
              color: "#4b5563",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }
        );
        break;
      default:
        childRefs[index].current.restoreCard();
        return;
    }
  };

  const outOfFrame = (idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < data.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <section className="flex flex-col relative min-h-screen p-4 bg-gray-50">
      <div className="h-[500px] relative">
        {data.map((apparel, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={apparel.id}
            onSwipe={(dir) => swiped(dir, apparel, index)}
            onCardLeftScreen={() => outOfFrame(index)}
            className="absolute w-full"
            preventSwipe={["down"]} // Prevent downward swipes
            swipeRequirementType="position"
            swipeThreshold={100} // Increase threshold for more intentional swipes
          >
            <Card apparel={apparel} />
          </TinderCard>
        ))}
        {!canSwipe && (
          <div className="flex-1 flex flex-col items-center mt-10 p-8">
            <div className="w-24 h-24 rounded-full bg-yellow-50 flex items-center justify-center mb-6 text-4xl shadow-sm">
              🎉
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">All Done!</h2>
            <p className="text-gray-600 text-center font-medium max-w-[300px] mb-4">
              You've swiped through all the available items. Check out your cart
              or liked items to see what you've saved!
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                to="/cart"
                className="flex items-center justify-between gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <IoCart size={18} />
                View Cart
              </Link>
              <Link
                to="/liked"
                className="flex items-center justify-between gap-2 px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
              >
                <IoMdHeartEmpty size={18} />
                View Liked
              </Link>
            </div>
          </div>
        )}
      </div>
      {canSwipe && (
        <div className="flex items-center justify-center gap-4 mt-20">
          <button
            type="button"
            className="p-5 bg-red-300 text-red-500 hover:scale-105 ease-in-out duration-200 rounded-full disabled:opacity-50"
            onClick={() => swipe("left")}
            disabled={!canSwipe}
          >
            <RxCross2 size={22} />
          </button>
          <button
            type="button"
            className="p-5 bg-blue-300 text-blue-500 hover:scale-105 ease-in-out duration-200 rounded-full disabled:opacity-50"
            onClick={() => swipe("up")}
            disabled={!canSwipe}
          >
            <FaCartPlus size={22} />
          </button>
          <button
            type="button"
            className="p-5 bg-pink-300 text-pink-500 hover:scale-105 ease-in-out duration-200 rounded-full disabled:opacity-50"
            onClick={() => swipe("right")}
            disabled={!canSwipe}
          >
            <FaHeart size={22} />
          </button>
        </div>
      )}
    </section>
  );
}
