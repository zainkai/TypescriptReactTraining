// ***Note: replace void with {} inorder to compile***

interface Props {
    name: string;
}

interface toDoItem {
    name: string;
    done: boolean;
}

interface State {
    items: toDoItem[];
    newItemName: string;
}

class ToDoList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: [{ name: "Milk", done: false }, { name: "Eggs", done: true }, { name: "Bread", done: false }, { name: "Beer", done: false }, { name: "Butter", done: false }],
            newItemName: ""
        };
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {
            ...this.state,
            newItemName: e.currentTarget.value
        };
        this.setState(newState);
    }

    addItem = () => {
        const newItems = [...this.state.items, {name: this.state.newItemName,done:false }];
        const newState = {
            items: newItems,
            newItemName: ""
        };
        this.setState(newState);
    };

    toggleCompleted = (index: number) => {
        const newItems = this.state.items.slice(); // Make a copy of the array
        const copiedNewItem = this.state.newItemName;
        const seletedItem = newItems[index];// Make a copy of the item at `index` in the array

        seletedItem.done = true;// Modify the copied item to toggle the completed state and put it in the new array at `index`

        // Make a new state object with the new array on it and `setState`
        const newState = {
            items: newItems,
            newItemName: copiedNewItem
        };
        this.setState(newState);
        
    }

    render() {
        const itemsJSX = this.state.items.map((item,i) => <li onClick={() => this.toggleCompleted(i)}>{item.name}{(item.done) ? " ✓": ""}</li>);

        return (
            <div>
                <h3>{this.props.name}'s To-Do List</h3>
                <ul>
                    {itemsJSX}
                </ul>
                <div>
                    <input value={this.state.newItemName} onChange={this.onInputChange} />
                    <button onClick={this.addItem}>Add new item</button>
                </div>
            </div>
        );
    }
}



//class ToDoList extends React.Component<{}, {}> {
//    render() {
//        return (
//            <div>It seems there is still much to do.</div>
//        );
//    }
//}

window.onload = () => {
    const el = document.getElementById('content');
    const jsx = <ToDoList name="here" />;
    ReactDOM.render(jsx, el);
};