// Problem: User interactions doesnt provide desired results.
// Solution: Add Interactivity so the user can manage daily tasks

var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");//incomplete-tasks
var completedTaskHolder = document.getElementById('completed-tasks'); //completed-tasks



//New Task List Item
var createNewTaskElement = function(taskString){
	//Create List Item
	var listItem = document.createElement("li");

	//input(checkbox)
	var checkBox = document.createElement("input");

	//label
	var label = document.createElement("label");

	//input(text)
	var editInput = document.createElement("input"); //text

	//button.edit
	var editButton = document.createElement("button");

	//button.delete
	var deleteButton = document.createElement("button");

	//Each element needs modifying

	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	// Each element needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	
	return listItem;
}






//Add a new task
var addTask = function(){
	console.log("Add Task.........");
	
	//Create a new list item with the text from #new-task:
	var listItem = createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

//Edit an existing task
var editTask = function(){
	console.log("Add Task.........");
	
	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type = text]");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");


		// if the class of the parent is .editMode
		if(containsClass){

			//Switch from .editMode
			//label text become the inputs value
			label.innerText = editInput.value;
		}

		 else{
		 	// Switch to .editMode
			//input value becomes the label's text
			editInput.value = label.innerText;
		 }

		 //Toggle .editMode on the list item
		 listItem.classList.toggle("editMode");
			
}


//Delete an existing task
var deleteTask = function(){
	console.log("Delete Task.........");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

		// Remove the parent list item from the ul
		ul.removeChild(listItem);
}


//Mark a task as complete
var taskCompleted = function(){
	console.log("Task complete.........");

	
		// Append the task list item to the #completed-tasks
		var listItem = this.parentNode;
		completedTaskHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskIncomplete);
		
}


//Mark a task as incomplete
var taskIncomplete = function(){
	console.log("Task Incomplete.........");

	
		// Append the task list item to the #incomplete-tasks
		var listItem = this.parentNode;
		incompleteTaskHolder.appendChild(listItem);
		
		bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton  = taskListItem.querySelector("button.delete");

	//bind editTask to edit button 
	editButton.onclick = editTask;

	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;

	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;


} 





// Set the click handler to the addTask function
addButton.onclick = addTask;



//cycle ove incompleteTaskholder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
	//bind events to list item's children(taskCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);

}


//cycle ove completedTaskholder ul list items
for (var i = 0; i < completedTaskHolder.children.length; i++) {
	//bind events to list item's children(taskCompleted)
	bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
	
}