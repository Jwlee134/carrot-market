import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";

const Edit: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-400" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
        <Input label="Email address" name="email" kind="text" type="email" />
        <Input label="Phone number" name="phone" kind="phone" />
        <Button text="Update" />
      </div>
    </Layout>
  );
};

export default Edit;
