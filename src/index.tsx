import {v4 as uuidV4} from 'uuid';
import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/styles.css";


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

const deleteButton = document.createElement('button');
deleteButton.innerText = "Delete";
deleteButton.classList.add('delete');

deleteButton.addEventListener('click', (e) => {
    const target = e.target as HTMLButtonElement;
    const parent = target.parentElement as HTMLLIElement;
    const id = parent.dataset
    parent.remove()
    localStorage.removeItem(task.id)
    console.log(
        'delete button clicked', id
    )
})
addEventListener("change", ()=>{
    task.completed = checkbox.checked;
    saveTasks()
   
})
checkbox.type = 'checkbox';
checkbox.checked = task.completed;
label.append(checkbox, task.title);
item.append(label);
list?.append(item)
item?.appendChild(deleteButton)
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

const app = ()  => {
    const element = document.createElement('div');
    element.innerHTML = "Hello World";
    return element;
}
