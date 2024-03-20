"use strict";
// interface TodoItem {
//     id: number;
//     title: string;
//     description: string;
//     completed: boolean;
// }
// class TodoApp {
//     private todoList: TodoItem[] = [];
//     private todoListElement: HTMLElement | null = document.getElementById('todoList');
//     private renderTodoList() {
//         if (!this.todoListElement) return;
//         this.todoListElement.innerHTML = '';
//         this.todoList.forEach((todoItem) => {
//             const todoItemElement = document.createElement('div');
//             todoItemElement.classList.add('todo-item');
//             if (todoItem.completed) {
//                 todoItemElement.classList.add('completed');
//             }
//             todoItemElement.innerHTML = `
//                 <span>${todoItem.title} - ${todoItem.description}</span>
//                 <div class="todo-buttons">
//                 <button class="completeButton" data-id="${todoItem.id}">${todoItem.completed ? ' &#10003; Completed' : 'Complete'}</button>
//                 <button class="deleteButton" data-id="${todoItem.id}">Delete</button>
//                 </div>
//             `;
//             this.todoListElement?.appendChild(todoItemElement);
//         });
//     }
//     private addTodoItem(title: string, description: string) {
//         const newTodoItem: TodoItem = {
//             id: this.todoList.length + 1,
//             title,
//             description,
//             completed: false
//         };
//         this.todoList.push(newTodoItem);
//         this.renderTodoList();
//     }
//     // private completeTodoItem(id: number) {
//     //     const todoItemIndex = this.todoList.findIndex((item) => item.id === id);
//     //     if (todoItemIndex !== -1) {
//     //         this.todoList[todoItemIndex].completed = !this.todoList[todoItemIndex].completed;
//     //         this.renderTodoList();
//     //     }
//     // }
//     private completeTodoItem(id: number) {
//         let todoItemIndex = -1;
//         for (let i = 0; i < this.todoList.length; i++) {
//             if (this.todoList[i].id === id) {
//                 todoItemIndex = i;
//                 break;
//             }
//         }
//         if (todoItemIndex !== -1) {
//             this.todoList[todoItemIndex].completed = !this.todoList[todoItemIndex].completed;
//             this.renderTodoList();
//         }
//     }
//     private deleteTodoItem(id: number) {
//         this.todoList = this.todoList.filter((item) => item.id !== id);
//         this.renderTodoList();
//     }
//     constructor() {
//         const addButton = document.getElementById('addButton');
//         if (addButton) {
//             addButton.addEventListener('click', () => {
//                 const titleInput = document.getElementById('titleInput') as HTMLInputElement;
//                 const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement;
//                 const title = titleInput.value.trim();
//                 const description = descriptionInput.value.trim();
//                 if (title && description) {
//                     this.addTodoItem(title, description);
//                     titleInput.value = '';
//                     descriptionInput.value = '';
//                 } else {
//                     alert('Please enter title and description.');
//                 }
//             });
//         }
//         document.addEventListener('click', (event) => {
//             const target = event.target as HTMLElement;
//             if (target.classList.contains('completeButton')) {
//                 const id = parseInt(target.getAttribute('data-id') || '0');
//                 this.completeTodoItem(id);
//             } else if (target.classList.contains('deleteButton')) {
//                 const id = parseInt(target.getAttribute('data-id') || '0');
//                 this.deleteTodoItem(id);
//             }
//         });
//     }
// }
// const myTodoApp = new TodoApp();
// ====================================================================
// document.addEventListener("DOMContentLoaded", () => {
//     // Fetch all todos from the server when the page loads
//     fetchTodos();
//     // Add event listener for submitting new todo
//     const form = document.getElementById("add-todo-form");
//     form.addEventListener("submit", (event) => {
//         event.preventDefault();
//         const formData = new FormData(form);
//         const title = formData.get("title") as string;
//         const description = formData.get("description") as string;
//         addTodo({ title, description });
//         form.reset();
//     });
// });
// async function fetchTodos() {
//     try {
//         const response = await fetch("http://localhost:8000/todos");
//         const todos = await response.json();
//         renderTodos(todos);
//     } catch (error) {
//         console.error("Error fetching todos:", error);
//     }
// }
// async function addTodo(todoData: { title: string; description: string }) {
//     try {
//         const response = await fetch("http://localhost:8000/todos/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(todoData),
//         });
//         const newTodo = await response.json();
//         renderTodo(newTodo);
//     } catch (error) {
//         console.error("Error adding todo:", error);
//     }
// }
// async function deleteTodo(todoId: string) {
//     try {
//         await fetch(`http://localhost:8000/todos/${todoId}`, {
//             method: "DELETE",
//         });
//         document.getElementById(todoId)?.remove();
//     } catch (error) {
//         console.error("Error deleting todo:", error);
//     }
// }
// async function updateTodoStatus(todoId: string, completed: boolean) {
//     try {
//         await fetch(`http://localhost:8000/todos/${todoId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ completed }),
//         });
//         const todoElement = document.getElementById(todoId);
//         if (todoElement) {
//             todoElement.classList.toggle("completed", completed);
//         }
//     } catch (error) {
//         console.error("Error updating todo status:", error);
//     }
// }
// function renderTodos(todos: any[]) {
//     const todoList = document.getElementById("todoList");
//     todoList.innerHTML = "";
//     todos.forEach(renderTodo);
// }
// function renderTodo(todo: any) {
//     const todoList = document.getElementById("todoList");
//     const todoItem = document.createElement("div");
//     todoItem.id = todo._id;
//     todoItem.innerHTML = `
//         <span>${todo.title} - ${todo.description}</span>
//         <button onclick="updateTodoStatus('${todo._id}', ${!todo.completed})">
//             ${todo.completed ? "Undo" : "Complete"}
//         </button>
//         <button onclick="deleteTodo('${todo._id}')">Delete</button>
//     `;
//     todoList.appendChild(todoItem);
// }
