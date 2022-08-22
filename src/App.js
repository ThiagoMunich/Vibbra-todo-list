import { useEffect } from "react"

import Typography from "@mui/material/Typography"

import useList from "./hooks/useList"
import Header from "./components/Header"
import HowToUse from "./components/HowToUse"
import { getAllTodos } from "./services/api"

function App() {
  const { setList } = useList()

  const requestListOfTodos = async () => {
    let response = await getAllTodos()

    setList(response.data)
  }

  useEffect(() => {
    requestListOfTodos()
  }, [])

  return (
    <>
      <Header />

      <Typography
        variant="h4"
        align="center"
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        Como funciona o app?
      </Typography>

      <HowToUse />
    </>
  )
}

export default App
