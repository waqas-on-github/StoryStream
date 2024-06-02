'use client'
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import AuthFormBtn from "./authFormBtn";
import AuthFormToggle from "./authFormToggle";
import { authType } from "@/types/authType";
import { loginSchema, signupSchema, userType } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { sanitizeInput } from "@/helpers/inputSanitizors";
import { useSignUp } from "@/hooks/useSignup";
import { useSignin } from "@/hooks/useSignin";
import { useRouter } from "next/navigation";


const AuthForm = ({ actionType, href }: authType) => {

    let validSchema;
    if (actionType === "signup") {
        validSchema = signupSchema
    } else {
        validSchema = loginSchema
    }

    const router = useRouter()

    const { register, trigger, getValues, reset, formState: { errors } }
        = useForm<userType>({ resolver: zodResolver(validSchema) }  // just adding this will do binding RHF and Zod  and input validation 
        )

    const { mutate, isPending, } = useSignUp()
    const { mutate: signInMutate } = useSignin()



    const submit = async () => {
        // trigger a userform to get values 
        const val = await trigger()
        if (!val) {
            console.log("form not triggerd. trigger value -->", val);
            return

        }
        // get input values 
        const inputValues = getValues()  //these value are viladated buy zod 

        // sanitize inputs to prevet xss or other scripting attacks
        // const sanitizedInput = sanitizeInput(inputValues);

        //submit data to backend 
        if (actionType === 'signup') {
            mutate(inputValues, {
                onSuccess: (data) => {
                    if (data?.success) {
                        reset()
                        router.push("/")
                    }

                }
            })
        }

        if (actionType === "signin") {
            signInMutate(inputValues, {
                onSuccess: (data) => {
                    if (data?.success) {
                        reset()
                        router.push("/")


                    }
                }
            })

        }
    }

    return (

        <div className="grid gap-4 py-6 ">
            <form action={submit} >

                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" type="email" autoComplete="true"{...register("email")} />
                    {errors?.email && <span className="text-sm text-red-400">{errors?.email?.message}</span>}

                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter your password" type="password" autoComplete="true" {...register("password")} />
                    {errors?.password && <span className="text-sm text-red-400">{errors?.password?.message}</span>}
                </div>

                {actionType.includes("up") &&
                    <div className="space-y-1">
                        <Label htmlFor="Confirm password">Confirm password</Label>
                        <Input id="Confirm-password" placeholder="Confirm-password" type="password"  {...register("confirmPassword")} autoComplete="true" />
                        {errors?.confirmPassword && <span className="text-sm text-red-400">{errors?.confirmPassword?.message}</span>}

                    </div>}
                <div className="border-red-950">
                    <AuthFormBtn actionType={actionType} />
                </div>
                <AuthFormToggle actionType={actionType} href={href} />

            </form>
        </div>

    )
};

export default AuthForm;
