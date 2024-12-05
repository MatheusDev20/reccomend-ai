import { Genre } from '@/app/@types';
import { useStepperForm } from '@/app/context/stepper-context';
import { Genders } from '@/app/utils/genders';
import clsx from 'clsx';

export const SecondStep = () => {
  const { data, setData } = useStepperForm();

  const handleGenreSelect = (selected: Genre) => {
    setData((prevData) => {
      const currentGenders = prevData.genres || [];
      const isGenderSelected = currentGenders.find(
        (genre) => selected.id === genre.id,
      );

      if (isGenderSelected) {
        const filteredMoods = currentGenders.filter(
          (genre) => genre.id !== selected.id,
        );
        return { ...prevData, genres: filteredMoods };
      }

      if (currentGenders.length < 3) {
        return { ...prevData, genres: [...currentGenders, selected] };
      }

      return prevData;
    });
  };
  const selecteGenres = data.genres || [];

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">
        Quais genêros você gostaria de assistir hoje? assistir hoje?
      </h2>
      <span className="text-primary font-semibold">Selecione até 3</span>

      <div className="grid grid-cols-5 gap-4 mt-6">
        {Genders.map((genre) => {
          const selected = selecteGenres.find((g) => g.id === genre.id);
          return (
            <div
              onClick={() => handleGenreSelect(genre)}
              key={genre.id}
              className={clsx(
                'relative flex flex-col items-center justify-center p-4 rounded-lg text-center transition-transform transform cursor-pointer duration-300',
                {
                  'scale-125 border-4 border-primary': selected, // Scale and border when selected
                  'hover:scale-105': !selected, // Subtle hover effect when not selected
                },
              )}
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
          );
        })}
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        {selecteGenres.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selecteGenres.map((genre) => (
              <span
                key={genre.id}
                className="flex items-center gap-2 px-3 py-1 bg-[#6C63FF] text-white text-sm font-semibold rounded-full"
              >
                {genre.label}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-600 text-sm">
            Quais seus genêros de filme favoritos favoritos?
          </span>
        )}
      </div>
    </div>
  );
};
