import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { dataset } from 'src/app/core/mocks/dataset';
import { Data } from 'src/app/core/models/data';
// import tableDragger from 'table-dragger';

@Component({
  selector: 'app-table-with-dragger',
  templateUrl: './table-with-dragger.component.html',
  styleUrls: ['./table-with-dragger.component.scss'],
})
export class TableWithDraggerComponent implements OnInit, AfterViewInit {
  dataSet: Data;
  @ViewChild('basicTable', { read: ElementRef })
  basicTable!: ElementRef;

  constructor() {
    this.dataSet = dataset;

    console.log('data', this.dataSet);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('this.basicTable', this.basicTable.nativeElement);
    // tableDragger(this.basicTable);
  }
}
