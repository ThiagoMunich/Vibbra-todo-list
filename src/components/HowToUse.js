import Accordion from "@mui/material/Accordion"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined"

export default function HowToUse() {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <strong>É fácil criar tarefas</strong>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Basta clicar no botão <strong>CRIAR</strong> no menu azul acima.
            Você será redirecionado pra uma tela onde poderá inserir o nome da
            tarefa que deseja executar.
            <br />
            <br />
            Outra maneira de criar é digitando na barra de endereços do browser,
            por exemplo: você digita "estudar" no final da URL, nesse caso você
            será redirecionado para a tela de criação e o link público para essa
            tarefa será ".../estudar".
            <br />
            <br />
            Ahh, se você tiver uma tarefa com subtarefas e arrastar qualquer
            subtarefa pra fora do cartão, uma nova tarefa será automaticamente
            criada.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <strong>Editar é facil também?</strong>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            É super fácil! Clique em <strong>EDITAR</strong> pra ver todas as
            tarefas disponíveis para edição, clique no icone{" "}
            <EditOutlinedIcon color="primary" />
            da tarefa que quer editar para ser redirecionado.
            <br />
            <br />
            Se você não tiver nenhuma tarefa criada o botão{" "}
            <strong>EDITAR</strong> vai estar desabilitado.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <strong>Ok, e se eu quiser excluir?</strong>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            É normal mudar de ideia, caso você crie uma tarefa e queira
            excluí-la clique em <strong>EXCLUIR</strong> pra ver as tarefas que
            podem ser excluidas, depois, clique no icone{" "}
            <ClearOutlinedIcon color="error" /> da tarefa que quer excluir.
            <br />
            Uma nova janelinha será aberta perguntando se você tem certeza da
            exclusão, basta confirmar e a tarefa será excluída.
            <br />
            <br />
            Se você não tiver nenhuma tarefa criada o botão{" "}
            <strong>EXCLUIR</strong> vai estar desabilitado.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
