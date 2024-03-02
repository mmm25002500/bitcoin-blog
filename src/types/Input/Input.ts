export interface InputData {
  placeholder: string;
  icon: string;
  btnText: string;
  text: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
