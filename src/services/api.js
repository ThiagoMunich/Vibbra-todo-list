import axios from "axios"

const api = axios.create({
  baseURL: "https://62fbca5fe4bcaf53518d2f5e.mockapi.io/api/",
})

/**
 * @function getAllTodos
 * get the list of all todos
 */
export const getAllTodos = async () => {
  let response = await api.get("/todo")

  return response
}

/**
 * @function getTodoById
 * get todo by id
 * @param id
 * requested todo id
 */
export const getTodoById = async (id) => {
  let response = await api.get(`/todo/${id}`)

  return response
}

/**
 * @function createTodo
 * create a new todo
 * @param todo
 * object containing name and permalink of the todo
 */
export const createTodo = async (todo) => {
  let response = await api.post("/todo", todo)

  return response
}

/**
 * @function editTodo
 * edit a todo by its id
 * @param id
 * id of the todo being edited
 * @param editedName
 * new name of the todo being edited
 */
export const editTodo = async (id, editedName) => {
  let response = await api.put(`/todo/${id}`, {
    name: editedName,
  })

  return response
}

/**
 * @function removeTodo
 * remove a todo by its id
 * @param id
 * id of the todo being edited
 * @param editedName
 * new name of the todo being edited
 */
export const removeTodo = async (id) => {
  let response = await api.delete(`/todo/${id}`)

  return response
}

/**
 * @function createItemByTodoId
 * create a new todo's item
 * @param todoId
 * id of the todo that will receive new item
 * @param subItem
 * name of the item that will be added
 */
export const createItemByTodoId = async (todoId, subItem) => {
  let response = await api.post(`/todo/${todoId}/items`, {
    name: subItem,
  })

  return response
}

/**
 * @function editItemByTodoId
 * edit todo's item name
 * @param todoId
 * id of the todo being edited
 * @param subItemId
 * id of the item being edited
 * @param editedName
 * new name of the item
 */
export const editItemByTodoId = async (todoId, subItemId, editedName) => {
  let response = await api.put(`/todo/${todoId}/items/${subItemId}`, {
    name: editedName,
  })

  return response
}

/**
 * @function removeItemByTodoId
 * remove a todo's item
 * @param todoId
 * id of the todo
 * @param subItemId
 * id of the item that will be removed
 */
export const removeItemByTodoId = async (todoId, subItemId) => {
  let response = await api.delete(`/todo/${todoId}/items/${subItemId}`)

  return response
}
