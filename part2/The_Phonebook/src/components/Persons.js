import { useCallback } from "react";

export const Persons = ({ persons, filter, deletePerson }) => {
  const deletePersonEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      deletePerson(event.target.value);
    },
    [deletePerson]
  );

  return (
    <div>
      {persons
        ?.filter((p) => {
          if (!!!filter || filter?.length === 0) {
            return true;
          }
          return !!p?.name?.toUpperCase().match(filter?.toUpperCase());
        })
        .map(({ name, number, id }) => (
          <div key={id}>
            <span>{`${name} ${number} `}</span>
            <button value={id} onClick={deletePersonEventHandler}>
              delete
            </button>
          </div>
        ))}
    </div>
  );
};
