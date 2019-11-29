# Yet another To do list

Because there's only so many ways of saying hello world

- To do:

* Feature do delete individual items
* Feature to drag and drop items within list
* Improve the styling

- Known bugs:

* If 2 list items have the same name, clicking on one affects the other. Possible fix: when creating <li> list item, also add an ID attribute equals to the item.id in the items array and check for that instead of name
* When it becomes possible to delete individual items, adding new items may cause multiple items to have the same item.id because I set the id to items.length
