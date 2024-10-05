import { cn } from "@/lib/Utils";
import { RiErrorWarningLine } from "react-icons/ri";
import React from "react";
import { ITextInput } from "@/types/input";
import PasswordToggler from "./PasswordToggler";

const TextInput = ({
  label,
  type,
  onChange,
  currentValue,
  placeHolder,
  className,
  required,
  id,
  rightIcon,
  errorMessage,
  disabled
}: ITextInput) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputType, setInputType] = React.useState(type);
  const [numberOfCharacters, setNumberOfCharacters] = React.useState(0);

  const isPassword = type === "password" && numberOfCharacters !== 0;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTogglePassword = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputType((prev) => {
      const newType = prev === "password" ? "text" : "password";
      return newType;
    });
  };

  const onChangeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      setNumberOfCharacters(e.target.value.length);
    },
    [onChange]
  );

  const showPassword = inputType === "password" && numberOfCharacters !== 0;



  return (
    <div className="flex flex-col gap-2 relative">
      <label
        htmlFor={id || "input-box"}
        className={`absolute text-sm text-bold text-gray-500 transform transition-all ${
          isFocused || currentValue
            ? "top-0 scale-75 -translate-y-2 bg-white"
            : "top-2.5 scale-100 translate-y-0"
        } peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0   peer-focus:absolute peer-focus:z-10 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate px-3 peer-focus:pt-0 leading-[1.6] text-gray-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-gray-700 peer-focus:bg-white`}
      >
        {label}
      </label>
      <input
        id={id || "input-box"}
        className={cn("block py-2 px-0 w-full text-base bg-transparent border-2 border-primary-100 appearance-none rounded-md focus:outline-none focus:ring-0 text-black font-secondary focus:border-primary-100 peer focus:border-t-1 pl-2", className)}
        type={inputType}
        value={currentValue}
        onChange={onChangeHandler}
        placeholder={placeHolder}
        required={required ?? false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled ?? false}
      />
      {isPassword && !rightIcon ? (
        <PasswordToggler
          className={`ml-2 absolute top-0 bottom-0 flex items-center right-2 ${errorMessage ? "bottom-8":""}`}
          isPasswordVisible={showPassword}
          onToggle={handleTogglePassword}
        />
      ) : null}

      {rightIcon ? <button>{rightIcon}</button> : null}

      {errorMessage ? (
        <div className="text-xs text-red-700 mt-[0.4rem] flex items-center">
          <RiErrorWarningLine className="inline-block h-3 w-3 mr-[0.45rem] self-start mt-[0.1rem]" />
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </div>
  );
};

export default TextInput;
