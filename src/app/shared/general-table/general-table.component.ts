import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from './interfaces/table-column';
import { TableBtn } from './interfaces/table-btn';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'general-table',
  styleUrls: ['general-table.component.scss'],
  templateUrl: 'general-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralTableComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() buttons: TableBtn[] = [];
  @Input() data: any | any[] | null = [];
  @Input() filter: boolean = false;
  @Input() filterPlaceholder: string = 'Filter';
  @Input() footer: string | null = null;
  @Input() pagination: number[] = [];
  @Input() pageSize!: number;
  @Input() tableMinWidth: number = 100;
  @Output() filteredData = new EventEmitter<any[]>();
  @Output() buttonClick = new EventEmitter<string[]>();
  @Output() rowClick = new EventEmitter<any>();

  dataSource!: MatTableDataSource<any>;
  displayedColumns!: string[];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      if (changes.data) {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = [...this.columns.map(c => c.columnDef)];
        if (this.buttons.length > 0) this.displayedColumns = [...this.displayedColumns, 'actions'];
      }
    }
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target?.value.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSource.sort = this.sort;
  }

  getRow(row: any) {
    this.rowClick.emit(row);
  }
}


