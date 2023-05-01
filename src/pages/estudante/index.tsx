import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import nookies from 'nookies';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';
import User from '../../assets/man.svg';
import Logo from '../../assets/uniLuanda.png';
import ThemeToggler from '../../components/ThemeToggle';
import { api } from '../../service/api';
import { wrapper } from '../../store/store';
import { IDocente } from '../admin/professores';

type EstudanteType = {
    nomeEstudante: string;
    emailEstudante: string
}

type EstudanteProps = {
    docentes: IDocente[]
    estudante: EstudanteType
}

const estudanteAvaliacao: NextPage<EstudanteProps> = ({ docentes }: EstudanteProps) => {

    let [searchDocente, setSearchDocente] = useState("")
    const { USER_LOGGED_CAD } = nookies.get(null)
    const user = USER_LOGGED_CAD ? JSON.parse(USER_LOGGED_CAD) : null;

    const filteredDocente = searchDocente ? docentes?.filter((docente) => docente.nome_docente?.toLowerCase().includes(searchDocente.toLowerCase())) : []


    return (
        <>

            <header className="w-full h-56 bg-azul dark:bg-gray-800  dark:border-gray-700 px-8 transition-all duration-300 ">


                {/**Primeira linha, onde estará o logo e o  ícone*/}
                <div className="flex items-center justify-between">
                    <Image src={Logo} height={100} width={100} objectFit={"contain"} />
                    <div className="flex space-x-4 items-center">

                        <ThemeToggler />
                    </div>
                </div>
            </header>
            <main className='px-8 flex gap-8 -mt-10'>
                <Head>
                    <title>Dashboard | Sistema de avaliação de docentes</title>
                </Head>
                {/**
                 * Sidebar
                 */}
                <div className='hidden lg:flex lg:flex-col h-min w-80  border border-gray-200 shadow bg-white dark:bg-gray-200
         px-4 py-6 rounded-3xl -mt-16 space-y-6 transition-all duration-300 mb-4'>
                    <div className='flex flex-col items-center space-y-3 border-b border-gray-300 pb-4'>
                        <Image src={User} height={100} width={100} objectFit={'contain'} />
                        <div className='space-y-2 text-center'>
                            <h2 className='font-bold text-base'>Sr. {user?.name}</h2>
                            <span className='text-gray-500'> {user?.email}</span>
                        </div>
                    </div>

                    <div className="padding-link-header animacao-link ">
                        <MdOutlineLogout className="h-4 w-h-4" />
                        <Link href={'/'} className='text-icone'>
                            <span className='text-icone text-blue-700 cursor-pointer'> Encerrar</span>
                        </Link>
                    </div>
                </div>

                {/**
                 * Fim SideBar
                 */}
                <div className='flex-1'>
                    <div className='flex flex-col gap-4 bg-white dark:bg-gray-300 rounded-3xl' >


                        <div className='rounded-3xl px-6 py-4 shadow bg-white dark:bg-gray-200 '>
                            <header className="px-5 py-4 border-b border-gray-100 w-full">
                                <div className="font-semibold text-gray-800 rounded-full 
                        bg-gray-50  flex items-center px-4 gap-4  w-full">
                                    <label htmlFor="search">
                                        <FaSearch className='h-6 w-6 text-gray-400' />
                                    </label>
                                    <input
                                        onChange={(e) => setSearchDocente(e.target.value)}
                                        type="search"
                                        id='search'
                                        className='bg-gray-50 dark:bg-white w-full
                                border-none rounded-full text-gray-400 focus:border-none focus:ring-0' />
                                </div>
                            </header>
                            < >
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 dark:bg-gray-200">

                                        <tr>
                                            <th></th>
                                            <th className="p-2 font-semibold text-left">
                                                Lista dos meus professores
                                            </th>

                                        </tr>


                                    </thead>

                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {/**               <!-- record 1 --> */}
                                        {

                                            !filteredDocente?.length ?

                                                docentes?.map((docente, index) => (
                                                    <tr
                                                        onClick={() => Router.push(`estudante/${docente.id}`)}
                                                        key={index}
                                                        className=''>
                                                        <td className="p-2">
                                                            <input type="checkbox" className="w-5 h-5" value={docente.id}
                                                            />
                                                        </td>
                                                        <td className="p-2">
                                                            <span className="font-medium text-gray-800">
                                                                {docente.nome_docente}
                                                            </span>
                                                        </td>

                                                    </tr>

                                                ))
                                                : (
                                                    filteredDocente?.map((docente, index) => (
                                                        <tr
                                                            onClick={() => Router.push(`estudante/${docente.id}`)}
                                                            key={index}
                                                            className=''>
                                                            <td className="p-2">
                                                                <input type="checkbox" className="w-5 h-5" value={docente.id}
                                                                />
                                                            </td>
                                                            <td className="p-2">
                                                                <span className="font-medium text-gray-800">
                                                                    {docente.nome_docente}
                                                                </span>
                                                            </td>

                                                        </tr>
                                                    ))
                                                )
                                        }

                                    </tbody>
                                </table>
                            </>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(

    (store) =>
        async (context: GetServerSidePropsContext) => {

            const cookie = nookies.get(context);

            if (!cookie.USER_LOGGED_CAD)
                return { props: {}, redirect: { destination: '/', permanent: false } }

            /**
             *     const { USER_LOGGED_CAD: cookie2 } = nookies.get(null)
                const { user } = JSON.parse(cookie2)
                console.log(user);
                if (user.nivel_acesso_id !== 4)
                    return { props: {}, redirect: { destination: '/', permanent: false } }
    
             */


            try {

                const docentes = await api.get(`/docente`)

                return {
                    props: {
                        docentes: docentes.data,

                    },
                };
            } catch (error) {

                return {
                    props: {
                        docentes: null,

                    },
                };
            }

        }
);

export default estudanteAvaliacao;