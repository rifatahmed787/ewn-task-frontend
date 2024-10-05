/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/InputField/TextInput";
import Paragraph from "@/components/ui/paragraph";
import ICONS from "@/icons/AllIcons";
import { get_error_messages } from "@/lib/Error_message";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Link from "next/link";
import ToastContainer from "@/components/ui/toast";
import { ILoginArgs, UserData } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserLoginMutation } from "@/Redux/features/auth/authApi";
import { signInSchema } from "@/components/schema/SigninSchema";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  const [login, { data: loginData, isLoading, isError, error, isSuccess }] =
    useUserLoginMutation();

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    language: "",
    email: "",
    password: "",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await login(data as ILoginArgs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const errorMessages = get_error_messages(error);
      setAlertMessages(errorMessages);
    } else if (isSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(loginData?.message ?? "Login successful");
      router.push("/")
    }
  }, [error, isError, isSuccess, loginData?.message, router]);

  return (
    <section
      className={`min-h-screen w-full  flex items-center justify-center py-10`}
    >
      <div
        className={`relative flex  max-w-[444px] rounded-[16px] w-full  flex-col gap-4 backdrop-blur-3xl bg-white/80 mx-5 px-5 md:px-[62px]
        encType="multipart/form-data shadow-custom-primary`}
      >
        {/* title */}
        <div className="flex items-center  gap-2 flex-wrap pt-[54px]">
          {ICONS.stack}
          <Paragraph>Sign in to join with EWN</Paragraph>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextInput
                  type="email"
                  placeHolder=""
                  currentValue={field.value}
                  onChange={field.onChange}
                  required={false}
                  id="email"
                  htmlFor="email"
                  label="Enter Email"
                  errorMessage={
                    errors.email?.message
                      ? String(errors.email.message)
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextInput
                  type="password"
                  placeHolder=""
                  currentValue={field.value}
                  onChange={field.onChange}
                  required={true}
                  id="password"
                  htmlFor="password"
                  label="Password"
                  errorMessage={
                    errors.password?.message
                      ? String(errors.password.message)
                      : undefined
                  }
                />
              )}
            />
          </div>

          <Button
            type="submit"
            title="Sign in"
            className=" bg-primary-100 w-full mt-5 text-base font-medium rounded text-white"
            icon={isLoading ? ICONS.button_loading_icon : undefined}
            isDisabled={isLoading}
          >
            Sign In
          </Button>
        </form>
        <div className="grid grid-cols-3 py-2 items-center text-gray-400">
          <hr className="border-gray-400" />
          <p className="text-center text-sm">OR</p>
          <hr className="border-gray-400" />
        </div>

        <Button
          className="w-full text-base font-medium rounded bg-white"
          variant={"outline"}
        >
          {ICONS.google}
          Login with Google
        </Button>

        <div className="flex justify-center py-4">
          <span className=" inline-block text-[#666885] font-secondary">
            Don't have an account?{" "}
            <Link
              className="text-[#211E52] font-semibold cursor-pointer hover:text-[#211E52]/90"
              href="/signup"
            >
              Signup!
            </Link>
          </span>
        </div>
      </div>
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
        />
      )}
    </section>
  );
};

export default SigninForm;
