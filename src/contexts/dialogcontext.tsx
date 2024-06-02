'use client'
import { childrenType } from "@/types/commonTypes";
import { createContext } from "react";




export const dialogcontext = createContext<string | null>(null)

const DialogContextProvider = ({ children }: childrenType) => {

  const hola = "hola"

  return (
    < dialogcontext.Provider value={
      hola
    }>
      {children}
    </ dialogcontext.Provider >
  )

}
export default DialogContextProvider;