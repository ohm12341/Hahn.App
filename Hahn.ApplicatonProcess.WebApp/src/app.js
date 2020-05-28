var App = (function () {
    function App() {
        this.heading = "Todos";
        this.todos = [];
        this.todoDescription = '';
    }
    App.prototype.addTodo = function () {
        if (this.todoDescription) {
            this.todos.push({
                description: this.todoDescription,
                done: false
            });
            this.todoDescription = '';
        }
    };
    App.prototype.removeTodo = function (todo) {
        var index = this.todos.indexOf(todo);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    };
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map