import { useContext } from "react"
import { ListContext } from "../context/ListContext"

export default function useList() {
  return useContext(ListContext)
}
