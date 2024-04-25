export interface TagData {
  text: string;
  className?: string;
}

export interface TagTabProps {
  text: string;
  className?: string;
  onClick?: () => void;
}
