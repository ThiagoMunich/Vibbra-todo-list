import Swal from "sweetalert2"

import {
  editTodo,
  removeTodo,
  editItemByTodoId,
  createItemByTodoId,
  removeItemByTodoId,
} from "../services/api"

/**
 * @function swalCreateItem
 * modal to create a new todo's item
 * @param todo
 * to do that will receive new item
 */
export const swalCreateItem = async (todo) => {
  await Swal.fire({
    title: "Qual subtarefa quer adicionar?",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Adicionar",
    preConfirm: async (text) => {
      let response = await createItemByTodoId(todo?.id, text)

      return response
    },
    allowOutsideClick: () => !Swal.isLoading(),
    backdrop: true,
  })
}

/**
 * @function swalEditItem
 * modal to edit a todo's item
 * @param todo
 * to do that's being edited
 * @param subItem
 * item that's being edited
 */
export const swalEditItem = async (todo, subItem) => {
  await Swal.fire({
    title: `Alterando a subtarefa "${subItem?.name}"`,
    text: "Digite o novo nome",
    input: "text",
    inputAttributes: {
      required: "true",
      autocapitalize: "off",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Salvar",
    preConfirm: async (editedName) => {
      let response = await editItemByTodoId(todo?.id, subItem?.id, editedName)

      return response
    },
    backdrop: true,
    allowOutsideClick: () => !Swal.isLoading(),
  })
}

/**
 * @function swalRemoveItem
 * modal to remove a todo's item
 * @param todo
 * to do that's having item removed
 * @param subItem
 * item that's being edited
 */
export const swalRemoveItem = async (todo, subItem) => {
  await Swal.fire({
    icon: "warning",
    title: `Quer mesmo remover a subtarefa "${subItem?.name}" ?`,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Remover",
    preConfirm: async () => {
      let response = await removeItemByTodoId(todo?.id, subItem?.id)

      return response
    },
  })
}

/**
 * @function swalEditTodo
 * modal to edit a todo name
 * @param todo
 * to do that's being edited
 */
export const swalEditTodo = async (todo) => {
  await Swal.fire({
    title: `Alterando a tarefa "${todo?.name}"`,
    text: "Digite o novo nome",
    input: "text",
    inputAttributes: {
      required: "true",
      autocapitalize: "off",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonText: "Salvar",
    cancelButtonText: "Cancelar",
    preConfirm: async (editedName) => {
      let response = await editTodo(todo?.id, editedName)

      return response
    },
    allowOutsideClick: () => !Swal.isLoading(),
    backdrop: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        confirmButtonText: "Ok, entendi",
        title: `A tarefa "${todo?.name}" foi renomeada para "${result.value.data.name}"`,
      })
    }
  })
}

/**
 * @function swalRemoveTodo
 * modal to remove a todo and all its items
 * @param todo
 * to do that's being removed
 */
export const swalRemoveTodo = async (todo) => {
  await Swal.fire({
    icon: "warning",
    title: `ATENÇÃO`,
    text: `A tarefa "${todo?.name}" e todas as suas subtarefas serão removidas após a confirmação.`,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
    preConfirm: async () => {
      await Promise.all(
        todo?.items?.map(async (item) => {
          await removeItemByTodoId(todo?.id, item?.id)
        })
      )

      let response = await removeTodo(todo?.id)

      return response
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        confirmButtonText: "Ok, entendi",
        title: `A tarefa "${result.value.data.name}" foi removida!`,
        allowOutsideClick: false,
      }).then(() => {
        window.location.href = "/"
      })
    } else {
      return
    }
  })
}
