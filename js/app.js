Vue.component('tasks', {
    methods: {
        add: function () {
            if (this.newTask.length < 1) {
                return alert('La tarea no puede estar vacia.')
            }
            this.tasks.push({
                title: this.newTask, completed: false
            });
            this.newTask = "";
        }
    },
    data: function () {
        return {
            tasks: [
                {
                    title: 'PHP', completed: true
                },
                {
                    title: 'Laravel', completed: true
                },
                {
                    title: 'VueJS', completed: false
                },
            ],
            newTask: "",
        }
    },
    computed: {
        completed: function () {
            return this.tasks.filter(function (task) {
                return task.completed;
            }).length;
        },
        incompleted: function () {
            return this.tasks.filter(function (task) {
                return !task.completed;
            }).length;
        }
    },
    template: `<section class="todoapp">
        <header class="header">
            <h1>Lista de Tareas</h1>
            <input v-on:keyup.enter="add" v-model="newTask" type="text" class="new-todo" placeholder="¿Qué deseas hacer?">
        </header>
        <section>
            <ul class="todo-list">
                <li class="todo" is="task" v-for="task in tasks" :task="task" v-bind:key="task.id"></li>
            </ul>
        </section>
        <footer class="footer" v-show="tasks.length">
            <span class="todo-count">Completas: {{ completed }} | Incompletas: {{ incompleted }}</span>
        </footer>
        
    </section>`
})

Vue.component('task', {
    props: ['task'],
    data: function () {
        return {
            editing: false,
            cacheBeforeEdit: '',
        }
    },
    computed: {
        classes: function () {
            return { completed: this.task.completed, editing: this.editing };
        }
    },
    methods: {
        remove: function () {
            var tasks = this.$parent.tasks;

            tasks.splice(tasks.indexOf(this.task), 1);

        },
        edit: function () {
            this.editing = true;
            this.cacheBeforeEdit = this.task.title;

        },
        editingDone: function () {
            if (! this.task.title) {
                this.remove();
            }
            this.editing = false;

        },
        cancelEdit: function () {
            this.editing = false;
            this.task.title = this.cacheBeforeEdit;

        },
    },
    template: `<li :class="classes">
        <div class="view">
            <input @click="complete()" type="checkbox" class="toggle" v-model="task.completed">
            <label v-text="task.title" @dblclick="edit"></label>
            <button class="destroy" @click="remove()"></button>
            
        </div>
        <input type="text" class="edit" v-model="task.title" @keyup.enter="editingDone()" @blur="editingDone()"  @keyup.esc="cancelEdit()">
    </li>`
})

var app = new Vue({
    el: '#app'
})