import { DragDropModule } from '@angular/cdk/drag-drop';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from './app.component';
import { OldTableComponent } from './shared/components/old-table/old-table.component';
import { DragAndDropDirective } from './shared/components/table-with-dragger/directives/drag-and-drop.directive';
import { TableWithDraggerComponent } from './shared/components/table-with-dragger/table-with-dragger.component';
import { TableComponent } from './shared/components/table/table.component';
import { PaginationPipe } from './shared/pipes/pagination/pagination.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableWithDraggerComponent,
    PaginationPipe,
    OldTableComponent,
    DragAndDropDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzListModule,
    DragDropModule,
    NzIconModule,
    NzGridModule,
    NzPaginationModule,
    NzTabsModule,
    NzTableModule,
    DragulaModule.forRoot(),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  exports: [DragAndDropDirective],
})
export class AppModule {}
