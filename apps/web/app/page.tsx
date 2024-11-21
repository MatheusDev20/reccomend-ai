import { Header } from '@repo/ui/header';
import { MainPage } from './pages/home';

export default function Home() {
  return (
    <>
      <Header className="flex p-3 md:p-4 items-center border border-red-600 w-full min-h-[50px]" />
      <MainPage />
    </>
  );
}
