import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '~/hooks/useAuth';

interface Inputs {
    email: string;
    password: string;
}

function Login() {
    const [login, setLogin] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const { signUp, signIn } = useAuth();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if (login) {
            await signIn(email, password);
        } else {
            await signUp(email, password);
        }
    };

    return (
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* background */}
            <Image
                src="/images/netflix-bg.jpg"
                layout="fill"
                className="-z-10 !hidden opacity-60 sm:!inline"
                objectFit="cover"
            />
            {/* logo  */}
            <img
                src="/images/Netflix_2015_logo.svg"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={150}
                height={150}
            />
            {/* login form  */}
            <form
                className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* form title  */}
                <h1 className="text-4xl font-semibold"> Sign In </h1>
                {/* form container  */}
                <div className="space-y-4">
                    <label className="inline-block w-full">
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                This field is required
                            </p>
                        )}
                    </label>
                    <label className="inline-block w-full">
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Your password must contain between 4 and 60
                                characters.
                            </p>
                        )}
                    </label>
                </div>

                <button
                    className="w-full rounded bg-[#E50914] py-3 font-semibold"
                    type="submit"
                    onClick={() => setLogin(true)}
                >
                    Sign In
                </button>

                <div className="text-[gray]">
                    New to Netflix?{' '}
                    <button
                        className="cursor-pointer text-white hover:underline"
                        type="submit"
                        onClick={() => setLogin(false)}
                    >
                        Sign up now
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
