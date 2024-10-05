"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/otp";
import ToastContainer from "@/components/ui/toast";
import ICONS from "@/icons/AllIcons";
import { get_error_messages } from "@/lib/Error_message";
import {
  useOtpSignupMutation,
  useUserRegisterMutation,
} from "@/Redux/features/auth/authApi";
import { UserData } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm({ userData }: { userData: UserData }) {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");
  const [timer, setTimer] = useState(59);
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  const [
    sendOtp,
    { data: sendOtpData, isSuccess, error, isError, isLoading: isOtpLoading },
  ] = useOtpSignupMutation();
  const [
    register,
    {
      data: registerData,
      isLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useUserRegisterMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await register({
        username: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        language: userData.language,
        password: userData.password,
        otp: data.pin,
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setIsResendAvailable(true);
    }
  }, [timer]);

  // Handle OTP resend action
  const handleResend = async () => {
    try {
      await sendOtp({
        email: userData.email,
      });
      setTimer(59);
      setIsResendAvailable(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  // Error and success handling
  useEffect(() => {
    if (isRegisterError && registerError && "data" in registerError) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(registerError);
      setAlertMessages(error_messages);
    } else if (isRegisterSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(registerData?.message ?? "Registered Successfully");
      router.push("/");
    }
  }, [
    isRegisterError,
    isRegisterSuccess,
    registerData?.message,
    registerError,
    router,
  ]);

  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(error);
      setAlertMessages(error_messages);
    } else if (isSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(sendOtpData?.message ?? "Resend OTP Successfully");
    }
  }, [isError, isSuccess, sendOtpData?.message, error]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                {/* Timer or Resend Button */}
                <div className="text-sm text-gray-600">
                  {isResendAvailable ? (
                    <Button
                      icon={
                        isOtpLoading ? ICONS.button_loading_icon : undefined
                      }
                      type="button"
                      onClick={handleResend}
                    >
                      Resend OTP
                    </Button>
                  ) : (
                    <p>Resend OTP in {timer}s</p>
                  )}
                </div>

                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            icon={isLoading ? ICONS.button_loading_icon : undefined}
            isDisabled={isLoading}
            type="submit"
            variant={"outline"}
            className="bg-primary-100 text-white"
          >
            Submit
          </Button>
        </form>
      </Form>
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
        />
      )}
    </>
  );
}
