'use client';
import { useEffect, useState } from 'react';
import { useStreaming } from '@/app/api/streaming.query';
import { StreamingService } from '@/app/@types';
import { useStepperForm } from '@/app/context/stepper-context';

export const ThirdsStep = () => {
  const [availableServices, setAvailableServices] = useState<
    // eslint-disable-next-line prettier/prettier
    StreamingService[]
  >([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { data: streamingServices, isLoading, error } = useStreaming();
  const { data, setData } = useStepperForm();

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDraggingOver(false); // Remove drag-over feedback

    const droppedId = Number(e.dataTransfer.getData('streamingId'));

    const droppedService = availableServices.find(
      (service) => service.id === droppedId,
    );

    if (droppedService) {
      setAvailableServices((prev) =>
        prev.filter((service) => service.id !== droppedId),
      );

      setData((prev) => ({
        ...prev,
        streamings: [...prev.streamings, droppedService],
      }));
    }
  };

  const handleDragStart = (e: any, id: number) => {
    e.dataTransfer.setData('streamingId', id);
  };

  // const handleEmptyServices = () => {
  //   setData((prev) => ({ ...prev, streamings: [] }));
  // };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDraggingOver(true); // Show drag-over feedback
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false); // Remove drag-over feedback
  };

  const handleRemoveDropped = (id: number) => {
    const removedService = data.streamings.find((service) => service.id === id);

    if (removedService) {
      setData((prev) => ({
        ...prev,
        streamings: prev.streamings.filter((service) => service.id !== id),
      }));
      setAvailableServices((prev) => [...prev, removedService]);
    }
  };

  useEffect(() => {
    if (streamingServices) setAvailableServices(streamingServices);
  }, [streamingServices]);

  return (
    <div className="flex w-full min-h-[50%] flex-row gap-3">
      {/* Available Streaming Services */}
      <div className="flex-col w-[30%] items-center flex gap-4 pt-4">
        {availableServices.map((streaming) => {
          const bgPath = `/streamings/${streaming.name.toLowerCase()}-bg.jpg`;
          return (
            <div
              draggable="true"
              onDragStart={(e) => handleDragStart(e, streaming.id)}
              className="w-full max-w-[150px] h-[40px] cursor-grab rounded-md border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundImage: `url(${bgPath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              key={streaming.id}
            />
          );
        })}
      </div>

      {/* Drop Zone */}
      <div
        className={`flex flex-col flex-1 gap-5 min-w-[40%] max-h-[100%] border-dashed border-4 p-4 rounded-md transition-all duration-300 ${
          isDraggingOver ? 'border-green-400 bg-green-50' : 'border-primary'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {data.streamings.length > 0 ? (
          data.streamings.map((streaming) => {
            const bgPath = `/streamings/${streaming.name.toLowerCase()}-bg.jpg`;
            return (
              <div
                className="relative w-full max-w-[150px] min-h-[40px] rounded-md border-2 border-primary"
                style={{
                  backgroundImage: `url(${bgPath})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                key={streaming.id}
              >
                {/* Close Button */}
                <button
                  onClick={() => handleRemoveDropped(streaming.id)}
                  className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700 transition duration-300"
                >
                  ×
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col gap-8 items-center m-auto">
            <span className="text-gray-500 font-semibold">
              Arraste pra cá os serviços de streaming que você possui
            </span>
            <span className="text-red-700">
              Deixe vazio se não possuir nenhum
            </span>

            {/* <button
              onClick={handleEmptyServices}
              className="mt-3 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-100 delay-150 ease-in-out transition md:p-0 md:w-[50%] md:m-auto h-10 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md>"
            >
              <span>Não possuo serviços</span>
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};
