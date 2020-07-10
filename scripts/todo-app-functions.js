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
  const todoEl = document.querySelector('#todo-id')
  let filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompleteMatch = !filters.hideCompleted || !todo.completed
    return searchTextMatch && hideCompleteMatch
  })

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed)

            todoEl.innerHTML = ''
            todoEl.appendChild(generateSummaryDom(incompleteTodos))

  

    if  (filteredTodos.length > 0 ) { 
      filteredTodos.forEach(todo => { 
        todoEl.appendChild(generateTodoDom(todo))
        })
    } else {
      let p = document.createElement('p')
      p.classList.add('empty-message')
      p.textContent = "No to-dos to show"
      todoEl.appendChild(p)
  }
}


//Remove todo function - new note
const removeTodo = id => {
 const todoIndex = todos.findIndex(todo => todo.id === id)
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
  const todoElement = document.createElement('label')
  const containerElement = document.createElement('div')
  const check = document.createElement('input')
  const textElement = document.createElement('span')
  const button = document.createElement('button')
  

  check.setAttribute("type", "checkbox")
  check.checked = todo.completed
  containerElement.appendChild(check)
  check.addEventListener('change', () => {
    toogleTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  textElement.textContent = todo.text
  containerElement.appendChild(textElement)

  todoElement.classList.add('list-item')
  containerElement.classList.add('list-item__container')
  todoElement.appendChild(containerElement)

  
  button.textContent = 'remove'
  button.classList.add('button', 'button--text')
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
  const plural = incompleteTodos.length === 1 ? '' : 's'
  summary.classList.add('list-title')
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left!`
 
  return summary
}