import React from "react";

const InputBox = ({ title, placeholder }) => {
  return (
    <div className="my-4 lg:w-[250px] lg:mx-2">
      <p className="text-gray-500">{title}</p>
      <input
        placeholder={placeholder}
        className="w-full h-12 border rounded-xl px-2 lg:h-11"
      />
    </div>
  );
};
const Home = () => {
  return (
    <>
      <div className="w-full h-11 bg-white flex items-center justify-center lg:justify-start lg:px-4 lg:my-5 md:rounded-2xl">
        <h4 className="text-primary_blue font-bold">Search</h4>
      </div>
      <div className="border-t-2 border-primary_blue w-full bg-white mt-5 py-10 md:rounded-t-2xl lg:flex lg:px-12">
        <div className="px-6 lg:w-full lg:flex lg:justify-evenly border lg:rounded-xl lg:py-10">
          <InputBox title={"User Id"} placeholder={"Search by user ID"} />
          <InputBox title={"Request ID"} placeholder={"Search by request ID"} />
          <InputBox
            title={"Donation ID"}
            placeholder={"Search by donation ID"}
          />
          <div className="my-4 lg:w-[250px] ">
            {" "}
            <button
              className="w-full bg-primary_blue rounded-xl h-12 my-4 text-white font-bold lg:my-3 lg:max-w-64 lg:mx-2"
              onClick={() => console.log("hello")}
            >
              Search
            </button>
          </div>
        </div>
        {/* result */}
      </div>
    </>
  );
};

export default Home;
