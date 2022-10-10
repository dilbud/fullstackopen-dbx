import { useCallback } from "react";

export const Filter = ({ setFilter }) => {
  const inputFilter = useCallback(
    (event) => {
      setFilter(event.target.value);
    },
    [setFilter]
  );
  return (
    <div>
      filter shown with <input onChange={inputFilter} />
    </div>
  );
};
