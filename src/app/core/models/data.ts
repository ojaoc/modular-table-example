export interface Data {
  columns: { name: string; title: string }[];
  data: {
    [key: string]: any;
  }[];
}
