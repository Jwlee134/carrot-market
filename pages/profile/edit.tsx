import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface Form {
  email?: string;
  phone?: string;
  error?: string;
}

const Edit: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Form>();

  const onValid = ({ email, phone }: Form) => {
    if (!email && !phone) {
      setError("error", { message: "At least one input should be filled." });
      return;
    }
  };

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  return (
    <Layout canGoBack>
      <form className="space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
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
        <Input
          register={register("email")}
          label="Email address"
          name="email"
          kind="text"
          type="email"
        />
        <Input
          register={register("phone")}
          label="Phone number"
          name="phone"
          kind="phone"
        />
        {errors.error && (
          <span className="mt-4 block text-center font-medium text-red-500">
            {errors.error.message}
          </span>
        )}
        <Button text="Update" />
      </form>
    </Layout>
  );
};

export default Edit;
