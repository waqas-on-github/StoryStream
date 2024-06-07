'use client'
import { useForm } from "react-hook-form"
import TextEditor from "./tipTap"
import { Input } from "./ui/input"
import { Button } from "./ui/button"


const WriteForm = () => {

    const { register, getValues, trigger } = useForm()



    const submit = async () => {
        const val = await trigger()
        if (!val) {
            console.log("form not triggerd. trigger value -->", val);
            return

        }
        // get input values 
        const inputValues = getValues()  //these value are viladated buy zod 
        console.log(inputValues);


    }

    return (
        <div className=' w-[80%] md:w-[70%] bg-[#171717]  p-[20px] mt-10 ' >
            <form action={submit} className="flex gap-4 flex-col justify-center " >
                <div>


                </div>
                <Input
                    className="bg-[#171717] border-none focus-none   placeholder:text-[#adb5bd] text-white "
                    type="text"
                    {...register("title")}
                    placeholder="NEW POST TITLE HERE... " />

                {/* <TextEditor /> */}

                <Button type="submit" >publish</Button>
            </form>
        </div>
    )
}

export default WriteForm