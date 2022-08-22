import { useNavigate } from "react-router-dom"

import { v4 as uuidv4 } from "uuid"

import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import {
  swalEditItem,
  swalEditTodo,
  swalCreateItem,
  swalRemoveItem,
  swalRemoveTodo,
} from "./ManipulateItemByTodo"
import useList from "../hooks/useList"
import { createTodo, getAllTodos, removeItemByTodoId } from "../services/api"

export default function TodoCard({ todo, setTodo, requestTodo }) {
  const navigate = useNavigate()

  const { setList } = useList()

  const handleEditTodo = async () => {
    await swalEditTodo(todo)

    requestTodo()
  }

  const handleRemoveTodo = async () => {
    await swalRemoveTodo(todo)
  }

  const handleCreateItem = async () => {
    await swalCreateItem(todo)

    requestTodo()
  }

  const handleRemoveItem = async (subItem) => {
    await swalRemoveItem(todo, subItem)

    requestTodo()
  }

  const handleEditItem = async (subItem) => {
    await swalEditItem(todo, subItem)

    requestTodo()
  }

  /**
   * @function handleOnDragEnd
   * used to manipulate items within a todo changing its positions
   *
   * if result.destination is undefined it means that user
   * is trying to move an item outside of card boundaries
   * and in this case a new todo will be created using the dragged item title.
   * else we just change the order of the items in the list
   *
   * @param result
   * used to get info about the item being dragged
   */
  const handleOnDragEnd = async (result) => {
    if (!result.destination) {
      let draggedItem = todo?.items?.filter(
        (item) => item.id === result.draggableId
      )[0]

      let created = await createTodo({
        name: draggedItem.name,
        permalink: `list/${uuidv4()}`,
      })

      await removeItemByTodoId(todo.id, draggedItem.id)

      let allTodos = await getAllTodos()

      setList(allTodos.data)

      navigate(`/${created?.data?.permalink}`)
    } else {
      const items = Array.from(todo?.items)

      const [reorderedItem] = items.splice(result.source.index, 1)

      items.splice(result.destination.index, 0, reorderedItem)

      setTodo({ ...todo, items: items })
    }
  }

  return (
    <Card sx={{ minWidth: 350, marginTop: 4 }} elevation={10}>
      <CardContent>
        <Typography
          align="center"
          gutterBottom
          sx={{ fontSize: 32 }}
          color="text.primary"
        >
          {todo?.name}
        </Typography>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todo?.items?.map((subItem, index) => {
                  return (
                    <Draggable
                      index={index}
                      key={subItem?.id}
                      draggableId={subItem?.id}
                    >
                      {(provided) => (
                        <Grid
                          container
                          alignItems="center"
                          style={{ marginTop: 8 }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                            <Typography
                              gutterBottom
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                            >
                              {subItem?.name}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            onClick={() => handleEditItem(subItem)}
                            style={{ marginLeft: "auto", marginRight: 8 }}
                          >
                            <EditOutlinedIcon color="primary" />
                          </Grid>
                          <Grid item onClick={() => handleRemoveItem(subItem)}>
                            <ClearOutlinedIcon color="error" />
                          </Grid>
                        </Grid>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>

      <CardActions style={{ justifyContent: "space-between" }}>
        <Tooltip title="Adicionar item" arrow>
          <Button
            size="small"
            color="success"
            onClick={handleCreateItem}
            variant="contained"
          >
            <AddCircleOutlineOutlinedIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Editar título" arrow>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleEditTodo}
          >
            <EditOutlinedIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Compartilhar" arrow>
          <Button
            size="small"
            color="warning"
            variant="contained"
            href={`mailto:?subject=Convite%20para%20colaborar&body=Acesse:%20${window.location.href}`}
          >
            <ShareOutlinedIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Remover To Do" arrow>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleRemoveTodo}
          >
            <DeleteOutlinedIcon />
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
