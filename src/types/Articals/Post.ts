export interface PostProps {
  image: any;
  title: string;
  description: string;
  date: string | number;
  type: ['Post' | 'News'];
  authorData: {
    fullname: string;
    name: string;
    description: string;
    image: string;
    id: string;
  };
  img: string;
  id: string;
  tags: string[];
}
