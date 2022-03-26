import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <div className="space-y-5 px-4 py-16">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="name"
            type="text"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="price"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="absolute left-0 flex select-none items-center justify-center pl-3">
            <span className="text-sm text-gray-500">$</span>
          </div>
          <input
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="price"
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 flex select-none items-center justify-center pr-3">
            <span className="text-sm text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          rows={4}
        />
      </div>
      <button className="mt-4 w-full rounded-md border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Create stream
      </button>
    </div>
  );
};

export default Create;
