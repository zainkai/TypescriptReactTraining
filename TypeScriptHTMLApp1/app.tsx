
window.onload = () => {
    const el = document.getElementById('content');
    const jsx = <ToDoList name="CASS Student" />;
    ReactDOM.render(jsx, el);
};


interface Props {
    name: string;
}

interface State {
    items: string[];
    newItemName: string;
}

class ToDoList extends React.Component<Props, State> {

    state = {
        items: ["Milk", "Eggs", "Bread"],
        newItemName: "",
        butt: 42
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {
            ...this.state,
            newItemName: e.currentTarget.value
        };
        this.setState(newState);
    };

    addItem = () => {
        const newItems = [...this.state.items, this.state.newItemName];
        const newState = {
            items: newItems,
            newItemName: ""
        };
        this.setState(newState);
    };

    render() {
        const itemsJSX = this.state.items.map(item => <li>{item}</li>);

        return (
            <div>
                <h3>{this.props.name}'s To-Do List</h3>
                <ul>
                    {itemsJSX}
                </ul>
                <input value={this.state.newItemName} onChange={this.onInputChange} />
                <button onClick={this.addItem}>Add</button>
            </div>
        );
    }
}
