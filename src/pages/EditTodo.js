import { useEffect, useState } from "react"

import Grid from "@mui/material/Grid"

import Header from "../components/Header"
import TodoCard from "../components/TodoCard"
import { getAllTodos } from "../services/api"

export default function EditTodo() {
  const [todo, setTodo] = useState({})

  /**
   * @function requestTodo
   * need when user wants to share a todo by email
   * since we don't have an oficial API yet
   * we need to request all todo data and filterd
   * a todo by its permalink
   *
   * TODO request just the todo to be edited by permalink using oficial API
   */
  const requestTodo = async () => {
    let permalink = window.location.href.split("/")

    permalink = permalink[permalink.length - 1]

    let allTodos = await getAllTodos()

    let currentTodo = allTodos?.data?.filter((todo) =>
      todo.permalink.includes(permalink)
    )

    setTodo(currentTodo[0])
  }

  useEffect(() => {
    requestTodo()
  }, [window.location.href])

  return (
    <>
      <Header />

      <Grid container justifyContent="center">
        <TodoCard todo={todo} setTodo={setTodo} requestTodo={requestTodo} />
      </Grid>
    </>
  )
}
