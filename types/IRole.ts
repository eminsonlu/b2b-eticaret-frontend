export default interface IRole {
  title: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  [other: string]: any;
}
