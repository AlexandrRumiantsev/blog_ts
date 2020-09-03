import { addPerson , removePerson} from "../actions/person";





type Actions = ReturnType<typeof addPerson> | ReturnType<typeof removePerson>;


function neverReached(never: never) {}

export function peopleReducer(
          state: Person[] = [], 
          action: Actions
        ) {
  switch (action.type) {
    case "AddPerson":
      addPerson();
      return state.concat({ id: state.length + 1, name: action.payload});
    case "RemovePerson":
      return state.filter(person => person.id !== action.payload);
    case "AddTask":
       return state.concat(
          { 
            id: state.length + 1, 
            name: 'Задача №' + state.length + 1 +' '+ action.payload
          }
       );
    default:
      neverReached(action);
  }
  return state;
}