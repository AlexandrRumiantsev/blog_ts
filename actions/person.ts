export function addPerson(personName: string) {
  console.log('xxx');
  return {
    type: "AddPerson",
    payload: personName
  } as const;
}

export function removePerson(id: number) {
  return {
    type: "RemovePerson",
    payload: id
  } as const;
}