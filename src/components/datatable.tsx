
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Define the type for a single column. The <T> is a generic type,
// allowing the component to work with any data structure.
// key: The key of the data object to display in this column.
// header: The human-readable header text for the column.
export interface Column<T> {
  key: keyof T;
  header: string;
}

// Define the component's props.
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

/**
 * A reusable DataTable component with sorting, selection, and state handling.
 * @param {DataTableProps<T>} props - The props for the component.
 * @returns {JSX.Element} The rendered DataTable component.
 */
export const DataTable = <T,>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>): JSX.Element => {
  // Use state to track the selected rows.
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  // Use state to track the column being sorted and the direction.
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

  // Function to handle row selection.
  const handleRowClick = (row: T) => {
    const isSelected = selectedRows.includes(row);
    let newSelectedRows: T[];

    if (isSelected) {
      newSelectedRows = selectedRows.filter((r) => r !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }
    
    setSelectedRows(newSelectedRows);
    
    // Call the optional onRowSelect callback.
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
  };

  // Function to handle column sorting.
  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort the data based on the current sort configuration.
  const sortedData = React.useMemo(() => {
    const sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle sorting for strings and numbers.
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (sortConfig.direction === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Define Tailwind CSS classes for the component.
  const tableClasses = twMerge(
    'w-full text-left table-auto rounded-lg overflow-hidden'
  );

  const headerClasses = twMerge(
    'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold'
  );

  const rowClasses = twMerge(
    'border-b border-gray-200 dark:border-gray-700'
  );

  // If loading, show a loading state.
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Loading data...</p>
      </div>
    );
  }

  // If data is empty, show an empty state.
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No data to display.</p>
      </div>
    );
  }

  // Render the actual table with data.
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow font-inter">
      <table className={tableClasses}>
        <thead>
          <tr>
            {/* Render a checkbox column if selectable */}
            {selectable && (
              <th className="p-4"></th>
            )}
            {/* Render column headers */}
            {columns.map((column) => (
              <th
                key={column.key as string}
                className="p-4 cursor-pointer"
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center space-x-2">
                  <span>{column.header}</span>
                  {/* Show sorting indicator */}
                  {sortConfig?.key === column.key && (
                    <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows with sorted data */}
          {sortedData.map((row) => (
            <tr
              key={JSON.stringify(row)}
              className={twMerge(
                rowClasses,
                selectable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors' : '',
                selectedRows.includes(row) ? 'bg-blue-100 dark:bg-blue-900' : ''
              )}
              onClick={() => selectable && handleRowClick(row)}
            >
              {selectable && (
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => {}} // onChange is required for controlled components
                    className="form-checkbox rounded text-blue-500"
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key as string} className="p-4">
                  {String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
