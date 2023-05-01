import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { BsAppIndicator } from 'react-icons/bs';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaChalkboardTeacher, FaFileArchive } from 'react-icons/fa';
import { TbFileDescription } from 'react-icons/tb';
import { VscSymbolParameter } from 'react-icons/vsc';
import { useQuery } from 'react-query';
import { api } from '../../service/api';

const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })
type DimensaoEnsinoProps = {
    setIsOpen: (value: boolean) => void;
    isOpen: boolean
}

type IndicadorType = {
    id?: number;
    indicadorType: string;
    descricao: string;

}
type ParametroType = {
    id?: number;
    descricao?: string;
    indicador: IndicadorType[]
}
type DimensaoEnsinoType = {
    dimensao: any
    parametros: ParametroType[];

}

type FormDataType = {
    indicador: number;
    resposta: string;
    documento_comprovante: FileList;

}

export default function DimensaoEnsinoModal({ setIsOpen, isOpen }: DimensaoEnsinoProps) {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const route = useRouter()
    let [load, setLoad] = useState(false)
    let [showSucessesIndicator, setShowSucessIndicator] = useState(false)
    const { id: idDimensao } = route.query

    const getAllParametroPorDimensao = async () => {

        try {

            const getParametrosPorDimensao = await api.get(`/dimensao/parametro/${idDimensao}`)
            console.log("Parametros", getParametrosPorDimensao.data);
            return getParametrosPorDimensao.data as DimensaoEnsinoType

        } catch (error: any) {

            console.log(`/dimensao/parametro/${idDimensao}`)

        }

    }
    const { data, isLoading, error } = useQuery('fetchParametros', getAllParametroPorDimensao)

    const NUMBER_OF_SESSION = 3
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormDataType>();

    const [FormsessionPage, setFormSessionPage] = useState(0)

    const changeFormSessionNext = () => {
        if (NUMBER_OF_SESSION > FormsessionPage)
            setFormSessionPage(FormsessionPage + 1)

    }
    const changeFormSessionPrevius = () => {
        if (0 < FormsessionPage)
            setFormSessionPage(FormsessionPage - 1)

    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const onSubmitTeste: SubmitHandler<FormDataType> = async (data) => {
        setLoad(true)
        try {

            const { USER_LOGGED_CAD } = nookies.get(null)
            const user = JSON.parse(USER_LOGGED_CAD);
            const idDocente = user.id;

            const documentoComprovante = data.documento_comprovante.item(0)

            const formData: any = new FormData();

            formData.append("documento_comprovante", documentoComprovante);

            formData.append("docente_id", idDocente);
            formData.append("indicador_id", data.indicador)
            formData.append("resposta", data.resposta)

            const response = await api.post("/avaliacaoDocente", {
                docente_id: formData.get("docente_id"),
                resposta: formData.get("resposta"),
                documento_comprovante: formData.get("documento_comprovante"),
                indicador_id: formData.get("indicador_id")
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "type": "formData"
                }
            })

            if (response.status === 201) {
                setShowSucessIndicator(true)
            }

        } catch (error: any) {
            alert(error.message)
            console.log(error.message);
        }

        setLoad(false)
    }

    return (
        <>
            <SweetAlert2
                backdrop={true}
                show={showSuccessAlert}
                title='Sucesso'
                text='A sua avaliacao foi feita com sucesso'
                onConfirm={() => { setIsOpen(false) }}
                icon='success'
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                confirmButtonColor="#4051ef"
            />

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

                    <div className="fixed inset-0 overflow-y-auto max-w-4xl mx-auto">
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl
                                 bg-white p-6 text-left
                                 shadow-xl transition-all">
                                    <div className='flex items-center justify-between mb-2'>
                                        <FaChalkboardTeacher className='text-4xl text-gray-500' />
                                        <div className=" flex justify-center items-center gap-4">
                                            <button
                                                title='Voltar ao parâmetro anterior'
                                                type='button'
                                                onClick={changeFormSessionPrevius}
                                                className={`${FormsessionPage === 0 ? 'invisible' : ' inline-flex '}  items-center
                                                    gap-2 rounded-md border border-transparent text-2xl
                                                    text-gray-600 font-semibold hover:brightness-75
                                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                                                    focus-visible:ring-offset-2 enabled:brightness-90 `}

                                            >
                                                <FaArrowAltCircleLeft />
                                                <span className='text-sm'>Parâmetro anterior</span>

                                            </button>
                                            <button
                                                title='Ir ao parâmetro anterior'
                                                type="submit"
                                                className={`${FormsessionPage >= NUMBER_OF_SESSION ? 'invisible' : ' inline-flex '}  items-center  gap-2 rounded-md border border-transparent
                                            text-2xl text-gray-600  font-semibold hover:brightness-75 
                                             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                                              focus-visible:ring-offset-2`}
                                                onClick={changeFormSessionNext}
                                            >
                                                <span className='text-sm'>Próximo parâmetro</span>
                                                <FaArrowAltCircleRight />

                                            </button>
                                        </div>
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xs font-bold  text-red-700 text-center"
                                    >
                                        Os campos com *, o seu preenchimento é obrigatório.
                                    </Dialog.Title>

                                    <div>
                                        <form
                                            onSubmit={handleSubmit(onSubmitTeste)}
                                            encType='multipart/form-data'
                                        >
                                            {
                                                isLoading ? (
                                                    <p className='text-center font-bold'>Avaliação começará em instante... ⏳</p>) :
                                                    (data && data.parametros?.map((parametro, index) => {
                                                        if (FormsessionPage === index) {
                                                            return (
                                                                <div
                                                                    key={parametro.id}
                                                                    className={`${FormsessionPage === index ? 'flex flex-col' : 'hidden'}`}>
                                                                    {
                                                                        showSucessesIndicator && (
                                                                            <div className='border-2 border-azul text-azul text-center animate-pulse relative text-base  my-4 w-96 mx-auto font-bold px-4 py-3 rounded'>
                                                                                <span>Indicador registrado no sistema!</span>
                                                                                <span
                                                                                    onClick={() => setShowSucessIndicator(!showSucessesIndicator)}

                                                                                    className='text-base absolute top-0 right-2 cursor-pointer'>X</span>
                                                                            </div>
                                                                        )
                                                                    }

                                                                    <div className='flex items-center justify-center gap-2 my-1'>
                                                                        <VscSymbolParameter className='text-lg' />
                                                                        <h1 className='text-lg'> {parametro.descricao}</h1>
                                                                    </div>
                                                                    <div className='flex flex-col gap-2'>
                                                                        <div className='flex items-center gap-2'>
                                                                            <BsAppIndicator className='text-base' />
                                                                            <label
                                                                                className='text-base '
                                                                                htmlFor="indicador">Indicador *:</label>
                                                                        </div>
                                                                        <select
                                                                            {...register("indicador")}
                                                                            className={`w-full rounded-lg cursor-pointer  
                                                     shadow ${errors.indicador?.message && 'border-2 border-red-700'}
                                                     border-gray-300`}
                                                                        >
                                                                            {
                                                                                parametro.indicador?.map((indicadorA, index) => (
                                                                                    <option
                                                                                        key={index}
                                                                                        value={indicadorA.id}>{indicadorA.descricao}</option>
                                                                                ))
                                                                            }

                                                                        </select>
                                                                        <div className='flex items-center  gap-2'>
                                                                            <TbFileDescription className='text-base' />
                                                                            <label
                                                                                className='text-base '
                                                                                htmlFor="descricao">Descrição:</label>
                                                                        </div>
                                                                        <input
                                                                            {...register("resposta")}
                                                                            className={`w-full rounded-lg px-4 py-6  
                                                                shadow ${errors.resposta?.message && 'border-2 border-red-700'} 
                                                                border-gray-300`} />

                                                                        <div className='flex items-center  gap-2'>
                                                                            <FaFileArchive className='text-base' />
                                                                            <label
                                                                                className='text-sm font-bold text-red-600 animate-bounce cursor-pointer'
                                                                                htmlFor="documentoComprovante">Click aquí para add. o Doc. comprovante:</label>
                                                                        </div>

                                                                        <input
                                                                            type="file"
                                                                            {...register("documento_comprovante")}
                                                                            className='w-full rounded-lg shadow hidden'
                                                                            id='documentoComprovante'
                                                                        />

                                                                    </div>
                                                                    <div className="mt-6 flex justify-end items-center gap-2">

                                                                        <button
                                                                            onClick={() => setShowSuccessAlert(true)}
                                                                            className={`inline-flex  items-center  gap-2 rounded-md border border-transparent
                                             bg-dourado font-bold px-4 py-2 text-sm  text-white hover:brightness-75 
                                             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                                             focus-visible:ring-offset-2 disabled:bg-azul/60 disabled:text-gray-700 disabled:cursor-not-allowed ${NUMBER_OF_SESSION === FormsessionPage ? "flex" : "hidden"}`}
                                                                        >
                                                                            <AiOutlineCheckSquare /> <span>Terminar o módulo</span>
                                                                        </button>

                                                                        <button
                                                                            type="submit"
                                                                            className="inline-flex  items-center  gap-2 rounded-md border border-transparent
                                             bg-azul px-4 py-2 text-sm font-medium  text-white hover:brightness-75 
                                             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                                             focus-visible:ring-offset-2 disabled:bg-azul/60 disabled:text-gray-700 disabled:cursor-not-allowed"
                                                                        >
                                                                            <AiOutlineCheckSquare /> <span>Adicionar indicador</span>
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    )
                                            }
                                        </form>

                                        <div className="mt-6  justify-end items-center gap-2 hidden">

                                            <button
                                                onClick={closeModal}
                                                type="submit"
                                                className={`inline-flex  items-center  gap-2 rounded-md border border-transparent
                                             bg-azul px-4 py-2 text-sm font-medium  text-white hover:brightness-75 
                                             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                                             focus-visible:ring-offset-2 disabled:bg-azul/60 disabled:text-gray-700 disabled:cursor-not-allowed `}
                                            >
                                                <AiOutlineCheckSquare /> <span>Terminar o módulo</span>
                                            </button>

                                            <button
                                                disabled={NUMBER_OF_SESSION !== FormsessionPage}
                                                onClick={closeModal}
                                                type="submit"
                                                className="inline-flex  items-center  gap-2 rounded-md border border-transparent
                                             bg-azul px-4 py-2 text-sm font-medium  text-white hover:brightness-75 
                                             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                                             focus-visible:ring-offset-2 disabled:bg-azul/60 disabled:text-gray-700 disabled:cursor-not-allowed"
                                            >
                                                <AiOutlineCheckSquare /> <span>Validar resposta</span>
                                            </button>

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
