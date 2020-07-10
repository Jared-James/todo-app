'use strict'

let todos = fetchTodos()

const filters = {
  searchText: '',
  hideCompleted: false
}

renderTodos(todos, filters)

document.getElementById('new-todo').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderTodos(todos, filters)
})

document.getElementById('todo-form').addEventListener('submit', (e) => {
  event.preventDefault()
  const result = e.target.elements.todoForm.value.trim()
  if (result.length > 0) {
  todos.push({
    id: uuidv4(),
    text: result,
    completed: false
  })
} else {
  return null
}

  saveTodos(todos)
  renderTodos(todos, filters)
  e.target.elements.todoForm.value = ''
})


document.getElementById('checked').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters)
})

