'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useCreateProfile } from '@/hooks/useCreateProfile';
import { profileData } from '@/types/commonTypes';
import { formSchema } from '@/schema/schmea';




const AddProfile = ({ username, profileId }: { profilePic?: string | null, username?: string; profileId?: string }) => {

    let createDefaultValue;
    if (username && profileId) {
        createDefaultValue = {
            username
        }
    }

    const { register, trigger, getValues, formState: { errors }, reset } = useForm<profileData>({
        resolver: zodResolver(formSchema),
        defaultValues: createDefaultValue
    });

    const { mutate, isPending } = useCreateProfile()


    const submit = async () => {
        const isTriggerd = await trigger()
        if (!isTriggerd) {
            console.log("from is not triggerd ", isTriggerd);

            return
        }

        const data = getValues()
        const formData = new FormData()
        formData.append('file', data?.profilePic[0])
        formData.append('username', data.username);

        mutate({ formData, profileId })

        reset()

    }



    return (
        <form action={submit} >
            <Input type="text" {...register('username')} />
            {errors.username && <span className="text-red-800">{errors.username.message}</span>}
            <Input type="file" {...register('profilePic')} />


            {
                <>

                    {
                        isPending ?
                            <Button> <LoaderIcon /> </Button> :
                            <Button type='submit' > {profileId ? "Update" : "Create"}  </Button>
                    }

                </>
            }


        </form>
    );
}

export default AddProfile
