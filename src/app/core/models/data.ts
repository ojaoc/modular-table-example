export interface Data {
  header: string[];
  props: string[];
  body: {
    [key: string]: any;
  }[];
}
