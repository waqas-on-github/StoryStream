"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { getProfileByUserId, uploadImage } from "@/lib/server_utils";

type profileUpdateData = {
    id: string, username: string, profilePic?: string
}


export async function updateProfile(formData: FormData) {

    const { user } = await CheckAuth();
    const userProfile = await getProfileByUserId(user.id)
    const profilePic = formData.get("file") as File;
    const username = formData.get("username") as string;



    try {
        let url
        // if user already have profile pic & he dont wanna update profile pic 
        if (!userProfile.data?.profilePic) {
            url = await uploadImage(profilePic);
        }

        if (user.id && userProfile.data?.id) {
            // if user have did'nt provide new profile pic update just other fileds 
            let data: profileUpdateData = {
                id: userProfile.data.id,
                username: username,

            }

            if (url) {  // so it means user provided profile pic so update proifle pic also
                data = {
                    ...data,
                    profilePic: url
                }
            }

            const updatedProfile = await prisma.profile.update({
                where: { id: userProfile.data.id },
                data: {
                    ...data
                },
            });

            revalidatePath('/profile', 'page')
            return { success: true, data: updatedProfile }
        }
    }
    catch (error) {
        return {
            success: false,
            error: { message: "filed to update profile:) " },
        };
    }
}



