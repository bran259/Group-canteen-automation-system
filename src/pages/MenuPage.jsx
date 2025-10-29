import { useAppContext } from "../context/AppContext";

const MenuPage = () => {
  const { menu, addToCart } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
        🍴 Our Delicious Menu
      </h2>

      {menu.length === 0 ? (
        <p className="text-center text-gray-600">Loading menu...</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {menu.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              {/* Image */}
              <img
                src={
                  item.image && item.image.trim() !== ""
                    ? item.image
                    : "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-4 flex flex-col justify-between h-[180px]">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 capitalize">
                    {item.category || "Uncategorized"}
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    Ksh {item.price}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;