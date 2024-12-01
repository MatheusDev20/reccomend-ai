type Props = {
  svg: React.ReactNode,
  content: string,
  title: string,
};

export const MotivationCard = ({ svg, content, title }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center flex-row gap-4">
        {svg}
        <h6 className="font-semibold">{title}</h6>
      </header>
      <p className="items-start text-sm md:text-md leading-8 text-gray-600">
        {content}
      </p>
    </div>
  );
};
