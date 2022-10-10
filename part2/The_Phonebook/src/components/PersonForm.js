import { useCallback } from "react";

export const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPerson,
}) => {
  const validationExist = useCallback((name, number, persons) => {
    console.log(
      name,
      number,
      persons,
      persons?.find((p) => p.name === name)
    );
    return persons?.find((p) => p.name === name);
  }, []);

  const addPerson = useCallback(
    (event) => {
      event.preventDefault();
      const existPerson = validationExist(newName, newNumber, persons);
      if (!!existPerson) {
        const confirm = window.confirm(
          `${newName} is already added to phonebook, replace old number with a new number ?`
        );
        if (confirm) {
          setPerson({ ...existPerson, number: newNumber });
        }
      } else {
        setPerson({ name: newName, number: newNumber, id: persons.length + 1 });
      }
      setNewName("");
      setNewNumber("");
    },
    [
      validationExist,
      newName,
      setNewName,
      newNumber,
      setNewNumber,
      persons,
      setPerson,
    ]
  );

  const inputNameChange = useCallback(
    (event) => {
      setNewName(event.target.value);
    },
    [setNewName]
  );

  const inputNumberChange = useCallback(
    (event) => {
      setNewNumber(event.target.value);
    },
    [setNewNumber]
  );
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={inputNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={inputNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
