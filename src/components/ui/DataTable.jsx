function DataTable({ columns = [], data = [], rowKey = "id", emptyMessage = "No data available." }) {
  return <div className="data-table-wrapper">
    <table className="data-table">
      <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
      <tbody>
        {data.length === 0
          ? <tr><td colSpan={columns.length}>{emptyMessage}</td></tr>
          : data.map((row, index) => <tr key={row[rowKey] ?? index}>
              {columns.map((column) => <td key={column.key}>
                {column.render ? column.render(row, index) : row[column.key]}
              </td>)}
            </tr>)}
      </tbody>
    </table>
  </div>;
}
export default DataTable;
