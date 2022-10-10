import { useCallback } from "react";

export const Filter = ({ filter, setFilter }) => {
  const inputFilter = useCallback(
    (event) => {
      setFilter(event.target.value);
    },
    [setFilter]
  );
  return (
    <div>
      filter shown with <input value={filter} onChange={inputFilter} />
    </div>
  );
};
