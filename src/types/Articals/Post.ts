export interface PostProps {
  image: any;
  title: string;
  description: string;
  date: string | number;
  type: ['Posts'|'News'];
  img: string;
  id: string;
  tags: string[];
}
