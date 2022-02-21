export interface Data {
  columns: { name: string; title: string; checked: boolean }[]
  data: {
    [key: string]: any
  }[]
}
