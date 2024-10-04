export interface IGeneralProps {
    className?: string;
    style?: React.CSSProperties;
  }

  
  export type TToggler = [boolean, () => void, (value: boolean) => void];
  