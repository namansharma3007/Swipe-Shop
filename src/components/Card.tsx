import { formatNumberWithCommas } from "../../utils/utils";

export function Card({ apparel }: { apparel: Apparel }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl w-full shadow-lg bg-gray-50">
      {/* Image Product */}
      <div className="w-full h-[400px] relative">
        <img
          src={apparel.imageUrl}
          alt={apparel.name}
          className="w-full h-full object-cover"
        />
        {apparel.discountPercentage !== 0 && (
          <span className="py-2 px-3 rounded-full bg-red-500 text-white font-semibold text-xs absolute z-10 top-4 left-4">
            -{apparel.discountPercentage}%
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col">
          <span className="font-bold text-lg capitalize">{apparel.name}</span>
          <span className="text-gray-500 font-semibold capitalize">
            By {apparel.brand}
          </span>
        </div>
        <div className="flex w-max gap-2 items-center justify-between">
          <span className="font-bold">
            ₹{formatNumberWithCommas(apparel.price)}
          </span>
          {apparel.discountPercentage !== 0 && (
            <span className="font-medium line-through text-gray-400">
              ₹{formatNumberWithCommas(apparel.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
