import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext } from 'next/types';
import nookies from 'nookies';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiLogin } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import LOGO from '../assets/uniLuanda.png';
import { api } from '../service/api';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })
//import emailjs from '@emailjs/browser';
import emailjs from '@emailjs/browser';
import loadImage from '../assets/load.gif';


interface AuthState {
    email: string;
    senha: string;
}

const RecuperarSenha: NextPage = () => {

    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [load, setLoad] = useState(false)
    const route = useRouter()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<AuthState>({ mode: 'onChange' });
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [messageAlert, setShowMessage] = useState("Enviamos um e-mail com as suas credenciais actuais!")

    const handleLogin: SubmitHandler<AuthState> = async (data) => {


        setLoad(true)
        try {
            const email = data.email.trim()

            const response = await api.get(`/login/${email}`)

            if (response.status === 200) {
                setShowSuccessAlert(true)
                const EmailJSResponseStatus = await sendEmail(data.email, response.data.name, response.data.password)
                if (!EmailJSResponseStatus) {
                    setShowMessage("Não conseguimos estabelecer uma ligação estável com o seu e-mail. Por favor, contacte o administrador do sistema.")
                    setShowErrorAlert(true)
                    return
                }

                setShowSuccessAlert(true)

            }

        } catch (error: any) {
            setLoad(false)
            setShowMessage(error.message)
            setShowErrorAlert(true)
        }

        setLoad(false)
    }
    const sendEmail = async (email: string, nomeDocente: string, password: string) => {

        try {
            //  const emailEnviado = await emailjs.send(process.env.SERVICE_EMAIL_ID!, process.env.TEMPLATE_EMAIL_ID!, {
            await emailjs.send('service_jl22liv', 'template_nsz3ckw', {
                clientEmail: email,
                clientName: nomeDocente,
                password,
                from_name: 'SIADD'
            }, 'syQAvsoXyX3dJEy-D')

            return true

        } catch (error) {

            return false
        }
    };

    return (
        <>
            <SweetAlert2
                backdrop={true}
                show={showSuccessAlert}
                title='Sucesso'
                text={messageAlert}
                onConfirm={() => { setShowSuccessAlert(false) }}
                icon='success'
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                confirmButtonColor="#4051ef"
            />

            <SweetAlert2
                backdrop={true}
                show={showErrorAlert}
                title='Erro inesperado'
                text={messageAlert}
                icon='error'
                onConfirm={() => setShowErrorAlert(false)}
                didClose={() => setShowErrorAlert(false)}
                didDestroy={() => setShowErrorAlert(false)}
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                confirmButtonColor="#4051ef"

            />
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col justify-center items-center gap-4 px-4 lg:px-0">
                <Head>
                    <title>RECUPERAR A SENHA | SISTEMA DE AVALIAÇÃO DE DESEMPENHO DOCENTE</title>
                </Head>
                <Image
                    src={LOGO}
                    alt='Logo da Uniluanda'
                    className=''
                    height={190}
                    width={200} />
                <h1 className='text-3xl font-light '>SIADD - RECUPERAR SENHA</h1>

                <div className='flex flex-col gap-4  w-full lg:w-2/6' >
                    <div className='font-bold px-4 py-2 border-2 border-red-600 text-red-400 rounded-lg shadow'>
                        <p>Digite o seu e-mail de acesso, para enviarmos-lhe as suas credenciais.</p>
                    </div>
                    <div className='flex items-center gap-2 text-base '>
                        <MdEmail />
                        <label htmlFor="email">Email</label>
                    </div>
                    <input
                        {...register("email")}
                        className='rounded-lg w-full'
                        type="email"
                        name="email"
                        id='email'
                        placeholder='Informe seu e-mail'
                    />
                </div>

                <div className='flex flex-col gap-4  w-full lg:w-2/6 my-4' >
                    <button
                        type='submit'
                        className='bg-azul w-full text-white font-bold py-2 rounded-lg
           text-lg bg-gradient-to-tl to-blue-800 from-azul hover:brightness-75 flex  items-center justify-center gap-2'
                    >
                        {
                            load ? (<>
                                <Image
                                    src={loadImage}
                                    className="h-5 w-5"
                                    height={20}
                                    width={20} />
                                <span>Processando...</span>
                            </>
                            ) : (
                                <>
                                    <HiLogin /> Recuperar
                                </>
                            )
                        }
                    </button>
                </div>

            </form>
        </>
    )
}
export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    nookies.destroy(context, 'USER_LOGGED_CAD')

    // If no user, redirect to index.
    return { props: {} }

}

export default RecuperarSenha
