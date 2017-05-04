# React/TypeScript Training
This document assumes you have basic familiarity with HTML, CSS and JavaScript.

Make sure Visual Studio, node.js, and the latest version of TypeScript for your Visual Studio version are installed.

## User interfaces on the web
Since the early days of JavaScript, we've manipulated web pages through the Document Object Model (DOM). We would call functions like `document.getElementById` and `document.createElement` to do stuff like add table rows or change text content or alter the element's style. Various libraries like jQuery are used on top of these functions, but the basic idea is still the same: run a function that reaches in and changes the page in response to what the user did.

It's difficult to make this scale as the complexity of a web app grows. Actions in one area of the page frequently cause changes in other parts of the page. Consistency needs to be maintained. Sometimes whole sections of the document need to be replaced with new content that is completely different in structure.

[React](https://facebook.github.io/react/) is a library for user interfaces from Facebook that allows for a simpler approach. It works by having you come up with a piece of data that describes the state of the user interface at a moment in time. Then you write a function called `render` which uses that piece of data to create the entire user interface, seemingly from scratch. To make changes in the user interface, you come up with a new piece of data and give it to React to re-render the UI with.

## On the maintainability of JavaScript
JavaScript is what makes modern web apps possible. It makes it so the page can respond to user interaction by changing the content of parts of the page on the fly instead of making the web server generate an entirely new page and deliver it to the user's browser to be displayed. User interfaces made using JavaScript can be very fluid.

JavaScript has some problems that can make developing apps in it painful. Quirks like the `this` keyword in functions, unexpected behavior related to loose comparison operators `==` `!=`, and confusion around variable scope. The lack of static type checking can make it so remembering what properties are on objects, etc, and what types they actually are is hard, and your editor has limited ability to help you get it right.

[TypeScript](https://www.typescriptlang.org) has arisen as an answer to many of these difficulties. At its heart, it's just JavaScript plus type annotations. A valid piece of JavaScript is generally a valid piece of TypeScript. The output from the compiler mainly just strips the type annotations away to make it JavaScript again.

Using TypeScript, we can develop and modify our apps more productively: when we make a change, we find out sooner if we've broken something somewhere else, and it's easy to tell what functions and variables are available to use in a given context.

## Setting up your React/TypeScript project
We're going to create a simple to-do list app using React. Begin by opening Visual Studio and creating a new project. Search for "TypeScript" in the **Search Installed Templates** box and select the **HTML Application with TypeScript** project type. Name it something like ToDoList and create the project.

We want to modify this project so we can serve the TypeScript files we create! Add the following in web.config file:

```xml
  <system.webServer>
    <staticContent>
      <remove fileExtension=".tsx" />
      <mimeMap fileExtension=".tsx" mimeType="application/javascript" />
    </staticContent>
  </system.webServer>
  ```

If you open `app.ts` in the Solution Explorer, you'll find a Greeter component that shows off some of the basic language features. If you hit the green play button, the app should start up and open a page in your browser with a ticking timestamp. Hit Stop when you're done looking at it.

### NPM configuration
We're going to use npm (Node Package Manager) to add JavaScript libraries and TypeScript definitions files to the project. Definitions files allow us to have type checking and autocomplete on things provided to us by libraries like React.

1. Right click on the project in the Solution Explorer. Expand the **Add** menu and select **New Item**.
2. Type "npm" into the search bar and select **npm Configuration File**. Use the default name (package.json) and create the file.
3. Right click on your project file again and choose Open Folder in File Explorer.
4. Shift+right click in the background of the File Explorer window and choose **Open command window here**.
5. Run the following commands:

`npm install --save react react-dom`

`npm install --save-dev @types/react @types/react-dom`

Now we have the necessary libraries and type definitions installed, and they're saved as dependencies in `package.json`. If someone grabs this project in the future, they can run just `npm install` and fetch the dependencies specified in `package.json`.

### TypeScript compiler configuration
We'll also need to add a `tsconfig.json` file to the project to configure the TypeScript compiler.
1. Go to the **Add->New Item** menu in the Solution Explorer, as you did for `package.json`.
2. Search for "TypeScript". Select TypeScript JSON Configuration File and create it with the name `tsconfig.json`.
3. Open the file you created and edit it so it looks like this:
```JSON
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noEmitOnError": false,
    "removeComments": false,
    "sourceMap": true,
    "target": "es5",
    "jsx": "react"
  },
  "exclude": [
    "node_modules",
    "wwwroot"
  ],
  "compileOnSave": true
}
```


## Your first React element
Now, let's try and use React in this app. Start by renaming `app.ts` to `app.tsx`. This allows us to use a language extension called JSX, which makes writing React code simpler.

Delete the Greeter class at the beginning of the file, and replace the content of the `window.onload` function with something like this:

```JSX
window.onload = () => {
    const el = document.getElementById('content');
    const jsx = <div>Hello, world!</div>;
    ReactDOM.render(jsx, el);
};
```

Note the `<div>` inline in the middle of the TypeScript code. That's JSX, and we will be writing more of it.

Now let's tweak `index.html` to reference the scripts we need and try running it. Edit the content of `<head>` so it looks like this:

```HTML
<head>
    <meta charset="utf-8" />
    <title>TypeScript HTML App</title>
    <link rel="stylesheet" href="app.css" type="text/css" />
    <script src="node_modules/react/dist/react.js"></script>
    <script src="node_modules/react-dom/dist/react-dom.js"></script>
    <script src="app.js"></script>
</head>
```

Now run the app. If you see Hello, World! in your browser window, you succeeded! If not, you can try opening the console in Developer Tools with F12 to see what went wrong, or go over the instructions and compare your code to the examples to make sure everything was done right. In Chrome, you can also try opening the Developer Tools with F12, then right clicking the refresh button and selecting "Empty Cache and Hard Reload".

## React Components
User interfaces in React are divided up into classes called Components. While it's possible to just ask React to render a straight JSX element, to create interfaces with dynamic behavior, it's a good idea to create components.

The most basic thing that all components need is a `render` function. All this function needs to do is return JSX. Add something like this to `app.tsx`:

```JSX
class ToDoList extends React.Component<void, void> {
    render() {
        return (
            <div>It seems there is still much to do.</div>
        );
    }
}
```

Then, the usage site of the Component looks a little different:
```JSX
window.onload = () => {
    const el = document.getElementById('content');
    const jsx = <ToDoList />;
    ReactDOM.render(jsx, el);
};
```
In essence, a Component is like a custom HTML element you've made up that can have complex behavior.

You probably noticed those two generic type arguments up at `React.Component`. Those are the two types of data the component will receive: the props and the state.

### Using Props
Props is a piece of data received by a component which is used in `render`. You specify what the Props contain. Here's a simple example:

```JSX
interface Props {
    name: string;
}

class ToDoList extends React.Component<Props, void> {
    render() {
        return (
            <div>
                It seems there is still much to do, {this.props.name}.
            </div>
        );
    }
}
```

Note the parenthesis by the `return` statement. These allow us to use a more readable indentation style. Omitting the parens and putting the JSX on the next line would cause the function to return `undefined`, which isn't what we want.

If you edit `app.tsx` to contain this, you'll see there is a red line under `<ToDoList />` at the usage site. TypeScript is letting us know that we've failed to provide a prop that we've said is part of the Props type. This kind of checking is something you'll be thankful for. Edit `window.onload` to fix it:

```JSX
window.onload = () => {
    const el = document.getElementById('content');
    const jsx = <ToDoList name="CASS Student" />;
    ReactDOM.render(jsx, el);
};
```

As you can see, specifying props looks similar to specifying attributes like `<a href="google.com"></a>` on HTML elements.

When you run the program in your browser, you should now see the message "It seems there is still much to do, CASS Student."

### Using State
Props are distinguished by the fact that they're passed in by whoever is creating a particular component. The component receiving the props has direct ability to modify those props.

State is managed by the component itself, and the component is able to modify its state. In our basic example, we're going to use state to track a list of to-do items that we can later add to dynamically.

```JSX
interface Props {
    name: string;
}

interface State {
    items: string[];
}

class ToDoList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: ["Milk", "Eggs", "Bread"]
        };
    }

    render() {
        const itemsJSX = this.state.items.map(item => <li>{item}</li>);

        return (
            <div>
                <h3>{this.props.name}'s To-Do List</h3>
                <ul>
                    {itemsJSX}
                </ul>
            </div>
        );
    }
}
```
A few things to note in this code example:
- Adding state requires we implement a constructor to assign an initial state. Outside of the constructor, we **do not** assign to `this.state`, but instead use the `this.setState` function.
- Arrays are converted to JSX using `map`. `map` receives a function which converts an element from the array into some new value--in this case, an `<li>` element, and returns a new array with the result of the function applied to each element of the original array.
- JSX expressions are required to have a single root element-- thus, we enclose the `<h3>` and `<ul>` in a `<div>`.

## Putting it all together
Now, we'll add UI to add a new to-do item to the list. The approach we will take is roughly as follows:
1. Add an `<input>` element to type in the new to-do item's name.
2. Add a `<button>` to submit the new to-do item.
3. Call `setState` in this button's click handler with a new list of items.

First, we'll add the input element along with the necessary state to manage its content.

1. Add a property called `newItemName` of type `string` to `State`.
2. Add it to the initial state object in `constructor` and give it an initial value of `""` (the empty string).
3. Add the input element to `render`, specifying its `value` as `this.state.newItemName`.

If you run the app and try to type in the input, you'll notice that it stays blank. That's because we need to update its state in response to the user's keystrokes.

### Props and state are immutable
Immutability in this case means that you don't change an object after you give it to React. That means you **never assign anything** to a member of `this.props` or `this.state`, and you don't assign to other variables referencing that same object, e.g.:
```JSX
const props = this.props;
props.something = 42;
```

Instead, to change the state of our React app, we'll give it an entirely new state value.

### Handling events
We will attach an `onChange` handler to the input to do this. Add a new function to `ToDoList` that looks like this:

```JSX
// inside class ToDoList:
onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
        ...this.state,
        newItemName: e.currentTarget.value
    };
    this.setState(newState);
}
```
Now we'll update the JSX to reference this newly defined function.
```JSX
// inside ToDoList's render function:
<div>
	... // the content that was already in the div
	<input value={this.state.newItemName} onChange={this.onInputChange} />
</div>
```
Key notes:
- We're defining `onInputChange` using an arrow function. This makes it so when we pass it off as a variable in JSX, `this` is guaranteed to be the instance of ToDoList that we're intending to use, instead of being determined by the caller. If we defined it the way we defined `render`, then `this` might point to something else that doesn't have a `setState` function on it. [Check out this posting for more details.](http://stackoverflow.com/a/28135120/2855742)
- The type annotation on the change event `e` was determined using Go to Definition (F12) on the `onChange` attribute on the input.
- We're using the spread operator `...` to copy all the properties from `this.state` into a new object. This is syntactic sugar for `Object.assign()`.
- By specifying `newItemName` after `...this.state`, we're making it so `e.currentTarget.value` is used for the `newItemName` on the new state instead of the old `this.state.newItemName`.

If you go into your browser now, you can type and the contents of the input will update.

### Adding an item
Now we just need to add a button to add the item name the user typed to the list of to-do items.

```JSX
// inside class ToDoList
addItem = () => {
    const newItems = [...this.state.items, this.state.newItemName];
    const newState = {
        items: newItems,
        newItemName: ""
    };
    this.setState(newState);
};
```
This handler will make a new item with what the user typed into the input and clear the contents of the text field.

- The `...` spread operator is used here on the `this.state.items` array to create a new array consisting of items from the original array with a single new item at the end.

Now when you run the app, you should see a to-do list that you can add items to.

## Looking forward
Now that you've learned some of the basic practices that go into making a React component, try adding the ability to check and uncheck individual items to mark them as completed. Here are some tips that should help:
- The items array should change from being a `string[]` to being some interface type you define that has `name: string` and `completed: boolean` attributes.
- Render each item slightly differently based on whether it's completed, e.g. add a ✓ character to its name when rendering, or a custom `className` attribute that changes the background color based on CSS.
- Come up with a function that toggles the item's completed state at a certain row and attach it to each row in the list. It might look something like this:
```JSX
toggleCompleted = (index: number) => {
    const newItems = this.state.items.slice(); // Make a copy of the array
    // Make a copy of the item at `index` in the array
    // Modify the copied item to toggle the completed state and put it in the new array at `index`
    // Make a new state object with the new array on it and `setState`
}
```
- Attach the handler when creating `<li>` elements using the optional second parameter to the `map` callback function:
```JSX
this.state.items.map((item, i) => <li onClick={() => this.toggleCompleted(i)}>/* name and check */</li>)
```

## Growing complexity
As these functions for rendering subcomponents based on parameters change, it's a good idea to start factoring them out to separate functions like `renderTodoItem` or to create a new Component subclass like `ToDoItem`. If you choose the latter, you will want to pass the `onClick` handler in as a prop, because you won't have access to `toggleCompleted` in the other class.

### A parent component's state is a child component's prop
One of the limitations of state is that it isn't visible to parent components. Consider the case of a component hierarchy with a ToDoList that contains ToDoItems. The completed attribute only affects the rendering of the particular ToDoItem in question. This makes it seem reasonable to keep it as state on the ToDoItem, but there are major drawbacks to that. The parent would have no way of knowing about the completed state of the ToDoItem. If you went to do a save of the user's to-do list at any point, you'd struggle to actually obtain what that latest state is.

Therefore, you should try to keep state in top-level components, or even above top-level components. The parent component contains the state, which will be accessible when you go to call "save" or "cancel" or whatever you want to do. The child component will just receive values inside the state as props-- it won't have the ability to modify those props, but it may also receive event handler functions that cause the parent's state to be updated, and thus for the child to be re-rendered with new props.

### State management
To end this training, we'll discuss a few commonly used techniques for state management, and mention a pattern we've already used in a few places at CASS.

Since we often try to limit the number of external libraries we pull into projects, we solve state management problems by just making a parent "controller" class which contains the top-level component of our React app. This has a few strengths:
1. It allows the top-level component to receive an event handler that makes it re-render with new props.
2. It allows for structured "interop" between React and non-React parts of the page. The fact that React doesn't demand to be in charge of the entire page is one of its biggest strengths.

The general structure of a controller looks like this:
```JSX
class MyController {
    constructor(private props: SomeDataModel, private rootElement: HTMLDivElement) {}

    onSave = (newValue: string) => {
        ...
        this.props = ... // make a copy somehow using newValue
        this.render();
    }

    render() {
        ReactDOM.render(<MyComponent {...props} onSave={this.onSave} />, this.rootElement);
    }
}

// This is a replacement for the window.onload handler function.
// In your page template or top-level script:
addEventListener("load", () => {
    const controller = new MyController(data, document.getElementById("root"));
    controller.render();
});
```
- Note that TypeScript has syntax sugar for instance variables: if you just throw a visiblity modifier (private, public...) onto a constructor parameter, it automatically gets assigned to the class instance.
- `SomeDataModel` is a type which has the data used to populate some component, but not its event handlers. `MyComponentProps` then is the union of `SomeDataModel` and a type which gives signatures for the event handlers (e.g `onSave`) on `MyComponent`.
- The `data` argument comes from either your template serializing a model to JSON or is given in a callback to some API method you have for populating the view.

To see another, more commonly used approach to state management, check out the [Redux](https://github.com/reactjs/redux) library.
