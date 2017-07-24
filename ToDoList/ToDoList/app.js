// ***Note: replace void with {} inorder to compile***
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ToDoList = (function (_super) {
    __extends(ToDoList, _super);
    function ToDoList(props) {
        var _this = _super.call(this, props) || this;
        _this.onInputChange = function (e) {
            var newState = __assign({}, _this.state, { newItemName: e.currentTarget.value });
            _this.setState(newState);
        };
        _this.addItem = function () {
            var newItems = _this.state.items.concat([{ name: _this.state.newItemName, done: false }]);
            var newState = {
                items: newItems,
                newItemName: ""
            };
            _this.setState(newState);
        };
        _this.toggleCompleted = function (index) {
            var newItems = _this.state.items.slice(); // Make a copy of the array
            var copiedNewItem = _this.state.newItemName;
            var seletedItem = newItems[index]; // Make a copy of the item at `index` in the array
            seletedItem.done = true; // Modify the copied item to toggle the completed state and put it in the new array at `index`
            // Make a new state object with the new array on it and `setState`
            var newState = {
                items: newItems,
                newItemName: copiedNewItem
            };
            _this.setState(newState);
        };
        _this.state = {
            items: [{ name: "Milk", done: false }, { name: "Eggs", done: true }, { name: "Bread", done: false }, { name: "Beer", done: false }, { name: "Butter", done: false }],
            newItemName: ""
        };
        return _this;
    }
    ToDoList.prototype.render = function () {
        var _this = this;
        var itemsJSX = this.state.items.map(function (item, i) { return React.createElement("li", { onClick: function () { return _this.toggleCompleted(i); } },
            item.name,
            (item.done) ? " ✓" : ""); });
        return (React.createElement("div", null,
            React.createElement("h3", null,
                this.props.name,
                "'s To-Do List"),
            React.createElement("ul", null, itemsJSX),
            React.createElement("div", null,
                React.createElement("input", { value: this.state.newItemName, onChange: this.onInputChange }),
                React.createElement("button", { onClick: this.addItem }, "Add new item"))));
    };
    return ToDoList;
}(React.Component));
//class ToDoList extends React.Component<{}, {}> {
//    render() {
//        return (
//            <div>It seems there is still much to do.</div>
//        );
//    }
//}
window.onload = function () {
    var el = document.getElementById('content');
    var jsx = React.createElement(ToDoList, { name: "here" });
    ReactDOM.render(jsx, el);
};
//# sourceMappingURL=app.js.map