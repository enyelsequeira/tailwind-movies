

const Loader = ({ isInfo }: { isInfo?: boolean }) => {

  return (
    <div className={`flex flex-row items-center justify-center mx-auto text-center border-red-300  w-40 h-40 ${isInfo ? "md:absolute md:top-[30%]" : ""}`}>
      <div className="w-40 h-40  mx-auto  border-t-4 border-b-4 border-green-900 dark:border-white rounded-full animate-spin"></div>
    </div>

  );
};

export default Loader;