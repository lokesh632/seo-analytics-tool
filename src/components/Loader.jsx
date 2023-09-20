// import { MagnifyingGlass } from "react-loader-spinner";

// export default function Loader() {
//   return (
//     <>
//       <div
//         className="h-screen absolute top-0 w-screen flex flex-col items-center justify-center"
//         style={{
//           background: "linear-gradient(to bottom, #001f3f, #001428)",
//         }}
//       >
//         <MagnifyingGlass
//           visible={true}
//           height="90"
//           width="90"
//           ariaLabel="MagnifyingGlass-loading"
//           wrapperStyle={{}}
//           wrapperClass="MagnifyingGlass-wrapper"
//           glassColor="#c0efff"
//           color="#e15b64"
//         />
//         <h1 className="text-2xl text-slate-300">Analyzing Your Website....</h1>
//       </div>
//     </>
//   );
// }

import { Blocks } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className="h-screen absolute top-0 w-screen flex flex-col items-center justify-center bg-black opacity-70" 
      style={{
        background: "linear-gradient(to bottom, #001f3f, #001428)",
      }}
      >
        <Blocks
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
        <h1 className="text-2xl text-slate-300">Analyzing Your Website</h1>
      </div>
    </>
  );
}