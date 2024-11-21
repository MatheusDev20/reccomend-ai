const recomendations = ['Filmes', 'Musicas'];

export const MainPage = () => {
  return (
    <main className="flex flex-col items-center gap-12 justify-center p-12">
      <p className="text-sm md:text-lg">
        Tenha recomendações de filmes músicas e muito mais, baseadas nos seus
        gostos!
      </p>

      <p>Quero recomendações de: </p>

      <section>
        {recomendations.map((recomendation) => (
          <div>{recomendation}</div>
        ))}
      </section>
    </main>
  );
};
