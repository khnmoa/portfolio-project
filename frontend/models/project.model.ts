export interface IProject{
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string; 
  date: Date;
  category: string;
}