import { useCallback } from "react";

export const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const validationExist = useCallback((name, number, persons) => {
    console.log(name, number, persons, persons.includes({ name, number }));
    return !!persons?.find((p) => p.name === name);
  }, []);

  const addPerson = useCallback(
    (event) => {
      event.preventDefault();
      if (validationExist(newName, newNumber, persons)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        setPersons(
          persons.concat([
            { name: newName, number: newNumber, id: persons.length + 1 },
          ])
        );
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
      setPersons,
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
