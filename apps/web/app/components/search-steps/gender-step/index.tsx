// Array of genres with labels and background images
const Genders = [
  {
    label: 'Guerra',
    bgPath: '/genders/private-ryan.jpg',
  },
  {
    label: 'Ação',
    bgPath: '/genders/rambo.jpg',
  },
  {
    label: 'Drama',
    bgPath: '/genders/hope-miracle.jpg',
  },
  {
    label: 'Comédia',
    bgPath: '/genders/hangover.jpg',
  },
  {
    label: 'Ficção Científica',
    bgPath: '/genders/alien-romulus.jpg',
  },
];

export const SecondStep = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">
        Que tipo de filme você gostaria de assistir hoje?
      </h2>
      <p className="text-gray-600 text-sm">
        Selecione um ou mais gêneros que você gostaria de assistir
      </p>

      <div className="grid grid-cols-5 gap-4 mt-6">
        {Genders.map((genre, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-lg text-center hover:scale-105 transition transform cursor-pointer"
            style={{
              backgroundImage: `url(${genre.bgPath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '150px',
              width: '120px',
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm rounded-b-lg">
              <span className="font-bold text-white">{genre.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
