/* eslint-disable @next/next/no-img-element */
export const MovieCard = () => {
  return (
    <div className="flex min-w-[500px] min-h-[350px] cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Info Section */}
      <div className="info-section z-20 w-[50%] h-full rounded-lg">
        <div className="movie-header flex gap-6 p-6">
          <img
            src="https://mr.comingsoon.it/imgdb/locandine/235x336/53715.jpg"
            alt="Black Panther"
            className="locandina relative float-left mr-4 h-[120px] shadow-md rounded"
          />
          <div className="">
            <h1 className="text-black font-light text-xl">Black Panther</h1>
            <h4 className="text-gray-600 font-light text-lg">
              2018, Ryan Coogler
            </h4>
            <span className="inline-block mt-2 text-gray-600 px-2 py-1 rounded border border-gray-200">
              134 min
            </span>
            <span className="type text-gray-500 ml-2">
              Action, Adventure, Sci-Fi
            </span>
          </div>
        </div>
        <div className="w-full p-6">
          <p className="text-gray-600">Some desc</p>
        </div>
      </div>

      {/* Blurred Background */}
      <div
        className="w-[50%] h-full bg-cover bg-no-repeat bg-center rounded-lg"
        style={{
          backgroundImage:
            "url('https://www.gannett-cdn.com/-mm-/c03fd140debe8ad4c05cf81a5cad7ad61a12ce52/c=0-1580-2985-3266&r=x803&c=1600x800/local/-/media/2017/06/09/USATODAY/USATODAY/636326272873599176-Black-Panther-Teaser.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p> salve galera</p>
      </div>
    </div>
  );
};
