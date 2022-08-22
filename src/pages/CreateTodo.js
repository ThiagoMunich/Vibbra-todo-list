import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { v4 as uuidv4 } from "uuid"

import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import { makeStyles } from "@material-ui/styles"

import useList from "../hooks/useList"
import Header from "../components/Header"
import { createTodo, getAllTodos } from "../services/api"

const useStyles = makeStyles({
  image: {
    opacity: 0.8,
    maxHeight: 400,
    maxWidth: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
})

function CreateTodo() {
  const classes = useStyles()

  const { setList } = useList()

  const navigate = useNavigate()

  const [todoName, setTodoName] = useState("")

  /**
   * @function addToList
   * This function is used to create a new todo
   *
   * if last part of URL is equal "criar" then a random uuidv4 is generated
   * else the name typed in address bar is used as permalink
   *
   * after creating a new todo, it's neccessary to request the updated list of todos
   * and setList with this new data
   *
   * redirect the user to edit todo page at the end.
   *
   */
  const addToList = async () => {
    let reference = window.location.href.split("/")

    let permalinkByUrl = reference[reference.length - 1]

    let created = await createTodo({
      name: todoName,
      permalink:
        permalinkByUrl === "criar" ? `list/${uuidv4()}` : permalinkByUrl,
    })

    let allTodos = await getAllTodos()

    setList(allTodos.data)

    navigate(`/${created?.data?.permalink}`)
  }

  return (
    <>
      <Header />

      <Grid
        container
        justifyContent="space-between"
        style={{ marginTop: 16, padding: 24 }}
      >
        <Grid item xl={10} lg={10} md={10} sm={8} xs={7}>
          <TextField
            fullWidth
            value={todoName}
            autoComplete="off"
            label="Qual atividade quer adicionar?"
            placeholder="Ex: estudar, academia, lista de compras"
            onChange={(event) => setTodoName(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && addToList()}
          />
        </Grid>

        <Button
          variant="contained"
          disabled={todoName === ""}
          onClick={() => addToList()}
        >
          Adicionar
        </Button>

        <img
          alt="Create todo"
          className={classes.image}
          src="/assets/images/createTodoImage.png"
        />
      </Grid>
    </>
  )
}

export default CreateTodo
