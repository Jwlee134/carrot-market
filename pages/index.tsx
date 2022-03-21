import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="grid min-h-screen gap-5 bg-slate-400 py-20 px-20 md:grid-cols-2 md:place-content-center xl:grid-cols-3">
      <div className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-xl dark:bg-black">
        <span className="text-3xl font-semibold dark:text-white">
          Select Item
        </span>
        <div className="my-2 flex justify-between">
          <span className="text-gray-500 dark:text-gray-100">Grey Chair</span>
          <span className="font-bold dark:text-white">$19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-100">Tooly Table</span>
          <span className="font-bold dark:text-white">$19</span>
        </div>
        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span className="dark:text-gray-100">Total</span>
          <span className="font-bold dark:text-white">$38</span>
        </div>
        <button className="mx-auto mt-5 w-1/2 rounded-xl bg-blue-500 p-3 text-center text-white transition-colors duration-200 hover:bg-blue-700 hover:text-black focus:bg-red-500 active:bg-yellow-500 dark:border-2 dark:bg-black">
          Checkout
        </button>
      </div>
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className=" p-6 pb-14 xl:pb-52 portrait:bg-indigo-500 landscape:bg-yellow-500">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-red-400" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className="relative  -mt-10 -mb-5 flex flex-col items-center">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-10 shadow-xl md:col-span-2 xl:col-span-1">
        <div className="mb-5 flex items-center justify-between">
          <span>←</span>
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="rounded-md p-2 shadow-xl">❤️</span>
          </div>
        </div>
        <div className="mb-5 h-72 bg-zinc-400" />
        <div className="flex flex-col">
          <span className="mb-1 text-xl font-medium">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex items-center justify-between">
            <div className="space-x-2">
              <button className="h-5 w-5 rounded-full bg-yellow-500 ring-yellow-500 ring-offset-2 transition focus:ring-2"></button>
              <button className="h-5 w-5 rounded-full bg-indigo-500 ring-indigo-500 ring-offset-2 transition focus:ring-2"></button>
              <button className="h-5 w-5 rounded-full bg-teal-500 ring-teal-500 ring-offset-2 transition focus:ring-2"></button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex aspect-square w-10 items-center justify-center rounded-lg bg-blue-100 text-2xl text-gray-500">
                -
              </button>
              <span className="text-xl font-bold">1</span>
              <button className="flex aspect-square w-10 items-center justify-center rounded-lg bg-blue-100 text-2xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-medium">$450</span>
            <button className="rounded-xl bg-blue-500 px-8 py-3 text-sm text-white">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
