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
import { InputOTPForm } from "./InputOtpForm";
import Link from "next/link";
import ToastContainer from "@/components/ui/toast";
import { useOtpSignupMutation } from "@/Redux/features/auth/authApi";
import { UserData } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/components/schema/SignupSchema";

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  const [sendOtp, { data: sendOtpData, isLoading, isSuccess, error, isError }] =
    useOtpSignupMutation();

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    language: "",
    email: "",
    password: "",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await sendOtp({
        email: data.email,
      });
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        language: data.language,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(error);
      setAlertMessages(error_messages);
    } else if (isSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(sendOtpData?.message ?? "OTP Send Successfully");
    }
  }, [isError, isSuccess, sendOtpData?.message, error]);

  return (
    <section
      className={`min-h-screen w-full  flex items-center justify-center py-[54px]`}
    >
      <div
        className={`relative flex  max-w-[444px] rounded-[16px] w-full  flex-col gap-4 backdrop-blur-3xl bg-white/80 mx-5 px-5 md:px-[62px]
        encType="multipart/form-data shadow-custom-primary`}
      >
        {/* title */}
        <div className="flex items-center  gap-2 flex-wrap pt-[54px]">
          {ICONS.stack}
          <Paragraph>Sign up to join with EWN</Paragraph>
        </div>

        {!isSuccess || error || isError ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-3">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextInput
                        label="First Name"
                        type="text"
                        onChange={field.onChange}
                        currentValue={field.value}
                        placeHolder=""
                        id="firstName"
                        errorMessage={
                          errors.firstName?.message
                            ? String(errors.firstName?.message)
                            : undefined
                        }
                      />
                    )}
                  />

                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextInput
                        type="text"
                        placeHolder=""
                        currentValue={field.value}
                        onChange={field.onChange}
                        required={false}
                        id="lastName"
                        htmlFor="lastName"
                        label="Last Name"
                        errorMessage={errors.lastName?.message ? String(errors.lastName.message) : undefined}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="language"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextInput
                      type="text"
                      placeHolder=""
                      currentValue={field.value}
                      onChange={field.onChange}
                      required={false}
                      id="language"
                      htmlFor="language"
                      label="Enter language"
                      errorMessage={errors.language?.message ? String(errors.language.message) : undefined}
                    />
                  )}
                />
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
                      errorMessage={errors.email?.message ? String(errors.email.message) : undefined}
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
                      errorMessage={errors.password?.message ? String(errors.password.message) : undefined}
                    />
                  )}
                />
                <Controller
                  name="confirmpassword"
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
                      label="Confirm Password"
                      errorMessage={
                        errors.confirmpassword?.message
                          ? String(errors.confirmpassword?.message)
                          : undefined
                      }
                    />
                  )}
                />
              </div>

              <Button
                type="submit"
                title="Sign Up"
                className=" bg-primary-100 w-full mt-5 text-base font-medium rounded text-white"
                icon={isLoading ? ICONS.button_loading_icon : undefined}
                isDisabled={isLoading}
              >
                Sign Up
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
          </>
        ) : (
          <>
            <InputOTPForm userData={userData} />
          </>
        )}

        <div className="flex justify-center py-4">
          <span className=" inline-block text-[#666885] font-secondary">
            Already have an account?{" "}
            <Link
              className="text-[#211E52] font-semibold cursor-pointer hover:text-[#211E52]/90"
              href="/signin"
            >
              Login!
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

export default SignUpForm;
