import { Link } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import { makeStyles } from "@material-ui/styles"

import Header from "../components/Header"

const useStyles = makeStyles({
  image: {
    opacity: 0.8,
    maxHeight: 400,
    maxWidth: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
})

export default function About() {
  const classes = useStyles()

  return (
    <>
      <Header />
      <Grid
        container
        justifyContent="center"
        direction="column"
        style={{ padding: 24 }}
      >
        <Typography variant="h6" color="initial">
          O app To Do List veio pra facilitar a maneira que as pessoas
          compartilham as tarefas do dia a dia! É possível criar, editar,
          excluir, e até mesmo compartilhar cartões de tarefas de maneira
          simples e eficaz. Quer entender como funciona?{" "}
          <Link to="/">Clique aqui!</Link>
        </Typography>

        <img
          alt="Create todo"
          className={classes.image}
          src="/assets/images/aboutImage.png"
        />
      </Grid>
    </>
  )
}
