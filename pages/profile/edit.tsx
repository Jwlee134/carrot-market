import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";

interface Form {
  name?: string;
  email?: string;
  phone?: string;
  error?: string;
  avatar?: FileList;
}

const Edit: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<Form>({ mode: "onChange" });
  const [edit, { data, loading }] = useMutation<{
    ok: boolean;
    error?: string;
  }>(`/users/me`);
  const [thumbnail, setThumbnail] = useState("");

  const onValid = async ({ name, email, phone, avatar }: Form) => {
    if (loading) return;
    if (!name && !email && !phone) {
      setError("error", { message: "At least one input should be filled." });
      return;
    }
    let avatarId = "";
    if (avatar?.length) {
      const { uploadURL } = await (await fetch("/api/files")).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      avatarId = id;
    }
    edit({ name, email, phone, ...(avatarId && { avatarId }) });
  };

  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  useEffect(() => {
    if (data?.error) {
      setError("error", { message: data.error });
    }
  }, [data, setError]);

  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar?.length) setThumbnail(URL.createObjectURL(avatar[0]));
  }, [avatar]);

  return (
    <Layout canGoBack>
      <form className="space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          {thumbnail ? (
            <img
              className="h-14 w-14 rounded-full"
              src={thumbnail}
              alt="Profile Preview"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-400" />
          )}
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
              {...register("avatar")}
            />
          </label>
        </div>
        <Input
          register={register("name")}
          label="Name"
          name="email"
          kind="text"
        />
        <Input
          register={register("email")}
          label="Email address"
          name="email"
          kind="text"
          type="email"
        />
        <Input
          register={register("phone", {
            maxLength: {
              value: 10,
              message: "Should be shorter than 11 chars",
            },
            minLength: { value: 10, message: "Should be longer than 9 chars" },
          })}
          label="Phone number"
          name="phone"
          kind="phone"
          onFocus={() => clearErrors("error")}
        />
        {errors.phone && (
          <span className="mt-4 block text-center font-medium text-red-500">
            {errors.phone.message}
          </span>
        )}
        {errors.error && (
          <span className="mt-4 block text-center font-medium text-red-500">
            {errors.error.message}
          </span>
        )}
        <Button
          text={loading ? "Loading" : "Update"}
          onClick={handleSubmit(onValid)}
        />
      </form>
    </Layout>
  );
};

export default Edit;
