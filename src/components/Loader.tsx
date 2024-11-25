import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#0f172a"
        secondaryColor="#3b82f6"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
