import Image from "next/image";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Image
          src="/building.jpeg"
          alt="Open Trip Banner"
          width={1200}
          height={300}
          className="h-64 w-full rounded-xl object-cover"
        />
      </div>

      <h2 className="mb-4 text-2xl font-bold">Featured Events</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="rounded-lg border p-4 shadow-sm">
            <Image
              src="/building.jpeg"
              alt={`Event ${i + 1}`}
              width={400}
              height={160}
              className="mb-3 h-40 w-full rounded-md object-cover"
            />
            <h3 className="font-semibold">Dummy Event {i + 1}</h3>
            <p className="text-sm text-gray-600">20 Sep 2025</p>
            <p className="font-bold">Rp123.000</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
