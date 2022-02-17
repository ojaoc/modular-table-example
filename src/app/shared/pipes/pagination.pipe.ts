import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'pagination',
})
export class PaginationPipe<T> implements PipeTransform {
  transform(value: T[], pageNumber: number, pageSize: number): T[] {
    return value.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }
}
