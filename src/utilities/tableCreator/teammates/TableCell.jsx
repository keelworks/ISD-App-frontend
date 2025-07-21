import { useState } from "react";
import { useEffect } from "react";

const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  if (tableMeta?.editedRows[row.id] && initialValue) {
    return columnMeta?.type === "select" ? (
      <select
        className="edit-input"
        onChange={onSelectChange}
        value={initialValue}
      >
        {columnMeta?.options?.map((option) => (
          <option key={option.value} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <span>{value}</span>
      //   <input
      //     className="edit-input"
      //     value={value}
      //     onChange={(e) => setValue(e.target.value)}
      //     onBlur={onBlur}
      //     style={{
      //       width: "100%",
      //     }}
      //     type={column.columnDef.meta?.type || "text"}
      //     id={column.id === "name" ? "name-input" : "email-input"}
      //   />
    );
  } else {
    return <span>{value}</span>;
  }
};

export default TableCell;
