import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { dataset } from 'src/app/core/mocks/dataset';
import { Data } from 'src/app/core/models/data';

@Component({
  selector: 'app-table-with-dragger',
  templateUrl: './table-with-dragger.component.html',
  styleUrls: ['./table-with-dragger.component.scss'],
})
export class TableWithDraggerComponent implements OnInit, AfterViewInit {
  @Input() dataSet: Data;
  @ViewChild('basicTable', { read: ElementRef }) basicTable!: ElementRef;

  constructor() {
    this.dataSet = dataset;
    console.log('dataSet', this.dataSet);
    // this.table.nativeElement.querySelector('table')
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
