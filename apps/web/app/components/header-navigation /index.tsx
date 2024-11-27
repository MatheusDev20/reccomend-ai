import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  isToggled: boolean,
};

export const HeaderNavigation = ({ isToggled }: Props) => {
  // class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
  return (
    <div className={clsx('items-center hidden md:flex')}>
      <ul className={clsx('md:flex gap-3 md:gap-12 p-4 w-full md:w-auto')}>
        <li>
          <Link href="/recomendations/features">
            <p className="font-semibold text-purple-500 hover:text-purple-700 transition-transform transform hover:scale-105 hover:underline">
              Features
            </p>
          </Link>
        </li>
        <li>
          <Link href="/recomendations/about">
            <p className="font-semibold text-purple-500 hover:text-purple-700 transition-transform transform hover:scale-105 hover:underline">
              Sobre
            </p>
          </Link>
        </li>
        <li>
          <Link href="/recomendations/motivation">
            <p className="font-semibold text-purple-500 hover:text-purple-700 transition-transform transform hover:scale-105 hover:underline">
              Motivação
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
