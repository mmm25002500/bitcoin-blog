export interface InputData {
  placeholder: string;
  icon: string;
  text: string;
  frontIcon?: boolean;
  onClick: () => void;
  onChange: (e: string) => void;
  className?: string;
}

export interface InputLabelProps {
  placeholder: string;
  icon: string;
  text: string[];
  frontIcon?: boolean;
  onClick: () => void;
  onChange: (text: string[]) => void;
  className?: string;
}
