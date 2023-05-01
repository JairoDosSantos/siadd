//import emailjs from '@emailjs/browser';
import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dist/shared/lib/dynamic';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineArrowLeft, AiOutlineUserAdd } from 'react-icons/ai';
import { FiSave } from 'react-icons/fi';
import { useQuery } from 'react-query';
import LoadImage from '../../assets/load.gif';
import { makePassord } from '../../helpers/functions';
import { api } from '../../service/api';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

type CadastrarProfessorProps = {
    isOpen: boolean;
    setIsOpen: (valor: boolean) => void
}

export type EstudanteType = {
    id?: number;
    nome_estudante: string;
    email: string;
    n_BI: string;
    n_processo: number
};

type Typagem = {
    id: number;
    descricao: string
}

export default function ModalAddEstudante({ isOpen, setIsOpen }: CadastrarProfessorProps) {

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<EstudanteType>();

    const [sessaoFormulario, setSessaoFormnulario] = useState(0)
    const [load, setLoad] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [messageAlert, setShowMessage] = useState("Ocorreu um erro ao efectuar a operação. Por favor, verifique se o objecto que está a cadastrar já não se encontra cadastrado no sistema!")

    const fetchTurmas = async () => {

        try {
            const { data: turmas } = await api.get('/turma')
            return turmas as Typagem[]
        } catch (error) {

        }

    }

    const fetchCursos = async () => {

        try {
            const { data: cursos } = await api.get('/curso')
            return cursos as Typagem[]
        } catch (error) {

        }

    }
    const fetchAnoLectivos = async () => {

        try {
            const { data: cursos } = await api.get('/anoLectivo')
            return cursos as Typagem[]
        } catch (error) {

        }

    }



    const { data: turmas, isLoading: isLoadingTurmas } = useQuery('fetchTurmasEstudantes', fetchTurmas)
    const { data: anos_lectivos, isLoading: isLoadingCargos } = useQuery('fetchAnolectivosEstudantes', fetchAnoLectivos)
    const { data: cursos, isLoading: isLoadingCursos } = useQuery('fetchCursosEstudantes', fetchCursos)



    const onSubmit: SubmitHandler<EstudanteType> = async (data) => {

        setLoad(true)

        //Função que gera senha
        //Enviar o e-mail no estudante com as suas credenciais.
        const NIVEL_ACEESO_ESTUDANTE_NORMAL = 4
        const password = makePassord()
        //    const passwordEncriptada = encriptarSenhar(password)
        try {
            const submitAPI = await api.post("/estudante", {
                nome: data.nome_estudante,
                email: data.email,
                nivel_acesso_id: NIVEL_ACEESO_ESTUDANTE_NORMAL,
                password,
                numero_processo: data.n_processo,
                numero_bilhete: data.n_BI
            })

            if (submitAPI.status === 201) {
                setShowSuccessAlert(true)

                /** const EmailJSResponseStatus = await sendEmail(data.email, data.nomeCliente, myPassword)
                 if (!EmailJSResponseStatus) {
 
                     await api.delete('/docente', { id_docente: data._id })
 
                     errorOcorrido('Envio de E-mail falhou!',
                         'O envio da senha do cliente falhou. Por favor, certifique-se que o e-mail está correcto e tente novamente.')
                     return
                 }
                  */

            }
        } catch (error: any) {
            console.log(error.message);
            setShowMessage(error.response.data)
            setShowErrorAlert(true)
        }


        setLoad(false)
    };

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    /** const sendEmail = async (email: string, nomeDocente: string, password: string) => {
 
         try {
             //  const emailEnviado = await emailjs.send(process.env.SERVICE_EMAIL_ID!, process.env.TEMPLATE_EMAIL_ID!, {
             await emailjs.send('service_jl22liv', 'template_nsz3ckw', {
                 clientEmail: email,
                 clientName: nomeDocente,
                 password,
                 from_name: 'SIADD, SUAS CREDENCIAIS DO SISTEMA..'
             }, 'syQAvsoXyX3dJEy-D')
 
             return true
 
         } catch (error) {
 
             return false
         }
     };
      */
    const proximaSessaoFormulario = () => {
        setSessaoFormnulario(sessaoFormulario + 1)
    }
    const voltarSessaoFormulario = () => {
        if (sessaoFormulario > 0)
            setSessaoFormnulario(sessaoFormulario - 1)
    }

    return (
        <>
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
                                        <AiOutlineUserAdd />  <span>Cadastrar novo estudante</span>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-xs text-center text-red-500">
                                            Os campos com * são de carácter obrigatório.
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className='flex flex-col gap-4 justify-center items-center'>

                                            <section className={`w-full flex`}>
                                                <div className='flex flex-col gap-4 w-full '>
                                                    <div className='flex flex-col lg:flex-row w-full gap-2'>
                                                        <div className='w-full'>
                                                            <label
                                                                className='text-lg'
                                                                htmlFor="nomeDocente">Nome do Estudante*: </label>
                                                            <input
                                                                id='nomeDocente'
                                                                {...register("nome_estudante")}
                                                                className={`w-full rounded-lg  shadow ${errors.nome_estudante && 'border-2 border-red-700'} border-gray-300`}
                                                                placeholder='Nome do Estudante*'
                                                                type="text"
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className='flex flex-col lg:flex-row w-full gap-2 '>



                                                        <div className='flex flex-col gap-2 w-full md:w-1/2'>
                                                            <label
                                                                className='text-lg'
                                                                htmlFor="departamento">Nº do Bilhete *:</label>
                                                            <input
                                                                id='bi'
                                                                {...register("n_BI")}
                                                                className={`w-full rounded-lg  shadow ${errors.n_BI && 'border-2 border-red-700'} border-gray-300`}
                                                                type="text" />

                                                        </div>
                                                        <div className='flex flex-col gap-2 w-full md:w-1/2'>
                                                            <label
                                                                className='text-lg'
                                                                htmlFor="departamento">Nº do processo *:</label>
                                                            <input
                                                                id='bi'
                                                                {...register("n_processo")}
                                                                className={`w-full rounded-lg  shadow ${errors.n_BI && 'border-2 border-red-700'} border-gray-300`}
                                                                type="text" />

                                                        </div>

                                                    </div>
                                                    <div className='flex flex-col gap-2 w-full'>
                                                        <label
                                                            className='text-lg'
                                                            htmlFor="emailDocente">E-mail*: </label>
                                                        <input
                                                            id='emailDocente'
                                                            {...register("email")}
                                                            className={`w-full rounded-lg  shadow ${errors.email && 'border-2 border-red-700'} border-gray-300`}
                                                            placeholder='exemplo@gmail.com*'
                                                            type="email" />
                                                    </div>

                                                </div>

                                            </section>

                                            <section className={`mt-4  items-center justify-end gap-4 flex`}>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent 
                                            bg-red-100 px-4 py-2 text-sm text-red-900 hover:bg-red-200 
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 
                                            focus-visible:ring-offset-2 font-bold"
                                                    onClick={() => reset()}
                                                >
                                                    <AiOutlineArrowLeft />  <span>Cancelar</span>
                                                </button>
                                                <button
                                                    disabled={(!isValid || load) ? true : false}
                                                    type={'submit'}
                                                    className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent 
                                            bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                                            focus-visible:ring-offset-2 font-bold disabled:bg-blue-50 disabled:text-blue-300 disabled:cursor-not-allowed"

                                                >
                                                    {
                                                        load ? (<>
                                                            <Image src={LoadImage} height={25} width={20} />
                                                            <span>Processando...</span>
                                                        </>) : (
                                                            <>
                                                                <FiSave />  <span>Cadastrar</span></>
                                                        )

                                                    }

                                                </button>
                                            </section>



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
