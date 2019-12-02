const todoList = document.getElementById("todolist");
const completedList = document.getElementById("completedlist");
const formSubmit = document.getElementById("form-submit");
const inputField = document.getElementById("form-input");
const saveList = document.getElementById("save-list");
const clearListBtn = document.getElementById("clear-list-btn");
const deleteItemBtn = document.getElementById("delete-item-btn");

let items = [];

// Captures user input on input field and add value to userInput variable
let userInput = "";
inputField.addEventListener("keyup", e => {
	userInput = e.target.value;
});

// Add the state of the "Save list" checkbox to localStorage and updates it with items list array
saveList.addEventListener("click", () => {
	if (saveList.checked) {
		localStorage.setItem("saveList", saveList.checked);
		addItemsToLocalStorage();
	} else {
		localStorage.removeItem("saveList");
	}
});

// Adds new element to items array from user input upon submiting form
formSubmit.addEventListener("click", e => {
	e.preventDefault();
	if (userInput.length > 0) {
		addItemToList();
		clearUI();
		renderList();
		if (saveList.checked) {
			addItemsToLocalStorage();
		}
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
		clearUI();
		renderList();
	}
});

// Toggles "completed" css class to item upon click and update "items" array
/**** HAS BUG with entries with same description. Use item ID instead ***/
document.addEventListener("click", e => {
	if (e.target.nodeName === "LI") {
		e.target.classList.toggle("list__item--completed");
		items.forEach(item => {
			if (e.target.textContent === item.description) {
				item.completed = !item.completed;
			}
		});
		clearUI();
		renderList();
		addItemsToLocalStorage();
	}
});

deleteItemBtn.addEventListener("click", e => deleteItem(e));

clearListBtn.addEventListener("click", () => {
	clearLocalStorage();
	clearUI();
	clearList();
	renderList();
});

function addItemToList() {
	items.push({
		description: userInput,
		completed: false,
		id: items.length,
		active: true
	});
}

function clearUI() {
	const allItems = document.querySelectorAll(".list__item");
	allItems.forEach(item => {
		item.parentNode.removeChild(item);
	});
}

function clearList() {
	items = [];
}

function renderList() {
	items.forEach(item => {
		if (item.active) {
		}
		let listItem = document.createElement("li");
		listItem.classList.add("list__item");
		listItem.setAttribute("data-items", item.id);

		let listItemText = document.createElement("p");
		listItemText.classList.add("list__item-text");
		listItemText.textContent = item.description;

		let listItemDelete = document.createElement("button");
		listItemDelete.classList.add("list__item-delete");
		listItemDelete.id.add("delete-item-btn");

		listItem.appendChild(listItemText);
		listItem.appendChild(listItemDelete);

		if (item.completed) {
			listItem.classList.add("list__item--completed");
		}

		if (!item.completed) {
			todoList.appendChild(listItem);
		} else {
			completedList.appendChild(listItem);
		}
	});
}

function addItemsToLocalStorage() {
	localStorage.setItem("todoList", JSON.stringify(items));
}

function clearLocalStorage() {
	if (saveList.checked) {
		localStorage.removeItem("todoList");
	} else {
		localStorage.clear();
	}
}

function deleteItem(listItem) {
	items.forEach(item => {
		if (listItem.target.parentElement.id === item.id) {
			item.active = false;
		}
	});
	console.log(listItem);
}
