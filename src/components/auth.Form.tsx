'use client'
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import AuthFormBtn from "./authFormBtn";
import AuthFormToggle from "./authFormToggle";



const AuthForm = ({ actionType }: { actionType: string }) => {

    const { register, trigger, getValues } = useForm()

    const submit = async () => {
        const val = await trigger()
        if (!val) {
            console.log("form not triggerd. trigger value -->", val);

        }
        const data = getValues()
        console.log(data);

    }

    return (
        <div className="grid gap-4 py-6">
            <form action={submit} >

                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" type="email" autoComplete="true"{...register("email")} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter your password" type="password" autoComplete="true" {...register("password")} />
                </div>

                {actionType.includes("up") &&
                    <div className="space-y-1">
                        <Label htmlFor="Confirm password">Confirm password</Label>
                        <Input id="Confirm-password" placeholder="Confirm-password" type="password"  {...register("Confirm-password")} autoComplete="true" />
                    </div>}
                <AuthFormBtn actionType={actionType} />
                <AuthFormToggle actionType={actionType} href={href} />

            </form>
        </div>
    )
};

export default AuthForm;
