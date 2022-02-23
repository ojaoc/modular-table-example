import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective implements AfterViewInit {
  @Input() element!: ElementRef<any>;

  private table!: HTMLTableElement;
  private isDraggingStarted = false;
  private list: any;
  private draggingEle!: HTMLElement; // The dragging element
  private draggingColumnIndex: number = -1; // The index of dragging column
  // The current position of mouse relative to the dragging element
  private x = 0;
  private y = 0;

  private placeholder!: HTMLElement;

  constructor() {}

  ngAfterViewInit(): void {
    this.table = this.element.nativeElement.querySelector('table');
    this.table.querySelectorAll('th').forEach((headerCell) => {
      headerCell.classList.add('draggable');
      headerCell.addEventListener(
        'mousedown',
        this.mouseDownHandler.bind(this)
      );
    });
  }

  // Swap two nodes
  swap(nodeA: HTMLElement, nodeB: HTMLElement): void {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode?.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA?.insertBefore(nodeB, siblingA);
  }

  // Check if `nodeA` is on the left of `nodeB`
  isOnLeft(nodeA: HTMLElement, nodeB: HTMLElement): boolean {
    // Get the bounding rectangle of nodes
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
  }

  mouseDownHandler(e: MouseEvent): void {
    this.draggingColumnIndex = [].slice
      .call(this.table.querySelectorAll('th'))
      .indexOf((e.target as HTMLElement).parentElement as never);

    if (this.draggingColumnIndex === -1) {
      this.draggingColumnIndex = [].slice
        .call(this.table.querySelectorAll('th'))
        .indexOf(
          (e.target as HTMLElement).parentElement?.parentElement as never
        );
    }
    console.log('columnIndex', this.draggingColumnIndex, e.target);

    // Determine the mouse position
    this.x = e.clientX - (e.target as HTMLElement)?.offsetLeft;
    this.y = e.clientY - (e.target as HTMLElement)?.offsetTop;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  }

  private mouseMoveHandler = (e: MouseEvent) => {
    if (!this.isDraggingStarted) {
      this.isDraggingStarted = true;

      this.cloneTable();

      console.log('this.list', this.list, this.draggingColumnIndex);
      this.draggingEle = [].slice.call(this.list.children)[
        this.draggingColumnIndex
      ];
      this.draggingEle.classList.add('dragging');

      // Let the placeholder take the height of dragging element
      // So the next element won't move to the left or right
      // to fill the dragging element space
      this.placeholder = document.createElement('div');
      this.placeholder.classList.add('placeholder');
      this.draggingEle.parentNode?.insertBefore(
        this.placeholder,
        this.draggingEle.nextSibling
      );
      this.placeholder.style.width = `${this.draggingEle.offsetWidth}px`;
    }

    // Set position for dragging element
    this.draggingEle.style.position = 'absolute';
    this.draggingEle.style.top = `${
      this.draggingEle.offsetTop + e.clientY - this.y
    }px`;
    this.draggingEle.style.left = `${
      this.draggingEle.offsetLeft + e.clientX - this.x
    }px`;

    // Reassign the position of mouse
    this.x = e.clientX;
    this.y = e.clientY;

    // The current order
    // prevEle
    // draggingEle
    // placeholder
    // nextEle
    const prevEle = this.draggingEle.previousElementSibling as HTMLElement;
    const nextEle = this.placeholder.nextElementSibling as HTMLElement;

    // // The dragging element is above the previous element
    // // User moves the dragging element to the left
    if (prevEle && this.isOnLeft(this.draggingEle, prevEle)) {
      // The current order    -> The new order
      // prevEle              -> placeholder
      // draggingEle          -> draggingEle
      // placeholder          -> prevEle
      this.swap(this.placeholder, this.draggingEle);
      this.swap(this.placeholder, prevEle);
      return;
    }

    // The dragging element is below the next element
    // User moves the dragging element to the bottom
    if (nextEle && this.isOnLeft(nextEle, this.draggingEle)) {
      // The current order    -> The new order
      // draggingEle          -> nextEle
      // placeholder          -> placeholder
      // nextEle              -> draggingEle
      this.swap(nextEle, this.placeholder);
      this.swap(nextEle, this.draggingEle);
    }
  };

  private mouseUpHandler = () => {
    // Remove the placeholder
    this.placeholder &&
      this.placeholder.parentNode?.removeChild(this.placeholder);

    this.draggingEle.classList.remove('dragging');
    this.draggingEle.style.removeProperty('top');
    this.draggingEle.style.removeProperty('left');
    this.draggingEle.style.removeProperty('position');

    // Get the end index
    const endColumnIndex = [].slice
      .call(this.list.children)
      .indexOf(this.draggingEle as never);

    this.isDraggingStarted = false;

    // Remove the `list` element
    this.list.parentNode.removeChild(this.list);

    // Move the dragged column to `endColumnIndex`
    this.table.querySelectorAll('tr').forEach((row) => {
      const cells = [].slice.call(row.querySelectorAll('th, td'));
      this.draggingColumnIndex > endColumnIndex
        ? (cells[endColumnIndex] as any).parentNode.insertBefore(
            cells[this.draggingColumnIndex],
            cells[endColumnIndex]
          )
        : (cells[endColumnIndex] as any).parentNode.insertBefore(
            cells[this.draggingColumnIndex],
            (cells[endColumnIndex] as HTMLElement).nextSibling
          );
    });

    // Bring back the table
    this.table.style.removeProperty('visibility');

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  };

  private cloneTable(): void {
    // Get the bounding rectangle of table
    const rect = this.table.getBoundingClientRect();

    // Create new element
    this.list = document.createElement('div');
    this.list.classList.add('clone-list');

    // Set the same position as table
    this.list.style.position = 'absolute';
    // this.list.style.left = `${rect.left}px`;
    // this.list.style.top = `${rect.top}px`;

    // Insert it before the table
    this.table.parentNode?.insertBefore(this.list, this.table);

    // Hide the table
    this.table.style.visibility = 'hidden';

    // Get all cells
    const originalCells = [].slice.call(
      this.table.querySelectorAll('tbody td')
    );

    const originalHeaderCells = [].slice.call(
      this.table.querySelectorAll('th')
    );
    const numColumns = originalHeaderCells.length;

    // Loop through the header cells
    originalHeaderCells.forEach((headerCell, headerIndex) => {
      const width = parseInt(window.getComputedStyle(headerCell).width);

      // Create a new table from given row
      const item = document.createElement('div');
      item.classList.add('draggable');

      const newTable = document.createElement('table');
      newTable.setAttribute('class', 'clone-table');
      newTable.style.width = `${width}px`;

      // Header
      const th = (headerCell as any).cloneNode(true);
      let newRow = document.createElement('tr');
      newRow.appendChild(th);
      newTable.appendChild(newRow);

      const cells = originalCells.filter((c, idx) => {
        return (idx - headerIndex) % numColumns === 0;
      });

      cells.forEach((cell) => {
        const newCell = (cell as any).cloneNode(true);
        newCell.style.width = `${width}px`;
        newRow = document.createElement('tr');
        newRow.appendChild(newCell);
        newTable.appendChild(newRow);
      });

      item.appendChild(newTable);
      this.list.appendChild(item);
    });
  }
}
