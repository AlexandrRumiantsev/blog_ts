import * as React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, Store } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";



type Person = {
  id: number;
  name: string;
};
type AppState = {
  people: Person[];
};

function addPerson(personName: string) {
  return {
    type: "AddPerson",
    payload: personName
  } as const;
}

function removePerson(id: number) {
  return {
    type: "RemovePerson",
    payload: id
  } as const;
}

type Actions = ReturnType<typeof addPerson> | ReturnType<typeof removePerson>;

function peopleReducer(state: Person[] = [], action: Actions) {
  switch (action.type) {
    case "AddPerson":
      return state.concat({ id: state.length + 1, name: action.payload });
    case "RemovePerson":
      return state.filter(person => person.id !== action.payload);
    default:
      neverReached(action);
  }
  return state;
}

function neverReached(never: never) {}

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
  const updateNewPerson = () => (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPerson(e.currentTarget.value);

  const people: Person[] = useSelector((state: AppState) => state.people);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPerson(newPerson));
    setNewPerson("");
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
            <button onClick={dispatchNewPerson(person.id)}>Remove</button>
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
    </div>
  );
};

export default App
