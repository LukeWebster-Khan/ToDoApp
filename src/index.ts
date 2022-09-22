import {v4 as uuidV4} from 'uuid';

type Task = {
    id: string,
    title: string,
    completed: boolean,
    createdAt: Date,
}
const list = document.getElementById('list') as HTMLUListElement;
const form = document.getElementById('new-task-form') as HTMLFormElement;
const input = document.getElementById('new-task-title') as HTMLInputElement;


form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input?.value === "" || input?.value === null) return;
    const newTask:Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask);

    addNewListTime(newTask)
    input.value = "";
});

const addNewListTime = (task: Task )=>{
const item = document.createElement('li');
const label = document.createElement('label');
const checkbox = document.createElement('input');
addEventListener("change", ()=>{
    task.completed = checkbox.checked;
    saveTasks()
   
})
checkbox.type = 'checkbox';
checkbox.checked = task.completed;
label.append(checkbox, task.title);
item.append(label);
list?.append(item)
}

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const loadTasks = () => {
    const taskJson = localStorage.getItem('tasks')
    if(taskJson === null) return []
    return JSON.parse(taskJson)
}
const tasks: Task[] =  loadTasks()
tasks.forEach(addNewListTime)