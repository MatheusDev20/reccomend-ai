type Props = {
  icon: React.ReactNode,
  title: string,
};

export const SubjectCard = ({ icon, title }: Props) => {
  return (
    <div className="flex p-3 bg-base-100 shadow-xl h-[66px] items-center justify-between">
      <section className="h-full justify-self-start">{icon}</section>
      <section className="mr-8">
        <h6 className="card-title">{title}</h6>
      </section>
    </div>
  );
};
