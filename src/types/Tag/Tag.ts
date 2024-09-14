export interface TagData {
  text: string;
  type?: ["News" | "Post"];
  className?: string;
}

export interface TagTabProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export interface TagsProps {
  News: string[];
  Post: string[];
  all: string[];
}
