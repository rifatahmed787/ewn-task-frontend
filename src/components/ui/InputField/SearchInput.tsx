import ICONS from "@/icons/AllIcons";
import { cn } from "@/lib/Utils";
import { ITextInput } from "@/types/input";
import TextInput from "./TextInput";

interface ISearchInput extends ITextInput {
  handleFilterValue: () => void;
}

const SearchInput = ({
  onChange,
  currentValue,
  placeHolder,
  className,
  required,
  handleFilterValue,
}: ISearchInput) => {
  return (
    <div className="relative flex items-center">
      <TextInput
        className={cn(className)}
        onChange={onChange}  // Pass the onChange correctly
        required={required ?? false}
        type={"text"}
        currentValue={currentValue}  // Pass the correct currentValue prop
        placeHolder={placeHolder}  // Properly pass the placeholder text
      />
      <button
        className={`h-10 px-2 py-1 rounded-r-md hover:text-white hover:bg-primary-100 duration-300 -ml-10 z-10`}
        onClick={handleFilterValue}
      >
        {ICONS.search}
      </button>
    </div>
  );
};

export default SearchInput;
