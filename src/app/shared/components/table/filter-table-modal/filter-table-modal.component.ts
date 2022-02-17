import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-filter-table-modal',
  templateUrl: './filter-table-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTableComponent {

isVisible = false;

constructor(){}


showModal(): void {
          this.isVisible = true;

}

handleConfirm(): void {
          this.isVisible = false;
}

handleCancel(): void {
          this.isVisible = false;
}

}