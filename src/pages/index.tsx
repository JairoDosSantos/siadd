import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext } from 'next/types';
import nookies from 'nookies';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiLockOpen, HiLogin } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import LOGO from '../assets/uniLuanda.png';
import { api } from '../service/api';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

import Link from 'next/link';
import loadImage from '../assets/load.gif';


interface AuthState {
  email: string;
  senha: string;
}

const Home: NextPage = () => {

  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [messageError, setMessageError] = useState("Você tem autorização para se autenticar no sistema? se sim, verifique se está colocando as credenciais correctas. Caso contrário, contacte o administrador do sistema.")
  const [load, setLoad] = useState(false)
  const route = useRouter()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<AuthState>({ mode: 'onChange' });
  let [titulo, setTitulo] = useState("Erro inesperado")
  const handleLogin: SubmitHandler<AuthState> = async (data) => {

    if (!data.email || !data.senha) {
      setTitulo("Campos não preenchidos.");
      setMessageError("A senha e o e-mail são necessários para acessar o SIADD.")
      setShowErrorAlert(true)
      return
    }

    setLoad(true)
    try {


      const response = await api.post("/login", {
        email: data.email,
        password: data.senha
      })

      if (response.status === 200) {

        nookies.set(null, 'USER_LOGGED_CAD', JSON.stringify(response.data.original.user))

        switch (response.data.original.user.nivel_acesso_id) {
          case 1:
            route.push('/admin')
            break;
          case 2:
            route.push("/dashboard")
            break;
          case 3:
            route.push("/dashboard")
            break;
          case 4:
            route.push("/estudante")
            break;

          default:
            route.push("/")
            break;
        }

      }

    } catch (error: any) {

      setLoad(false)
      setMessageError(error.message)
      setShowErrorAlert(true)

    }

    setLoad(false)
  }

  return (
    <>
      <SweetAlert2
        backdrop={true}
        show={showErrorAlert}
        title={titulo}
        text={messageError}
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
        className="flex flex-col justify-center items-center gap-4 px-4 lg:px-0 pt-10">
        <Head>
          <title>LOGIN | SISTEMA DE AVALIAÇÃO DE DOCENTE</title>
        </Head>
        <Image
          src={LOGO}
          alt='Logo da Uniluanda'
          className='mt-5'
          height={100}
          width={400} />
        <h1 className='text-4xl font-light mt-4'>Iniciar Sessão</h1>

        <div className='flex flex-col gap-4  w-full lg:w-2/6' >
          {
            /**
             * (errors.email || errors.senha) && (
              <div className='font-bold px-4 py-2 border-2 border-red-600 text-red-400 rounded-lg shadow text-center relative'>
                <p>A senha e o e-mail são necessários para acessar o sistema.</p>
              </div>
            )
             */
          }
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
        <div className='flex flex-col gap-4  w-full lg:w-2/6' >
          <div className='flex items-center justify-between text-base '>
            <div className='flex items-center gap-2 text-base '>
              <HiLockOpen />
              <label htmlFor="senha">Senha</label>
            </div>
            <div>
              <Link
                href={"/recuperar_senha"}>
                <span className='text-azul font-semibold underline underline-offset-2 cursor-pointer'>
                  Esqueceu a senha?
                </span>
              </Link>
            </div>
          </div>
          <input
            id='senha'
            {...register("senha")}
            className='rounded-lg w-full'
            type="password"
            placeholder='Informe sua senha'
          />
          <div className='flex gap-2 items-center justify-start mt-2'>
            <input
              type="checkbox"
              name="lembra-me"
              id="lembra-me"
              className='rounded'
            />
            <label
              htmlFor="lembra-me">Lembrar dados ?</label>
          </div>
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

                  <HiLogin /> Entrar
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

export default Home
