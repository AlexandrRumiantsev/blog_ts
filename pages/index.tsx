import * as React from "react";
import { render } from "react-dom";
import TaskList  from "../components/TaskList";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore, combineReducers, Store } from "redux";
import { peopleReducer } from "../reducer/peopleReducer";


const rootReducer = combineReducers<AppState>({
  people: peopleReducer
});

function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}
const store = configureStore();

const Page = () => {
  return (<TaskList />);
};
const App = () => (
  <Provider store={store}>
    <Page />
  </Provider>
);
export default App
