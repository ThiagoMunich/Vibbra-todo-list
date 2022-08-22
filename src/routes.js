import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from "./App"
import About from "./pages/About"
import useList from "./hooks/useList"
import EditTodo from "./pages/EditTodo"
import CreateTodo from "./pages/CreateTodo"

function AppRoutes() {
  const { list } = useList()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/" />

        <Route element={<About />} path="/sobre" />

        <Route element={<CreateTodo />} path="*" />

        <Route element={<CreateTodo />} path="/criar" />

        {list?.map((todo) => (
          <Route key={todo.id} path={todo?.permalink} element={<EditTodo />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
