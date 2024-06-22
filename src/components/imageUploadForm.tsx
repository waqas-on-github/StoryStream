'use client';

import { useUploadfeatureImage } from '@/hooks/useAddFeatureImage';
import { LoaderIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

const ImageUploadForm = () => {

    const { mutate, isPending, data: imageUploadReult } = useUploadfeatureImage()
    const { register, trigger, getValues } = useForm();

    const uploadImage = async () => {
        console.log("image upload");

        const isTriggered = await trigger('featureImage');
        if (!isTriggered) {
            console.log("from triggered", isTriggered);
            return;
        }

        const data = getValues();
        const formData = new FormData()
        formData.append('featureImage', data?.featureImage[0])

        mutate((formData))





    };

    return (
        <form>
            {
                isPending ?
                    <LoaderIcon /> :

                    <input
                        type="file"
                        {...register('featureImage', {
                            onChange: async (e) => {
                                await uploadImage();
                            }
                        })}
                    />
            }
        </form>
    );
}

export default ImageUploadForm;
