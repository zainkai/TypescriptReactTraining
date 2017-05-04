window.onload = () => {
    const el = document.getElementById('content');
    const jsx = <ToDoList name="CASS Student" />;
    ReactDOM.render(jsx, el);
};

interface Item {
    name: string;
    completed: boolean;
}


interface Props {
    name: string;
}

interface State {
    items: Item[];
    newItemName: string;
    newCompleted: boolean;
}

class ToDoList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        var newItem: Item = { name: "Apple", completed: true };
        this.state = {
            items: [newItem],
            newItemName: "",
            newCompleted: false
        };
    }

    onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {

        const newState = {
            items: this.state.items,
            newItemName: this.state.newItemName,
            newCompleted: !this.state.newCompleted
        };
        this.setState(newState);
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {
            items: this.state.items,
            newItemName: e.currentTarget.value
        };
        this.setState(newState);
    };

    addItem = () => {
        var newItem: Item = { name: this.state.newItemName, completed: this.state.newCompleted };
        const newItems = [...this.state.items, newItem];
        const newState = {
            items: newItems,
            newItemName: "",
            newCompleted: false
        };
        this.setState(newState);
    };

    renderCheckBox(prop: Item) {
       var check = "";
       if (prop.completed) {
           check = "✓";
       }
        return <li> {prop.name} {check}</li>;
    };

    render() {

        const itemsJSX = this.state.items.map(item =>  this.renderCheckBox(item) );
        return (
            <div>
                <h3>{this.props.name}'s To-Do List</h3>
                <ul>
                    {itemsJSX}
                </ul>
                <input type="checkbox" id="completed" name="Completed" checked={this.state.newCompleted} onChange={this.onChecked} />
                <input value={this.state.newItemName} onChange={this.onInputChange} />
                <button onClick={this.addItem}>Add</button>
            </div>
        );
    }
}
