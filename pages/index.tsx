import * as React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, Store } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

import { peopleReducer } from "../reducer/peopleReducer";

import { addPerson , removePerson} from "../actions/person";

import { getTasks , addTask} from "../actions/tasks";


const rootReducer = combineReducers<AppState>({
  people: peopleReducer
});

function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Page />
  </Provider>
);


const Page = () => {
  const [newPerson, setNewPerson] = React.useState("");
  
  const [tasks, setTasks] = React.useState([]);
  const [refrash, setRefrash] = React.useState(false);

  const updateNewPerson = () => (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPerson(e.currentTarget.value);

  const people: Person[] = useSelector((state: AppState) => state.people);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPerson(newPerson));
    setNewPerson("");
  };

  const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('getTask');
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
        <button>Add</button>
      </form>
      <form onSubmit={handleSubmitTask}>
        <button>get</button>
      </form>
      {
        Object.keys(
          tasks
        ).forEach( function(i){
          <h1>das</h1>
        })
      }
    </div>
  );
};

export default App
