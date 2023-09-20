export default function Categories({ data }) {
  return (
    <>
      {data && (
        <div className="mx-8 xs:max-md:mx-1 md:max-lg:mx-4 xs:max-md:mb-8 mb-20">
          <div className="text-3xl md:max-xl:text-2xl xs:max-md:text-lg mb-14 xs:max-md:mb-4 flex items-center justify-center">
            <h3 className="text-4xl font-bold text-white text-center xs:text-3xl xs:mb-8">
              <span className="border-b-4 border-blue-500 pb-2">
                {data?.title} Details
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:max-md:gap-5 xs:max-md:mx-6">
            {data &&
              data?.auditRefs.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-solid border-gray-300 rounded-lg p-4 flex items-center"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${item.weight ? 'bg-green-500' : 'bg-red-500'}`}>
                    {item.weight ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-base text-gray-900 font-semibold">
                      Page has {item.id}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
