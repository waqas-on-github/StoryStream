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




const AddProfile = () => {


    const { register, trigger, getValues, formState: { errors }, reset } = useForm<profileData>({
        resolver: zodResolver(formSchema)
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

        mutate(formData)

        reset()

    }




    return (
        <form action={submit} >
            <Input type="text" {...register('username')} />
            {errors.username && <span className="text-red-800">{errors.username.message}</span>}
            <Input type="file" {...register('profilePic')} />

            {
                isPending ? (
                    <Button type="button" disabled aria-disabled>
                        <LoaderIcon />
                    </Button>
                ) : (
                    <Button type="submit">Upload</Button>
                )
            }
        </form>
    );
};

export default AddProfile;
