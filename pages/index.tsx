import * as React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, Store } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { peopleReducer } from "../reducer/peopleReducer";
import { addPerson , removePerson} from "../actions/person";
import { getTasks , addTask} from "../actions/tasks";

import  TaskList  from "../components/TaskList";

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
const GetForm = (props) => {
  const [status, setStatus] = React.useState(true);
  const handler = props.handler;
  if (status) {
    return <Form setStatus={setStatus} handler={handler}/>;
  }
  return <></>;
}
const Form = (props) => {
  const form = props;
  let onsbm = function(){
     form.setStatus(false)
     form.handler()
  }
  return <form onSubmit={onsbm}>
        <button>get</button>
      </form>
}
const Page = () => {
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
      <TaskList />
    </div>
  );
};

export default App
