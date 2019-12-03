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
window.addEventListener("click", e => {
	if (e.target.parentElement.nodeName === "LI") {
		e.target.classList.toggle("list__item--completed");
		items.forEach(item => {
			if (e.target.parentElement.attributes[1].value == item.id) {
				item.completed = !item.completed;
			}
		});
		clearUI();
		renderList();
		addItemsToLocalStorage();
	}
});

// "Deletes" the item upon clicking on the X button (actually only sets the item.active as false)
window.addEventListener("click", e => {
	if (e.target.id === "delete-item-btn") {
		deleteItem(e);
		addItemsToLocalStorage();
		clearUI();
		renderList();
	}
});

// Sets all items as active = false so that they won't display
clearListBtn.addEventListener("click", e => {
	e.preventDefault();
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
			let listItem = document.createElement("li");
			listItem.classList.add("list__item");
			listItem.setAttribute("data-items", item.id);

			let listItemText = document.createElement("p");
			listItemText.classList.add("list__item-text");
			listItemText.textContent = item.description;

			let listItemDelete = document.createElement("button");
			listItemDelete.classList.add("list__item-delete");
			listItemDelete.id = "delete-item-btn";
			listItemDelete.textContent = "X";

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
		if (listItem.target.parentElement.attributes[1].value == item.id) {
			item.active = false;
		}
	});
}
