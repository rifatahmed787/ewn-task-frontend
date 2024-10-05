import { IPasswordToggler } from "@/types/input";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const PasswordToggler = ({
  isPasswordVisible,
  onToggle,
  style = {},
  className = "",
}: IPasswordToggler) => {
  return (
    <div style={style} className={`cursor-pointer ${className}`}>
      {isPasswordVisible ? (
        <BsEyeSlash
          onClick={onToggle}
          className="text-gray-500  h-4 w-4 lg:h-6 lg:w-6"
        />
      ) : (
        <BsEye
          onClick={onToggle}
          className="text-gray-500  h-4 w-4 lg:h-6 lg:w-6"
        />
      )}
    </div>
  );
};

export default PasswordToggler;
