
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from './DataTable.tsx'; // Corrected import to include .tsx extension

// Sample Data and Columns for the stories.
interface User {
  id: number;
  name: string;
  age: number;
  city: string;
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 34, city: 'London' },
  { id: 3, name: 'Peter Jones', age: 45, city: 'Paris' },
  { id: 4, name: 'Alice Williams', age: 23, city: 'Sydney' },
];

const sampleColumns: Column<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
  { key: 'city', header: 'City' },
];

// This is the metadata for your component.
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;

// This defines the type for your stories.
type Story = StoryObj<typeof DataTable>;

/**
 * The default story for the DataTable component, showing basic data display.
 */
export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
  },
};

/**
 * A story demonstrating the DataTable in its loading state.
 */
export const LoadingState: Story = {
  args: {
    data: [], // No data is passed when loading.
    columns: sampleColumns,
    loading: true,
  },
};

/**
 * A story demonstrating the DataTable when it has no data to display.
 */
export const EmptyState: Story = {
  args: {
    data: [],
    columns: sampleColumns,
  },
};

/**
 * A story demonstrating the DataTable with row selection enabled.
 */
export const SelectableRows: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    selectable: true,
  },
};
