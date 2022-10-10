import { useState, useEffect, useCallback } from "react";

import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { Notification } from "./components/Notification";

import { personService } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const [message, setMessage] = useState({ type: null, msg: null });

  const deletePerson = useCallback(
    (id) => {
      const deletePerson = persons.find((p) => p.id === +id);
      const deletePersonName = deletePerson?.name;
      if (window.confirm(`delete ${deletePersonName} ?`)) {
        personService
          .deleteOne(id)
          .then((res) => {
            console.log(persons, id);
            setPersons(persons.filter((p) => p.id !== +id));
          })
          .catch((err) => {
            setMessage({
              type: "error",
              msg: `information of ${deletePersonName} has already been removed from server`,
            });
            console.log(err);
          });
      }
    },
    [persons]
  );

  useEffect(() => {
    console.log("render", Math.random());
    return () => {};
  });

  useEffect(() => {
    personService
      .getAll()
      .then((res) => {
        setPersons(res);
      })
      .catch((err) => {
        console.log(err);
        setPersons([]);
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (!!person) {
      const existPerson = persons?.find((p) => p.name === person.name);
      if (!!existPerson) {
        personService
          .updateOne(person.id, person)
          .then((res) => {
            setMessage({
              type: "info",
              msg: `Added ${res.name}`,
            });
            setPerson(null);
            setPersons(
              persons.map((p) => {
                if (+p.id === +res.id) {
                  return res;
                } else {
                  return p;
                }
              })
            );
            setMessage();
          })
          .catch((err) => {
            console.log(err);
            setPerson(null);
          });
      } else {
        personService
          .createOne(person)
          .then((res) => {
            setMessage({
              type: "info",
              msg: `Added ${res.name}`,
            });
            setPerson(null);
            setPersons(persons.concat(res));
          })
          .catch((err) => {
            console.log(err);
            setPerson(null);
          });
      }
    }
    return () => {};
  }, [person, persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <h2>add a new</h2>
      <PersonForm
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        persons={persons}
        setPerson={setPerson}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      ></Persons>
    </div>
  );
};

export default App;
