'use client';
import { useEffect, useState } from 'react';
import { StreamingService } from '@/app/@types';
import { useStepperForm } from '@/app/context/stepper-context';
import { useStreaming } from '@/app/api/streaming/query';

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
    setIsDraggingOver(false);

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
    <div className="flex flex-col w-full min-h-[50%] gap-8">
      <div className="flex items-center p-8 gap-12 justify-center">
        <span className="self-center text-xs font-semibold md:text-2xl text-primary">
          Meus serviços de streaming são...
        </span>
        <button className="max-w-[250px] p-4 justify-self-center hover:bg-[#7C73FF] hover:scale-100 delay-150 ease-in-out transition md:w-[50%] h-8 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md">
          Não me importo com essa etapa
        </button>
      </div>
      {/* Available Streaming Services */}
      <div className="flex md:flex-row gap-8">
        <div className="flex-col min-w-[30%] h-[400px] items-center border-primary flex gap-4 pt-4 pb-4">
          {availableServices.map((streaming) => {
            const bgPath = `/streamings/${streaming.name.toLowerCase()}-bg.jpg`;
            return (
              <div
                draggable="true"
                onDragStart={(e) => handleDragStart(e, streaming.id)}
                className="w-full max-w-[120px] h-[40px] cursor-grab rounded-md border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:scale-105"
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
          className={`${data.streamings.length > 0 ? 'grid grid-cols-5 gap-8 auto-rows-min' : 'flex'} overflow-hidden flex-1 min-w-[70%] min-h-[400px] gap-2 border-dashed border-4 p-4 rounded-md transition-all duration-300 ${
            isDraggingOver ? 'border-green-400 bg-green-50' : 'border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {data.streamings.length === 0 && (
            <div className="flex flex-col m-auto w-full items-center justify-center gap-4 text-center">
              <span className="text-sm md:text-md font-medium text-primary">
                Arraste para cá os serviços que você possui
              </span>
            </div>
          )}

          {data.streamings.length > 0 &&
            data.streamings.map((streaming) => {
              const bgPath = `/streamings/${streaming.name.toLowerCase()}-bg.jpg`;
              return (
                <div
                  className="relative w-[120px] h-[40px] rounded-md border-2 border-primary"
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
            })}
        </div>
      </div>
    </div>
  );
};
