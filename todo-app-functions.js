'use strict'

// Fetch existing todos from localStorage
const fetchTodos = () => {
  const todosJSON = localStorage.getItem('todos')

  try {
    return todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    return []
  }
  
}


// Save todos to localStorage
const saveTodos = todos => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Render todos
const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompleteMatch = !filters.hideCompleted || !todo.completed
    return searchTextMatch && hideCompleteMatch
  })

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed)

  document.querySelector('#todo-id').innerHTML = ''
  document.getElementById('todo-id').appendChild(generateSummaryDom(incompleteTodos))

  filteredTodos.forEach(todo => {
    document.getElementById('todo-id').appendChild(generateTodoDom(todo))
  })
}

//Remove todo function
const removeTodo = id => {
  todoIndex = todos.findIndex(todo => todo.id === id)
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
  }
}

const toogleTodo = id => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}


// Get the DOM elements for an individual note
const generateTodoDom = todo => {
  const todoElement = document.createElement('div')
  const textElement = document.createElement('span')
  const button = document.createElement('button')
  const check = document.createElement('input')
  check.setAttribute("type", "checkbox")
  check.checked = todo.completed

  check.addEventListener('change', () => {
    toogleTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  textElement.textContent = todo.text
  button.textContent = 'x'

  todoElement.appendChild(check)
  todoElement.appendChild(textElement)
  textElement.appendChild(button)

  button.addEventListener('click', () => {
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })
  return todoElement
}

// Get the DOM elements for list summary
const generateSummaryDom = incompleteTodos => {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodos.length} todos left!`
  return summary
}