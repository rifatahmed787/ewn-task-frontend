"use client";

const SkeletonProfile = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="relative">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-40 w-40 rounded-full mx-auto"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mt-3 text-center animate-pulse bg-gray-300 h-6 w-32 mx-auto rounded"></h3>
              <p className="text-base md:text-lg font-semibold text-center animate-pulse bg-gray-300 h-4 w-48 mx-auto rounded mt-2"></p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-3 my-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-2 my-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-5 mb-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-5 mb-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-3 mb-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-2 mb-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-2 mb-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-2 mb-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-1 mb-3 animate-pulse">
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
                <div className="md:col-span-5 text-right mt-3">
                  <div className="inline-flex items-end">
                    <div className="bg-gray-300 h-10 w-full rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
