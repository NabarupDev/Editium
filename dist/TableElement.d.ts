import React from 'react';
import { TableElement, TableRowElement, TableCellElement } from './types';
interface TableComponentProps {
    element: TableElement;
    attributes: any;
    children: any;
}
export declare const TableComponent: React.FC<TableComponentProps>;
interface TableRowComponentProps {
    element: TableRowElement;
    attributes: any;
    children: any;
}
export declare const TableRowComponent: React.FC<TableRowComponentProps>;
interface TableCellComponentProps {
    element: TableCellElement;
    attributes: any;
    children: any;
}
export declare const TableCellComponent: React.FC<TableCellComponentProps>;
export {};
