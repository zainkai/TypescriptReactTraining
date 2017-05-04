var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var el = document.getElementById('content');
    var jsx = React.createElement(ToDoList, { name: "CASS Student" });
    ReactDOM.render(jsx, el);
};
var ToDoList = (function (_super) {
    __extends(ToDoList, _super);
    function ToDoList(props) {
        var _this = _super.call(this, props) || this;
        _this.onChecked = function (e) {
            var newState = {
                items: _this.state.items,
                newItemName: _this.state.newItemName,
                newCompleted: !_this.state.newCompleted
            };
            _this.setState(newState);
        };
        _this.onInputChange = function (e) {
            var newState = {
                items: _this.state.items,
                newItemName: e.currentTarget.value
            };
            _this.setState(newState);
        };
        _this.addItem = function () {
            var newItem = { name: _this.state.newItemName, completed: _this.state.newCompleted };
            var newItems = _this.state.items.concat([newItem]);
            var newState = {
                items: newItems,
                newItemName: "",
                newCompleted: false
            };
            _this.setState(newState);
        };
        var newItem = { name: "Apple", completed: true };
        _this.state = {
            items: [newItem],
            newItemName: "",
            newCompleted: false
        };
        return _this;
    }
    ToDoList.prototype.renderCheckBox = function (prop) {
        var check = "";
        if (prop.completed) {
            check = "✓";
        }
        return React.createElement("li", null,
            " ",
            prop.name,
            " ",
            check);
    };
    ;
    ToDoList.prototype.render = function () {
        var _this = this;
        var itemsJSX = this.state.items.map(function (item) { return _this.renderCheckBox(item); });
        return (React.createElement("div", null,
            React.createElement("h3", null,
                this.props.name,
                "'s To-Do List"),
            React.createElement("ul", null, itemsJSX),
            React.createElement("input", { type: "checkbox", id: "completed", name: "Completed", checked: this.state.newCompleted, onChange: this.onChecked }),
            React.createElement("input", { value: this.state.newItemName, onChange: this.onInputChange }),
            React.createElement("button", { onClick: this.addItem }, "Add")));
    };
    return ToDoList;
}(React.Component));
//# sourceMappingURL=app.js.map