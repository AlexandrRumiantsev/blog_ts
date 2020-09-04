import * as React from "react";
import { render } from "react-dom";
import { addPerson , removePerson} from "../actions/person";
import { getTasks , addTask} from "../actions/tasks";
import { Provider, useSelector, useDispatch } from "react-redux";
import GetForm  from "./GetForm";


const TaskList = () => {
  const [newPerson, setNewPerson] = React.useState("");
  const [tasks, setTasks] = React.useState([]);

  const updateNewPerson = () => (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPerson(e.currentTarget.value);

  const people: Person[] = useSelector((state: AppState) => state.people);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addPerson(
        newPerson
      )
    );
    setNewPerson("");
  };

  const handleSubmitTaskAll = (e: React.FormEvent<HTMLFormElement> ) => {
    const data = JSON.parse(getTasks().payload)['data'];
    Object.keys(
      data
    ).forEach( function(i){
      dispatch(
        addTask(
          data[i].title
        )
      );
    })
  };

  const dispatchNewPerson = (id: number) => () => {
    dispatch(removePerson(id));
  };

  return (
    <div>
      <ul>
        {people.map(person => (
          <li key={person.id}>
            <span>{person.name}</span>
            <button onClick={dispatchNewPerson(person.id)}>Выполнено</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter name"
          value={newPerson}
          onChange={updateNewPerson()}
        />
        <button>Добавить задачу</button>
      </form>
      <GetForm 
        handler={handleSubmitTaskAll}
      />
    </div>
  );
};

export default TaskList