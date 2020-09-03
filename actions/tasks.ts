export function getTasks(datas: string) {
  const data = `{
	  "data": [
	    {
	    	"title":"Помыть посуду",
	    	"date": "20.01.2019"
	    },
	    {
	    	"title":"Выгулять собаку",
	    	"date": "10.01.2019"
	    },
	    {
	    	"title":"Покормить кота",
	    	"date":  "30.01.2019"
	    }
	  ]
	}`
  return {
    type: "GetTask",
    payload: data
  } as const;
}

export function addTask(taskTitle: string) {

  return {
    type: "AddTask",
    payload: taskTitle
  } as const;
}