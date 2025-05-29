export default function BackButton() {
  return (
    <>
      <div className="my-4">
        <button
          onClick={() => {
            window.history.back();
            return false;
          }}
          className="flex cursor-pointer items-center text-gray-600 transition-colors hover:text-blue-400 dark:text-gray-300 dark:hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <p className="underline">Back to Home</p>
        </button>
      </div>
    </>
  );
}
