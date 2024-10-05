import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="loader p-5 rounded-full flex space-x-3">
        <div className="text-xl md:text-2xl lg:text-4xl text-primary-100 animate-bounce">E</div>
        <div className="text-xl md:text-2xl lg:text-4xl text-primary-100 animate-bounce">W</div>
        <div className="text-xl md:text-2xl lg:text-4xl text-primary-100 animate-bounce">N</div>
      </div>
    </div>
  );
};

export default Loader;
