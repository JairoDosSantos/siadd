import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck, FaSearch } from 'react-icons/fa';
import { FiBookOpen } from 'react-icons/fi';
import { RiAddLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { default as LoadImage } from '../../assets/load.gif';
import { IDocente } from '../../pages/admin/eleger_membros_cad';
import { api } from '../../service/api';
import Pagination from '../Pagination';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })
type ModalProps = {
    isOpen: boolean;
    setIsOpen: (valor: boolean) => void;
    idDocente: IDocente
}

export type estadoCadType = {
    id?: string;
    descricao: string;
};

type funcaoType = {
    id?: number;
    descricao: string;
}

type formType = {
    id: number;
    idDocente: number;
    funcaoCad: number
}

export default function ModalElegerAvaliados({ isOpen, setIsOpen, idDocente }: ModalProps) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<formType>();

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    const [load, setLoad] = useState(false)
    let [docentes, setDocentes] = useState<IDocente[]>([])
    let [searchDocente, setSearchDocente] = useState("")

    const getAllDocents = async () => {

        try {

            const response = await api.get('elegerdocente/cad/')

            return response.data as IDocente[]

        } catch (error) {
            console.log(error);
        }

    }

    const { data } = useQuery("fetchDocentesNaoCAD", getAllDocents)


    const docentesFiltrados = searchDocente ? data?.filter((docente) => docente.nome_docente.toLowerCase().includes(searchDocente.toLowerCase())) : []


    const onSubmit = () => {

        try {

            setLoad(true)

            docentes.forEach(async (docenteAvaliado) => {
                await api.post("/avaliador/", {
                    docente_id: docenteAvaliado.id,
                    avaliador_id: idDocente.id
                })
            })
            setShowSuccessAlert(true)
            setLoad(false)

        } catch (error) {
            console.log("error", error);
            setLoad(false)
            setShowErrorAlert(true)

        }

    };

    function closeModal() {
        reset()
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function addDocente(docente: IDocente) {

        const docenteEncontrado = docentes.find((docenteParam) => docenteParam.id === docente.id)

        if (!docenteEncontrado)
            setDocentes([...docentes, docente])
        else {
            setShowErrorAlert(true)
            return
        }


    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">

                        <SweetAlert2
                            backdrop={true}
                            show={showSuccessAlert}
                            title='Sucesso'
                            text='Operação efectuada com sucesso!'
                            onConfirm={() => { setIsOpen(false) }}
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
                            text='Ocorreu um erro ao efectuar a operação. Por favor, verifique se o objecto que está a cadastrar já não se encontra cadastrado no sistema!'
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl h-auto transform overflow-hidden rounded-2xl
                                 bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg flex items-center justify-center gap-4 font-bold leading-6 text-gray-900"
                                    >
                                        <FiBookOpen /> <span>Selecionar avaliados</span>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className={`text-xs text-center text-red-500 ${errors.id && 'animate-pulse'}`}>
                                            Os campos com * são de carácter obrigatório.
                                        </p>
                                    </div>

                                    <div className='flex-1'>
                                        <div className="container lg:px-5 py-16 mx-auto">
                                            <div className="flex flex-col items-center justify-center gap-4 lg:max-w-fit mb-6 relative mx-auto">

                                                <h2 className="font-bold text-center text-xl">Eleja Docentes para serem avaliados por- {`${idDocente.grau_academico?.descricao} - ${idDocente.nome_docente}`}.</h2>


                                            </div>

                                            <div className='flex justify-end hover:brightness-75 '>
                                                <button
                                                    disabled={load}
                                                    onClick={onSubmit}
                                                    className='disabled:bg-blue-400 disabled:text-gray-400 disabled:cursor-not-allowed
                                                      flex items-center justify-center gap-2 px-4 py-2 bg-azul rounded font-bold text-white'>

                                                    {
                                                        load ? (<>
                                                            <Image src={LoadImage} height={25} width={20} />
                                                            <span>Aguarde o processamento...</span>
                                                        </>) : (

                                                            <>
                                                                <FaCheck /> <span>Validar</span>
                                                            </>
                                                        )
                                                    }

                                                </button>
                                            </div>

                                            <div className="flex lg:max-w-4xl w-full justify-center lg:mx-auto text-center">
                                                <div className='rounded px-6 py-4 shadow bg-white dark:bg-gray-200 w-full '>
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
                                                                        Docentes
                                                                    </th>
                                                                    <th className="p-2 font-semibold text-right">
                                                                        Eleger
                                                                    </th>
                                                                </tr>

                                                            </thead>

                                                            <tbody className="text-sm divide-y divide-gray-100">

                                                                {

                                                                    !searchDocente?.length ?

                                                                        data?.map((docente, index) => (
                                                                            <tr
                                                                                key={index}
                                                                                className='hover:brightness-75'>
                                                                                <td className="p-2" >
                                                                                    <input
                                                                                        onClick={() => { docente && addDocente(docente) }}
                                                                                        type="checkbox" className="w-5 h-5" value={docente.id}
                                                                                    />
                                                                                </td>
                                                                                <td className="p-2 flex flex-col items-start">
                                                                                    <span className="font-medium text-gray-800">
                                                                                        {docente.nome_docente}
                                                                                    </span>
                                                                                    <span className="font-xs text-gray-400">
                                                                                        {docente.categoria.descricao}
                                                                                    </span>
                                                                                </td>
                                                                                <td className="p-2 text-right invisible">
                                                                                    <button
                                                                                        onClick={() => { docente && addDocente(docente) }}
                                                                                        type='button'
                                                                                        title='Adicionar docente'
                                                                                        className=' rounded-full bg-blue-800  animacao-link over:brightness-75'>
                                                                                        <RiAddLine className='text-4xl  font-bold h text-white ' />
                                                                                    </button>

                                                                                </td>

                                                                            </tr>

                                                                        ))
                                                                        : (
                                                                            docentesFiltrados?.map((docente, index) => (
                                                                                <tr
                                                                                    key={index}>
                                                                                    <td className="p-2">
                                                                                        <input
                                                                                            onClick={() => { docente.id && addDocente(docente) }}
                                                                                            type="checkbox"
                                                                                            className="w-5 h-5"
                                                                                            value={docente.id}
                                                                                        />
                                                                                    </td>
                                                                                    <td className="p-2 flex flex-col items-start">
                                                                                        <span className="font-medium text-gray-800">
                                                                                            {docente.nome_docente}
                                                                                        </span>
                                                                                        <span className="font-xs text-gray-400">
                                                                                            {docente.categoria.descricao}
                                                                                        </span>
                                                                                    </td>

                                                                                    <td className="p-2 text-right invisible">
                                                                                        <button
                                                                                            onClick={() => { docente.id && addDocente(docente) }}
                                                                                            type='button'
                                                                                            title='Adicionar docente'
                                                                                            className=' rounded-full bg-blue-800  animacao-link over:brightness-75'>
                                                                                            <RiAddLine className='text-4xl  font-bold h text-white ' />
                                                                                        </button>

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

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}
