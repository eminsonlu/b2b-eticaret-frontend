export default interface INotification {
  id: string;
  title: string;
  text: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}
