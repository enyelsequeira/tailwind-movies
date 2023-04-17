const MovieSkeleton = () => {
  return (
    <div className="overflow-hidden relative space-y-5 rounded-lg bg-gray-900 bg-gradient-to-r from-transparent via-gray-600 to-transparent p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-gray-900 before:bg-gradient-to-r before:from-transparent before:via-gray-900 before:to-transparent">
      <div className="h-44 rounded-lg bg-gray-600 sm:h-96 aspect-h-4 aspect-w-3"></div>
      <div className="space-y-3">
        <div className="h-3 rounded-lg bg-gray-600"></div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
