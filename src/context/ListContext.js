import { createContext, useEffect, useState } from "react"

import { getAllTodos } from "../services/api"

export const ListContext = createContext()

const ListProvider = ({ children }) => {
  const [list, setList] = useState([])

  /**
   * @function requestListOfTodos
   *
   * this is a must have here because we need to
   * request the todos list again if user reloads the page
   * useEffect hook is triggered once page is loaded
   */

  const requestListOfTodos = async () => {
    let response = await getAllTodos()

    setList(response.data)
  }

  useEffect(() => {
    requestListOfTodos()
  }, [])

  return (
    <ListContext.Provider value={{ list, setList }}>
      {children}
    </ListContext.Provider>
  )
}

export default ListProvider
