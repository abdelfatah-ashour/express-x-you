import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import FormControl from '../components/Create-Register-Control';
import axios from '../utilities/axios';
import { AuthStore } from '../context-api/Auth.context';
import { loginValidate } from '../utilities/register-validation';
import { useRouter } from 'next/router';
import { ToastSuccess, ToastError, ToastWarning } from '../utilities/Toaster';
import { set } from 'js-cookie';
import Style from '../styles/Register.module.css';

export default function login() {
    const Router = useRouter();

    const { Auth, setAuth } = useContext(AuthStore);

    const [user, setUser] = useState({
        email: null,
        password: null,
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        await loginValidate(user)
            .then(async () => {
                await axios.post('/api/auth/login', user).then(resp => {
                    setAuth({ ...Auth, isAuth: true });
                    console.log('HEADERS : ', { ...resp.headers });
                    console.log('RESPONSE : ', { ...resp });
                    if (resp.data.message.user.role === 0) {
                        set('auth', resp.headers.authorization, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'none',
                            maxAge: 1 * 24 * 60 * 60,
                            path: '/',
                        });

                        set('pi', resp.data.message.user, {
                            secure: false,
                            path: '/',
                            sameSite: 'strict',
                            expires: 1,
                        });
                    }

                    if (resp.data.message.user.role === 1) {
                        set('admin', resp.headers.authorization, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'none',
                            maxAge: 1 * 24 * 60 * 60,
                            path: '/',
                        });

                        set('pi', resp.data.message.user, {
                            secure: false,
                            path: '/',
                            sameSite: 'strict',
                            expires: 1 / 24, // one hour
                        });
                    }
                    ToastSuccess(resp.data.message.msg);
                    setTimeout(() => {
                        Router.back();
                    }, 1000);
                });
            })
            .catch(error => {
                console.log(error);
                if (!error.response) {
                    ToastWarning('🥱 something went wrong!');
                } else {
                    ToastError('☢ ' + error.response.data.message);
                }
            });
    };

    const emailProps = {
        type: 'email',
        name: 'email',
        id: 'idForEmail',
        label: 'email address',
        handleChange,
        placeholder: 'Email Address',
    };

    const passwordProps = {
        type: 'password',
        name: 'password',
        id: 'idForPassword',
        label: 'password',
        handleChange,
        placeholder: 'Password',
    };

    return (
        <Layout
            title="Login"
            description="register now to access more resources and can make more transaction with more one">
            <div className={Style.form}>
                <div className="col-12 d-flex flex-column justify-content-evenly align-items-center">
                    <h3 className="text-center my-3 p-2">🔐 Login</h3>
                    <FormControl {...emailProps} />
                    <FormControl {...passwordProps} />
                    <div className="d-flex w-75 my-2">
                        <button
                            className="btn btn-dark w-100 mx-auto p-2"
                            onClick={handleSubmit}>
                            submit
                        </button>
                    </div>
                    <div className="text-center my-2 py-2">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        you don't have account ?{' '}
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideRender(ctx) {
    if (ctx.req.cookies.auth) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}
