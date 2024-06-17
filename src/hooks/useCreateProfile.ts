"use client";
import { createProfile } from "@/actions/createProfile";
import { updateProfile } from "@/actions/updateProfile";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setEditDialogState } from "@/featurs/profileSlice";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";

type inputsType = {
  profileId?: string | undefined;
  formData: FormData;
};

export const useCreateProfile = () => {
  const router = useRouter();

  // for knowing is this update or not
  const [isUpdate, setisUpdate] = useState(false);

  // for settign update dialog state
  const dispatch = useDispatch();
  const isEditDialogOpen = useSelector(
    (state: RootState) => state.profileState.isEditDialogOpen
  );

  const { mutate, isPending, data } = useMutation({
    mutationFn: async (inputs: inputsType) => {
      if (inputs.profileId) {
        setisUpdate(true);
        return await updateProfile(inputs.formData);
      }
      if (!inputs.profileId) {
        return await createProfile(inputs.formData);
      }
    },

    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        // if this is profile update then change state of the dialog
        !isUpdate && router.push("/profile");
        isUpdate && dispatch(setEditDialogState(!isEditDialogOpen));
        toast.message(`profile ${isUpdate ? "updated" : "created"} `);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.message(`failed to  ${isUpdate ? "update" : "create"} profile `);
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
