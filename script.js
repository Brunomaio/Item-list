var userInput = document.querySelector("input#userInput");
var addToList = document.querySelector("button#addToList");
var ul = document.getElementsByTagName("ul")[0];

function addItem(){
  // Removes the empty list text 
	var emptyListText = document.querySelector("#empty-list");
  emptyListText.style.display = "none";
  var li = document.createElement("li");
  li.append(document.createTextNode(userInput.value));
  li.addEventListener("click", taskDone);
  li.classList.add("list-item");
  ul.appendChild(li);
	userInput.value = "";
  
  // Toggle task done on click
  function taskDone(){
  li.classList.toggle("done")
  };
  
  // Creates the Delete button
  var delButton = document.createElement("button");
  delButton.classList.add("delButton");  
  delButton.innerHTML = "Remove item";
  delButton.addEventListener("click", delItem);
  li.append(delButton);                   
  
  function delItem(){
    li.remove()
  };
  
}



addToList.addEventListener("click", function(){
	if (userInput.value.length > 0){
		addItem();
	}
})
userInput.addEventListener("keypress", function(event){
	if (userInput.value.length > 0 && event.keyCode === 13){
		addItem();
	}
})