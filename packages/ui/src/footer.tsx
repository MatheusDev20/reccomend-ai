export const Footer = () => {
  return (
    <footer className="flex w-full p-8 justify-center max-h-[60px] items-center mt-8 bg-gray-50 border-t border-gray-300">
      <span className="text-gray-800 text-md font-bold">
        Made with ❤️ by{' '}
        <a
          href="https://github.com/MatheusDev20"
          className="text-blue-700 cursor-pointer ml-1 underline hover:text-blue-600"
        >
          MatheusDev20
        </a>
      </span>
    </footer>
  );
};
