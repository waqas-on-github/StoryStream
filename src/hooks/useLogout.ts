"use client";
import { logout } from "@/actions/logout";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogout = () => {
  console.log("useLogout hook initialized");

  const { mutate, isPending, data } = useMutation({
    mutationFn: logout,
    onMutate: () => {
      console.log("Logout mutation started");
    },
    onSuccess: () => {
      console.log("Logout successful");
      toast.message("logged out successfully");
    },
    onError: (error) => {
      console.error("Logout error", error);
      toast.message("something went wrong");
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
