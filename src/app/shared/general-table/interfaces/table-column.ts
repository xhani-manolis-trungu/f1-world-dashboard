export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (arg0: any) => string;
}
