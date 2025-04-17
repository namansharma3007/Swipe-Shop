import { MiniCard } from "../components/Mini-Card";
import { useCart } from "../context/CartContext";
import { IoHeartDislikeOutline } from "react-icons/io5";

export default function LikedApparels() {
  const { likedItems } = useCart();

  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      {likedItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center mt-10 p-8">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <IoHeartDislikeOutline size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            No Liked Items Yet
          </h2>
          <p className="text-gray-500 text-center font-medium max-w-[250px]">
            Explore our collection and swipe right or tap the heart to save
            items you love
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4">
          {likedItems.map((apparel: Apparel) => (
            <MiniCard key={apparel.id} apparel={apparel} />
          ))}
        </div>
      )}
    </section>
  );
}
