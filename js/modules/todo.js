// 待办事项功能模块
function initTodoList() {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    
    // 从本地存储加载待办事项
    loadTodos();
    
    addButton.addEventListener('click', addTodo);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    function addTodo() {
        const todoText = input.value.trim();
        if (todoText !== '') {
            const li = document.createElement('li');
            li.textContent = todoText;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.addEventListener('click', function() {
                todoList.removeChild(li);
                saveTodos();
            });
            
            li.appendChild(deleteButton);
            todoList.appendChild(li);
            input.value = '';
            
            // 保存到本地存储
            saveTodos();
        }
    }
    
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            // 获取待办事项文本（不包括删除按钮的文本）
            const todoText = li.firstChild.textContent;
            todos.push(todoText);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todoText => {
            const li = document.createElement('li');
            li.textContent = todoText;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.addEventListener('click', function() {
                todoList.removeChild(li);
                saveTodos();
            });
            
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
}

export default initTodoList;