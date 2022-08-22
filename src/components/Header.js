import { useState } from "react"

import { useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"

import useList from "../hooks/useList"
import ModalEditOrRemoveTodo from "./ModalEditOrRemoveTodo"

export default function Header() {
  const { list } = useList()

  const navigate = useNavigate()

  const [modal, setModal] = useState({
    edit: false,
    remove: false,
  })

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Button color="inherit" onClick={() => navigate("/criar")}>
              Criar
            </Button>

            <Button
              color="inherit"
              disabled={list?.length === 0}
              onClick={() => setModal({ ...modal, edit: true })}
            >
              Editar
            </Button>

            <Button
              color="inherit"
              disabled={list?.length === 0}
              onClick={() => setModal({ ...modal, remove: true })}
            >
              Excluir
            </Button>

            <Button color="inherit" onClick={() => navigate("/sobre")}>
              Sobre
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <ModalEditOrRemoveTodo
        modal={modal}
        open={modal.edit || modal.remove}
        close={() => setModal({ remove: false, edit: false })}
      />
    </>
  )
}
