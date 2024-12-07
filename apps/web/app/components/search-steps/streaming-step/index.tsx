/* eslint-disable prettier/prettier */
'use client';
import { useEffect, useState } from 'react';
import { useStreaming } from '@/app/api/streaming.query';
import { StreamingService } from '@/app/@types';

export const ThirdsStep = () => {
  const [droppedServices, setDroppedServices] = useState<StreamingService[]>(
    [],
  );
  const [availableServices, setAvailableServices] = useState<StreamingService[]>(
    [],
  );

  const { data: streamingServices, isLoading, error } = useStreaming();

  const handleDrop = (e: any) => {
    e.preventDefault();
    const droppedId = Number(e.dataTransfer.getData('streamingId'));

    const droppedService = availableServices.find(
      (service) => service.id === droppedId
    );

    if (droppedService) {
      setAvailableServices((prev) =>
        prev.filter((service) => service.id !== droppedId),
      );
      setDroppedServices((prev) => [...prev, droppedService]);
    }
  };

  const handleDragStart = (e: any, id: number) => {
    e.dataTransfer.setData('streamingId', id);
  };

  const handleRemoveDropped = (id: number) => {
    const removedService = droppedServices.find((service) => service.id === id);

    if (removedService) {
      setDroppedServices((prev) =>
        prev.filter((service) => service.id !== id),
      );
      setAvailableServices((prev) => [...prev, removedService]);
    }
  };

  useEffect(() => {
    if (streamingServices) setAvailableServices(streamingServices);
  }, [streamingServices]);

  return (
    <div className="flex w-full gap-4  h-full flex-row">
      {/* Available Streaming Services */}
      <div className="flex-col w-[30%] items-center flex gap-4 pt-4 border border-primary">
        {availableServices.map((streaming) => {
          const bgPath = `/streamings/${streaming.name.toLowerCase()}-bg.jpg`;
          return (
            <div
              draggable="true"
              onDragStart={(e) => handleDragStart(e, streaming.id)}
              className="w-full max-w-[150px] h-[40px] cursor-grab rounded-md border-2 border-transparent hover:border-primary transition duration-300"
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
        className="flex flex-1 flex-col gap-7 justify-center items-center border-dashed border-4 border-primary p-4 rounded-md hover:border-gray-400 transition duration-300"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {droppedServices.length > 0 ? (
          droppedServices.map((streaming) => {
            const bgPath = `/streamings/${streaming.name.toLowerCase()}-bg.jpg`;
            return (
              <div
                className="relative w-full max-w-[150px] h-[40px] rounded-md border-2 border-primary"
                style={{
                  backgroundImage: `url(${bgPath})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                key={streaming.id}
              >
                <button
                  onClick={() => handleRemoveDropped(streaming.id)}
                  className="absolute top-[-10px] right-[-10px] bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700 transition duration-300"
                >
                ×
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col gap-4">
            <span className="text-gray-500 font-semibold">
              Arraste pra cá os serviços de streaming que você possui
            </span>
            <button className="mt-3 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-105 delay-150 ease-in-out transition md:p-0 md:w-full h-10 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md>">
              Não possuo serviços de streaming
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
