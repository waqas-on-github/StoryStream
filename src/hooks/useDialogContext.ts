"use client";

import { dialogcontext } from "@/contexts/dialogcontext";
import { useContext } from "react";

export const useDialogContext = () => {
  const dialogContextValue = useContext(dialogcontext);
  return dialogContextValue;
};
