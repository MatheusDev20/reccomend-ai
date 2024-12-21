import { useStepperForm } from '@/app/context/stepper-context';
import { MOODS } from '@/app/utils/constants';

export type Mood = {
  moodId: number,
  label: string,
};
const LIMIT = 10;

export const FirstStep = () => {
  const { data, setData } = useStepperForm();

  const handleMoodSelect = (mood: Mood) => {
    setData((prevData) => {
      const currentMoods = prevData.mood || [];
      const isMoodSelected = currentMoods.find((m) => m.moodId === mood.moodId);

      if (isMoodSelected) {
        const filteredMoods = currentMoods.filter(
          (m) => m.moodId !== mood.moodId,
        );
        return { ...prevData, mood: filteredMoods };
      }

      if (currentMoods.length < LIMIT) {
        return { ...prevData, mood: [...currentMoods, mood] };
      }

      return prevData;
    });
  };

  const selectedMoods = data.mood || [];

  return (
    <div className="flex p-2 flex-col w-full gap-4">
      <div className="self-center mt-4 text-gray-600 text-sm">
        {selectedMoods.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedMoods.map((mood) => (
              <span
                key={mood.moodId}
                className="flex items-center gap-2 px-3 py-1 bg-[#6C63FF] text-white text-sm font-semibold rounded-full"
              >
                {mood.label}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-primary font-semibold text-xs md:text-2xl">
            Eu quero me sentir...
          </span>
        )}
      </div>
      <div className="grid grid-cols-6 gap-4 mt-6">
        {MOODS.map((mood) => {
          const selected = selectedMoods.find((m) => m.moodId === mood.id);
          return (
            <button
              key={mood.label}
              onClick={() =>
                handleMoodSelect({ moodId: mood.id, label: mood.label })
              }
              className={`flex flex-col items-center justify-center p-4 border rounded-lg text-center hover:scale-105 transition transform ${
                selected ? 'border-primary border-[2.5px]' : 'border-gray-300'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="mt-2 text-sm font-medium">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
