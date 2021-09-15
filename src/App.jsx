import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Source code imports
import ItemsList from "./ItemsList";
import SelectedItems from "./SelectedItems";

/***
  - Main page
    X- Add routes
    X- Add links to other pages
      X- fruits
      X- vegetables
    X- Show title
    - Show list of selected groceries
  
  - Fruits Page
    X- Link back to main page
    X- List all fruits
      - Checkbox next to each fruit
    - Clicking on checkbox adds frut to list of selected
      groceries on main page
    - If user goes to main page and navigates back here,
      THEN the fruits they check are still checked.

  - Vegetables Page
    - Same features as fruits page but/w vegetables list



    - What data do we need for "Selected items?"
      - Item name - string
      - If selected - boolean
      ?- type ? - string
 */

function App(props) {
  // Our raw data. In a real app we might get this via an API call instead of it being hardcoded.
  const fruits = ["apples", "bananas", "oranges", "kiwis", "strawberries"];
  const vegetables = ["broccoli", "carrots", "zuccini", "green beans"];

  const TYPE_NAMES = {
    fruits: "fruits",
    vegetables: "vegetables",
  };

  // reformat grocery data into array of objects w/checked and type info
  const fruitsWithChecked = fruits.map((item) => ({
    name: item,
    checked: false,
    type: TYPE_NAMES.fruits,
  }));

  const vegetablesWithChecked = vegetables.map((item) => ({
    name: item,
    checked: false,
    type: TYPE_NAMES.vegetables,
  }));

  // combine our data into one array
  const allItemsWithChecked = []
    .concat(fruitsWithChecked)
    .concat(vegetablesWithChecked);

  // create the react component state we'll use to store our data
  const [items, setItems] = useState(allItemsWithChecked);

  // See the 'Note' section from here: https://reactjs.org/docs/hooks-reference.html#functional-updates
  // IMPORTANT: When we update state involving objects (objects, arrays, etc), we MUST return
  // a **new** object. We can't just modify an object property or an element in an array. This immutability - variables don't change,
  // we create new ones with our updated value, is a core idea of functional programming and part of how React works.
  // Otherwise React doesn't realize we have changed state - it expects state changes to be immutable, which with Javascript
  // means we have to create a new version of our object/array so the *reference* to that thing changes.
  const updateItem = (itemName) => {
    console.log("updateItem for ", itemName);
    // Go thru all items; change the desired one; return a new array which has our updated item and all the other items.
    setItems((prevState) => {
      return prevState.map((item) => {
        console.log(item);

        // If it's the desired item, flip the value of `item.checked`
        if (itemName === item.name) {
          console.log("desired item ", item);

          // This could also be done as `return { ...item, checked: !item.checked }`
          const newItem = {
            name: item.name,
            type: item.type,
            checked: !item.checked,
          };

          console.log("updated item ", newItem);
          return newItem;
        }

        // If it's not the desired item, return it unchanged
        return { ...item }; // IMPORTANT: Object destructuring like this creates a **new** object w/the same values
      });
    });
  };

  // console.log(items);

  return (
    <Router>
      <div className="App">
        <h1>Grocery List App</h1>
        <div>
          <Link to="/">Selected Items</Link>
        </div>
        <div>
          <Link to={`/${TYPE_NAMES.fruits}`}>Fruits</Link>
        </div>
        <div>
          <Link to={`/${TYPE_NAMES.vegetables}`}>Vegetables</Link>
        </div>
      </div>
      <Switch>
        <Route path="/fruits">
          <ItemsList
            items={items}
            type={TYPE_NAMES.fruits}
            updateItem={updateItem}
          />
        </Route>
        <Route path="/vegetables">
          <ItemsList
            items={items}
            type={TYPE_NAMES.vegetables}
            updateItem={updateItem}
          />
        </Route>
        <Route path="/">
          <SelectedItems items={items} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
