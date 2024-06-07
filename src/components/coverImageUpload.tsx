import { useForm } from "react-hook-form"

const CoverImageUpload = () => {
    const { register, getValues, trigger } = useForm()
    return (
        <form  >
            <input
                className="flex h-10 w-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium  disabled:cursor-not-allowed disabled:opacity-50 bg-slate-700"
                type="file"
                id=""
                placeholder="Add cover image "
                about="add cover image"
                {...register('featureImage')}

            />


        </form>
    )
}

export default CoverImageUpload