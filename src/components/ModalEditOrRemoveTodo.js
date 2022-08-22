import { useNavigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import Typography from "@mui/material/Typography"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined"

import useList from "../hooks/useList"
import { swalRemoveTodo } from "./ManipulateItemByTodo"

/**
 * @function ModalEditOrRemoveTodo
 * used to show a modal that list todos to be edited or removed
 * @param open
 * boolean used to control show / hide of modal
 * @param close
 * function used to close the modal
 * @param modal
 * aditional param that tell if its a edit or a remove
 */
export default function ModalEditOrRemoveTodo({ open, close, modal }) {
  let { list } = useList()

  let navigate = useNavigate()

  /**
   * @function redirectToEdit
   * redirect user to page where a todo can be edited
   * @param todo
   * to do that will be edited
   */
  const redirectToEdit = (todo) => {
    setTimeout(close, 0)

    navigate(`/${todo?.permalink}`)
  }

  /**
   * @function removeAndRedirectToHomePage
   * remove a todo and redirect to root page
   * the redirect is necessary since after removal
   * to do won't be available anymore
   * @param todo
   * to do that will be removed
   */
  const removeAndRedirectToHomePage = async (todo) => {
    setTimeout(close, 0)

    await swalRemoveTodo(todo)
  }

  /**
   * @function modalTitle
   * used to show proper title to the modal
   * since it can be an edit or remove
   */
  const modalTitle = () => {
    if (modal?.edit) {
      return "Qual tarefa você quer editar?"
    } else if (modal?.remove) {
      return "Qual tarefa você quer remover?"
    } else {
      return "Fechando..."
    }
  }

  /**
   * @function modalActions
   * used to show proper elements within the modal
   * and to call the right endpoints
   * since the modal can be and edit or remove
   */
  const modalActions = (todo) => {
    if (modal?.edit) {
      return (
        <Grid
          container
          key={todo?.id}
          style={{ marginTop: 8 }}
          justifyContent="space-between"
        >
          <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
            <Typography>{todo?.name}</Typography>
          </Grid>

          <EditOutlinedIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => redirectToEdit(todo)}
          />
        </Grid>
      )
    } else if (modal?.remove) {
      return (
        <Grid
          container
          key={todo?.id}
          style={{ marginTop: 8 }}
          justifyContent="space-between"
        >
          <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
            <Typography>{todo?.name}</Typography>
          </Grid>

          <ClearOutlinedIcon
            color="error"
            style={{ cursor: "pointer" }}
            onClick={() => removeAndRedirectToHomePage(todo)}
          />
        </Grid>
      )
    }
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{modalTitle()}</DialogTitle>

      <DialogContent>
        {list?.map((todo) => {
          return modalActions(todo)
        })}
      </DialogContent>

      <Button
        onClick={close}
        color="error"
        variant="contained"
        style={{ borderRadius: 0 }}
      >
        Fechar
      </Button>
    </Dialog>
  )
}
