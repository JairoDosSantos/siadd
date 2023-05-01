import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import { FiBookOpen, FiSave } from 'react-icons/fi';
import { useQuery } from 'react-query';
import loadImage from '../../assets/load.gif';
import { api } from '../../service/api';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

type CadastrarDisciplinaProps = {

    isOpen: boolean;
    setIsOpen: (valor: boolean) => void;
    idDocente: number

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

export default function ModalElegerMembroCad({ isOpen, setIsOpen, idDocente }: CadastrarDisciplinaProps) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<formType>();

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    const [load, setLoad] = useState(false)

    const fetchEstadoCad = async () => {
        try {

            const response = await api.get("/estadoCad");
            console.log("Estado Cad", response.data);
            return response.data as estadoCadType[]
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFuncao = async () => {
        try {

            const response = await api.get("/funcao");

            return response.data as funcaoType[]
        } catch (error) {
            console.log(error);
        }
    }


    const { data } = useQuery("fetchEstadoCAD", fetchEstadoCad)
    const { data: funcao } = useQuery("fetchFuncaoCAD", fetchFuncao)

    const onSubmit: SubmitHandler<formType> = async (data) => {

        try {

            setLoad(true)
            const submitAPI = await api.post("/cadDocente", {
                estado_cad_id: data.id,
                docente_id: idDocente,
                funcao_cad_id: data.funcaoCad
            })

            if (submitAPI.status === 201)
                setShowSuccessAlert(true)
            setLoad(false)

        } catch (error) {

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
                                        <FiBookOpen />  <span>Eleger membro do CAD</span>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className={`text-xs text-center text-red-500 ${errors.id && 'animate-pulse'}`}>
                                            Os campos com * são de carácter obrigatório.
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className='flex flex-col gap-4 justify-center items-center'>
                                            <div className='flex flex-col lg:flex-row gap-4 w-full '>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <label
                                                        className='text-lg'
                                                        htmlFor="nomeProf">Eleger novo membro do CAD como*: </label>
                                                    <select

                                                        {...register("id")}
                                                        className={`w-full rounded-lg  shadow ${errors.id && 'border-2 border-red-700'} border-gray-300`}
                                                        placeholder='Status do CAD*'

                                                    >
                                                        {
                                                            data?.map((estadoCAD, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={estadoCAD.id}>{estadoCAD.descricao}</option>
                                                            ))

                                                        }

                                                    </select>

                                                </div>

                                                <div className='flex flex-col w-full gap-2'>
                                                    <label
                                                        className='text-lg'
                                                        htmlFor="nomeProf">Função*: </label>
                                                    <select

                                                        {...register("funcaoCad")}
                                                        className={`w-full rounded-lg  shadow ${errors.funcaoCad && 'border-2 border-red-700'} border-gray-300`}
                                                        placeholder='Status do CAD*'

                                                    >
                                                        {
                                                            funcao?.map((estadoCAD, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={estadoCAD.id}>{estadoCAD.descricao}</option>
                                                            ))

                                                        }

                                                    </select>

                                                </div>
                                            </div>



                                            <div className="mt-4 flex items-center justify-end gap-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent 
                                            bg-red-100 px-4 py-2 text-sm text-red-900 hover:bg-red-200 
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 
                                            focus-visible:ring-offset-2 font-bold"
                                                    onClick={closeModal}
                                                >
                                                    <AiOutlineClear />  <span>Cancelar</span>
                                                </button>
                                                <button
                                                    disabled={load}
                                                    type={'submit'}
                                                    className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent 
                                            bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                                            focus-visible:ring-offset-2 font-bold disabled:bg-blue-50 disabled:text-blue-200 disabled:cursor-not-allowed"
                                                >
                                                    {
                                                        load ? (<>
                                                            <Image
                                                                src={loadImage}
                                                                className="h-5 w-5"
                                                                height={20}
                                                                width={20} />
                                                            <span className='italic'>Salvando...</span>
                                                        </>
                                                        ) : (<>
                                                            <FiSave />  <span>Salvar</span></>)
                                                    }


                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
