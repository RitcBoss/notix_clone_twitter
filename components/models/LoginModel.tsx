import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast"; // เพิ่ม toast

import Input from "../Input";
import Model from "../Model";

import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";
import { useRouter } from "next/router";


const LoginModel = () => {
    const loginModel = useLoginModel();
    const registerModel = useRegisterModel();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModel.onOpen();
        loginModel.onClose();
    }, [isLoading, registerModel, loginModel])


    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const result = await signIn('credentials', {
                email,
                password,
                redirect: false 
            });

            if (result?.error) {
                toast.error('Invalid username or password'); 
            } else {
                loginModel.onClose();
                router.push('/')
                toast.success('Success Account')

            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModel, email, password, router])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )
    const footerContent = (
        <div className=" text-neutral-400 text-center mt-4">
            <p>First time using X?
                <span
                    onClick={onToggle}
                    className="
                    text-white
                    cursor-pointer
                    hover:underline
                    "
                >
                    Create an account
                </span>
            </p>
        </div>
    )

    return (
        <Model
            disabled={isLoading}
            isOpen={loginModel.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={loginModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModel;