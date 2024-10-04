import { IGeneralProps } from "./interface/interface";

export type InputType =
  | "text"
  | "number"
  | "checkbox"
  | "radio"
  | "file"
  | "date"
  | "email"
  | "password"
  | "submit";


export type ITextInput = {
  label?: string;
  type: InputType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentValue: string | number;
  placeHolder: string;
  className?: string;
  required?: boolean;
  htmlFor?: string;
  id?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorMessage?: string | null;
  disabled?:boolean;
};


export interface IPasswordToggler extends IGeneralProps {
  isPasswordVisible: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

