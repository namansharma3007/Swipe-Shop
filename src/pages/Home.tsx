import BG_IMAGE2 from "../assets/background2.png";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";

export default function Home() {
  return (
    <section className="flex flex-col relative min-h-full">
      <div className="flex flex-col relative w-full">
        {/* Background Image Container */}
        <div className="w-full h-full relative">
          <img
            src={BG_IMAGE2}
            alt="shop"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/100 via-white/50 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-8 px-8 -mt-32 relative z-10 rounded-t-[2rem] min-h-[60vh]">
          <div className="flex flex-col pt-8">
            <div className="flex gap-2 flex-col items-center justify-center">
              <p className="font-bold text-4xl">Swipe Shop</p>
              <p className="text-sm font-medium text-center text-gray-700 max-w-[280px]">
                Discover fashion with a swipe. Find your next favorite price
                effortlessly.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="p-5 rounded-full bg-red-200 text-red-600">
                <RxCross2 size={22} />
              </span>
              <span className="text-gray-700 text-sm font-medium text-center w-[100px]">
                Swipe Left to Pass
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="p-5 rounded-full bg-blue-200 text-blue-600">
                <IoCart size={22} />
              </span>
              <span className="text-gray-700 text-sm font-medium text-center w-[100px]">
                Swipe Up to Buy
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="p-5 rounded-full bg-pink-200 text-pink-600">
                <FaHeart size={22} />
              </span>
              <span className="text-gray-700 text-sm font-medium text-center w-[100px]">
                Swipe Right to Like
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8">
            <div className="flex py-4 px-8 items-center justify-center rounded-md bg-gray-100 w-full max-w-36">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-xl">1,000+</span>
                <span className="text-sm font-semibold text-gray-700">
                  Products
                </span>
              </div>
            </div>
            <div className="flex py-4 px-8 items-center justify-center rounded-md bg-gray-100 w-full max-w-36">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-xl">50+</span>
                <span className="text-sm font-semibold text-gray-700">
                  Brands
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <Link
              to="/dashboard"
              className="w-full bg-black text-white font-medium rounded-xl py-4 text-center"
              replace
            >
              Start Shopping
            </Link>
          </div>

          <div className="flex justify-center mb-10">
            <p className="font-medium text-sm text-gray-400 text-center">
              By continuing, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
