import React from "react"
import ReactDOM from "react-dom/client"

import "./App.css"

import Container from "@mui/material/Container"

import AppRoutes from "./routes"
import ListProvider from "./context/ListContext"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <ListProvider>
    <Container
      maxWidth="md"
      style={{
        padding: 0,
        borderRadius: 4,
        border: "4px solid",
        background: "#EFF2C0",
        minHeight: "calc(100vh - 16px)",
      }}
    >
      <AppRoutes />
    </Container>
  </ListProvider>
)
