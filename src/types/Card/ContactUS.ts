export interface ContactUSData {
  title: string;
  description: string;
  photo_light: string;
  photo_dark?: string;
  className?: string;
  onClick?: () => void;
}
