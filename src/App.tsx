import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart-Page";
import LikedApparels from "./pages/Liked-apparels";
import { Header } from "./components/Header";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <main
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        className="flex justify-center h-max w-full bg-gray-400"
      >
        <div className="w-full h-full max-w-md flex flex-col shadow-lg md:m-2 m-0 bg-white sm:rounded-lg rounded-none relative overflow-x-hidden">
          <Header />
          <div className="flex-1 relative overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/liked" element={<LikedApparels />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
}
