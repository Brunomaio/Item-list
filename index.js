let todoList = document.getElementById("todolist");
let completedList = document.getElementById("completedlist");
let formSubmit = document.getElementById("form-submit");
let inputField = document.getElementById("form-input");
let saveList = document.getElementById("save-list");
let clearListBtn = document.getElementById("clear-list-btn");

let items = [];

// Captures user input on input field and add value to userInput variable
let userInput = "";
inputField.addEventListener("keyup", e => {
	userInput = e.target.value;
});

// Add the state of the "Save list" checkbox to localStorage
saveList.addEventListener("click", () => {
	if (saveList.checked) {
		localStorage.setItem("saveList", saveList.checked);
		updateLocalStorage();
	} else {
		localStorage.removeItem("saveList");
	}
});

// Adds new element to items array from user input upon submiting form
formSubmit.addEventListener("click", e => {
	e.preventDefault();
	if (userInput.length > 0) {
		items.push({ description: userInput, completed: false, id: items.length });
		renderList();
		updateLocalStorage();
		clearList();
		inputField.value = "";
		userInput = "";
	}
});

// Renders all items in items array upon page load
window.addEventListener("load", () => {
	if (localStorage.getItem("saveList")) {
		saveList.checked = true;
	}
	if (localStorage.todoList) {
		items = JSON.parse(localStorage.todoList);
		renderList();
	}
});

// Toggles "completed" css class to item upon click and update "items" array
document.addEventListener("click", e => {
	if (e.target.nodeName === "LI") {
		e.target.classList.toggle("list__item--completed");
		items.forEach(item => {
			if (e.target.textContent === item.description) {
				item.completed = !item.completed;
			}
		});
		renderList();
		updateLocalStorage();
		clearList();
	}
});

clearListBtn.addEventListener("click", () => {
	clearLocalStorage();
	clearList();
	renderList();
});

function clearList() {
	// const allItems = document.querySelectorAll(".list__item");
	// allItems.forEach(item => {
	// 	item.parentNode.removeChild(item);
	// });
	items = [];
}

function renderList() {
	items.forEach(item => {
		let listItem = document.createElement("li");
		listItem.classList.add("list__item");
		if (item.completed) {
			listItem.classList.add("list__item--completed");
		}
		listItem.textContent = item.description;
		if (!item.completed) {
			todoList.appendChild(listItem);
		} else {
			completedList.appendChild(listItem);
		}
	});
}

function updateLocalStorage() {
	if (saveList.checked) {
		localStorage.setItem("todoList", JSON.stringify(items));
	}
}

function clearLocalStorage() {
	localStorage.clear();
}
