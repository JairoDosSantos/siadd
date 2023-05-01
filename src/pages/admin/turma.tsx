import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';
import { generalType } from './eleger_membros_cad';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaGraduationCap, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { useQuery } from 'react-query';
import LoadImage from '../../assets/load.gif';
import Pagination from '../../components/Pagination';
import { api } from '../../service/api';

const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

const Turma: NextPage = () => {

    let [load, setLoad] = useState(false)
    let [searchGeneral, setsearchGeneral] = useState("")
    let route = useRouter()
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    const [requisicaoAPI, setRequisicaoAPI] = useState("turma")

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<generalType>();

    const getAllGeneral = async () => {

        try {

            const response = await api.get(`${requisicaoAPI}/`)

            return response.data as generalType[]

        } catch (error) {
            console.log(error);
        }

    }



    const { data, isLoading, error } = useQuery("fetchGeneral", getAllGeneral, { cacheTime: 100 })

    const filteredGeneral = searchGeneral ? data?.filter((departamento) => departamento.descricao.toLowerCase().includes(searchGeneral.toLowerCase())) : []


    const handleSubmitDelete: SubmitHandler<generalType> = async (dados) => {

        setLoad(true)
        try {

            const response = await api.delete(`${requisicaoAPI}/`, { data: dados.id })
            if (response.status === 200) {
                setShowSuccessAlert(true)
            }

        } catch (error) {
            console.log(error);
            setShowErrorAlert(true)
            setLoad(false)
        }
        setLoad(false)
    }

    const handleSubmitCreate: SubmitHandler<generalType> = async (dados) => {

        setLoad(true)

        try {

            const response = await api.post(`${requisicaoAPI}/`, {
                descricao: dados.descricao
            })
            if (response.status === 201) {
                setShowSuccessAlert(true)
            }

        } catch (error: any) {
            console.log(error);

            setShowErrorAlert(true)
            setLoad(false)
        }
        setLoad(false)
    }

    return (
        <>

            <HeaderAdmin />
            <main className='px-8 flex gap-8 -mt-10'>
                <SweetAlert2
                    backdrop={true}
                    show={showSuccessAlert}
                    title='Sucesso'
                    text='Novo curso adicionado com sucesso!'
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
                    title='Erro'
                    text='Ocorreu um erro ao efectuar a operação. Por favor, contacte o administrador do Sistema!'
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
                <Head>
                    <title>GERIR TURMA | Sistema de avaliação de desempenho de docentes</title>
                </Head>

                <div className='flex-1'>
                    <div className="container lg:px-5 py-16 mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 lg:justify-between lg:w-full items-center justify-center gap-4  mb-6 relative mx-auto">
                            <button
                                onClick={() => route.push('/admin/estudante_turma')}
                                className='px-4 py-2 bg-azul text-white font-semibold hover:brightness-75 animacao-link'>Associar turma a um estudante</button>

                            <div className="flex flex-col items-center justify-center gap-4 lg:max-w-fit mb-6 relative mx-auto">

                                <h2 className="font-bold text-center text-xl flex items-center gap-2">
                                    <FaGraduationCap className='text-2xl' /><span >Os cursos do INSTIC</span></h2>

                                {
                                    (isLoading || load) ? (<>
                                        <Image src={LoadImage} height={25} width={20} />
                                        <span>Aguarde o processamento...</span>
                                    </>) : (
                                        <>

                                        </>
                                    )

                                }
                            </div>
                            <button
                                onClick={() => route.push('/admin/docente_turma')}

                                className='px-4 py-2 bg-dourado text-white font-semibold hover:brightness-75 animacao-link'>Associar turma a um docente</button>

                        </div>
                        <form
                            onSubmit={handleSubmit(handleSubmitCreate)}
                            className='flex flex-col  gap-2 mx-auto mb-8 shadow-md bg-white max-w-lg p-10 rounded-md'>
                            <label
                                className='text-lg font-bold flex items-center gap-4'
                                htmlFor="departamento "><FaPlus /> <span>Criar novo {requisicaoAPI}</span></label>
                            <select
                                onChange={(event) => setRequisicaoAPI(event.target.value)}
                                className='rounded-md shadow text-gray-700 font-semibold'
                                id="">
                                <option value="turma">Turma</option>
                                <option value="anoLectivo">Ano lectivo</option>
                                <option value="semestre">Semestre</option>
                            </select>

                            <label
                                className='text-lg font-bold flex items-center gap-4 mt-2'
                                htmlFor="departamento ">Descrição</label>
                            <input
                                id='departamento'
                                {...register('descricao', { required: true })}
                                type="text"
                                className='rounded-md shadow text-gray-700 font-semibold'
                            />
                            <button
                                disabled={load}
                                type='submit'
                                className='bg-azul text-white px-4 py-2 rounded font-bold hover:brightness-75 disabled:cursor-not-allowed'>
                                Salvar</button>

                        </form>
                        <div className="flex lg:max-w-4xl w-full justify-center lg:mx-auto  text-center">
                            <div className='rounded px-6 py-4 shadow bg-white dark:bg-gray-200 w-full '>
                                <header className="px-5 py-4 border-b border-gray-100 w-full">
                                    <div className="font-semibold text-gray-800 rounded-full 
                        bg-gray-50  flex items-center px-4 gap-4  w-full">
                                        <label htmlFor="search">
                                            <FaSearch className='h-6 w-6 text-gray-400' />
                                        </label>
                                        <input
                                            onChange={(e) => setsearchGeneral(e.target.value)}
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
                                                    DESCRIÇÃO
                                                </th>
                                                <th className="p-2 font-semibold text-right">
                                                    ACÇÃO
                                                </th>
                                            </tr>


                                        </thead>

                                        <tbody className="text-sm divide-y divide-gray-100">
                                            {/**               <!-- record 1 --> */}
                                            {

                                                !searchGeneral?.length ?

                                                    data?.map((generalType, index) => (
                                                        <tr

                                                            key={index}
                                                            className='hover:brightness-75'>
                                                            <td className="p-2">
                                                                <input type="checkbox" className="w-5 h-5" value={generalType.id}
                                                                />
                                                            </td>
                                                            <td className="p-2 text-start">
                                                                <span className="font-medium text-gray-800">
                                                                    {generalType.descricao}
                                                                </span>
                                                            </td>
                                                            <td className="p-2 ">
                                                                <form
                                                                    onSubmit={handleSubmit(handleSubmitDelete)}
                                                                    className="flex justify-end ">
                                                                    <input
                                                                        defaultValue={generalType.id}
                                                                        type="hidden"
                                                                        {...register("id")} />
                                                                    <button
                                                                        type='submit'
                                                                        title='Eliminar'
                                                                        className=' rounded-full   animacao-link over:brightness-75 mr-1'>
                                                                        <FaTrash className='text-lg  font-bold h text-gray-800 ' />
                                                                    </button>
                                                                </form>
                                                            </td>

                                                        </tr>

                                                    ))
                                                    : (
                                                        filteredGeneral?.map((generalType, index) => (
                                                            <tr
                                                                key={index}
                                                                className=''>
                                                                <td className="p-2">
                                                                    <input type="checkbox" className="w-5 h-5" value={generalType.id}
                                                                    />
                                                                </td>
                                                                <td className="p-2 flex flex-col items-start text-start">
                                                                    <span className="font-medium text-gray-800">
                                                                        {generalType.descricao}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <form
                                                                        onSubmit={handleSubmit(handleSubmitDelete)}
                                                                        className="flex justify-end ">
                                                                        <input
                                                                            defaultValue={generalType.id}
                                                                            type="hidden"
                                                                            {...register("id")} />
                                                                        <button
                                                                            type='submit'
                                                                            title='Eliminar departamento'
                                                                            className=' rounded-full   animacao-link over:brightness-75 mr-1'>
                                                                            <FaTrash className='text-lg  font-bold h text-gray-800 ' />
                                                                        </button>
                                                                    </form>
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
                        <Pagination />
                    </div>

                </div>
            </main>

        </>
    );
}

export default Turma;