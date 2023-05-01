//import emailjs from '@emailjs/browser';
import emailjs from '@emailjs/browser';
import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dist/shared/lib/dynamic';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineUserAdd } from 'react-icons/ai';
import { FiSave } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadImage from '../../assets/load.gif';
import { makePassord } from '../../helpers/functions';
import { api } from '../../service/api';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })


type CadastrarProfessorProps = {
    isOpen: boolean;
    setIsOpen: (valor: boolean) => void
}

export type professorTypes = {
    id?: number;
    nomeProfessor: string;
    nMecanografico: string;
    emailDocente: string;
    percentagemContratacao: number;
    categoriaProfissional: number;
    departamento: number;
    grauAcademico: number;
    cargo: number;
};

type Typagem = {
    id: number;
    descricao: string
}

export default function CadastrarProfessor({ isOpen, setIsOpen }: CadastrarProfessorProps) {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<professorTypes>();

    const [sessaoFormulario, setSessaoFormnulario] = useState(0)
    const [load, setLoad] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [messageAlert, setShowMessage] = useState("Ocorreu um erro ao efectuar a operação. Por favor, verifique se o objecto que está a cadastrar já não se encontra cadastrado no sistema!")

    const fetchCargos = async () => {

        try {
            const { data: cargos } = await api.get('/cargo')
            return cargos as Typagem[]
        } catch (error) {

        }

    }

    const fetchDepartamentos = async () => {

        try {
            const { data: departamentos } = await api.get('/departamento')
            return departamentos as Typagem[]
        } catch (error) {

        }

    }

    const fetchPercentagensContratacao = async () => {

        try {
            const { data: percentagensContratacao } = await api.get('/percentagemContratacao');
            return percentagensContratacao as Typagem[]
        } catch (error) {

        }

    }

    const fetchCategoriasProfissionais = async () => {

        try {
            const { data: categoriasProfissionais } = await api.get('/categoria');
            return categoriasProfissionais as Typagem[]
        } catch (error) {

        }

    }

    const fetchGrauAcademico = async () => {

        try {
            const { data: grauAcademicos } = await api.get('/grauAcademico');
            return grauAcademicos as Typagem[]
        } catch (error) {

        }

    }


    const { data: cargos, isLoading: isLoadingCargos, error: ErroCargo } = useQuery('fetchCargos', fetchCargos)
    const { data: categoriasProfissionais, isLoading: isLoadingCategoriasProfissionais } = useQuery('fetchCategoriasProfissionais', fetchCategoriasProfissionais)
    const { data: departamentos, isLoading: isLoadingDepartamento } = useQuery('fetchDepartamentos', fetchDepartamentos)
    const { data: grauAcademicos, isLoading: isLoadingGrauAcademico } = useQuery('fetchGrauAcademico', fetchGrauAcademico)
    const { data: percentagensContratacao, isLoading: isLoadingPercentagensContratacao } = useQuery('fetchPercentagensContratacao', fetchPercentagensContratacao)


    const notify = () => toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });;


    const onSubmit: SubmitHandler<professorTypes> = async (data) => {

        setLoad(true)
        console.log(data);
        //Função que gera senha
        //Enviar o e-mail no docente com as suas credenciais.
        const NIVEL_ACEESO_DOCENTE_NORMAL = 3
        const password = makePassord()
        //    const passwordEncriptada = encriptarSenhar(password)
        try {
            const submitAPI = await api.post("/docente", {

                nome_docente: data.nomeProfessor,
                email: data.emailDocente,
                nivel_acesso_id: NIVEL_ACEESO_DOCENTE_NORMAL,
                password,
                numero_mecanografico: data.nMecanografico,
                cargo_id: data.cargo,
                departamento_id: data.departamento,
                grau_academico_id: data.grauAcademico,
                categoria_profissional_id: data.categoriaProfissional,
                percentagem_contratacao_id: data.percentagemContratacao

            })

            if (submitAPI.status === 201) {

                const EmailJSResponseStatus = await sendEmail(data.emailDocente, data.nomeProfessor, password)
                if (!EmailJSResponseStatus) {

                    data.id &&
                        await api.delete(`/docente/${data.id}`)

                    setShowErrorAlert(true)
                    return
                }

                setShowSuccessAlert(true)
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
    const sendEmail = async (email: string, nomeDocente: string, password: string) => {

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
                                        <AiOutlineUserAdd />  <span>Cadastrar docente</span>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-xs text-center text-red-500">
                                            Os campos com * são de carácter obrigatório.
                                        </p>
                                        <button onClick={notify}>Notify!</button>
                                        <ToastContainer
                                            position="top-right"
                                            autoClose={5000}
                                            hideProgressBar={false}
                                            newestOnTop={false}
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            theme="light" />
                                    </div>
                                    <div className="mt-4">
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className='flex flex-col gap-4 justify-center items-center'>

                                            <section className={`w-full ${sessaoFormulario === 0 ? 'flex' : 'hidden'}`}>
                                                <div className='flex flex-col gap-4 w-full '>
                                                    <div className='flex flex-col lg:flex-row w-full gap-2'>
                                                        <div className='w-full'>
                                                            <label
                                                                className='text-lg'
                                                                htmlFor="nomeDocente">Nome do Docente*: </label>
                                                            <input
                                                                id='nomeDocente'
                                                                {...register("nomeProfessor")}
                                                                className={`w-full rounded-lg  shadow ${errors.nomeProfessor && 'border-2 border-red-700'} border-gray-300`}
                                                                placeholder='Nome do Professor*'
                                                                type="text"
                                                            />
                                                        </div>


                                                    </div>
                                                    <div className='flex flex-col lg:flex-row w-full gap-2 '>
                                                        <div>
                                                            <label
                                                                className='text-lg'
                                                                htmlFor="emailDocente">E-mail*: </label>
                                                            <input
                                                                id='emailDocente'
                                                                {...register("emailDocente")}
                                                                className={`w-full rounded-lg  shadow ${errors.emailDocente && 'border-2 border-red-700'} border-gray-300`}
                                                                placeholder='exemplo@gmail.com*'
                                                                type="email" />
                                                        </div>

                                                        <div>
                                                            <label
                                                                className='text-lg'
                                                                htmlFor="nMecanografico">Nº mecanográfico*:</label>
                                                            <input
                                                                id='nMecanografico'
                                                                {...register("nMecanografico")}
                                                                className={`w-full rounded-lg  shadow ${errors.nMecanografico && 'border-2 border-red-700'} border-gray-300`}
                                                                placeholder='Número mecanográfico*'
                                                                type="text" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </section>

                                            {
                                                <section className={`w-full ${sessaoFormulario === 1 ? 'flex flex-col' : 'hidden'}`}>
                                                    <>
                                                        <div className='flex flex-col lg:flex-row gap-4 w-full mt-2'>

                                                            <div className='flex flex-col gap-2 w-full md:w-1/2'>
                                                                <label
                                                                    className='text-lg'
                                                                    htmlFor="departamento">Departamento *:</label>
                                                                <select
                                                                    className={`w-full rounded-lg  shadow ${errors.departamento && 'border-2 border-red-700'} border-gray-300`}
                                                                    {...register("departamento")}>
                                                                    {
                                                                        departamentos?.map((valor, index) => (
                                                                            <option
                                                                                key={index}
                                                                                value={valor.id}>{valor.descricao}</option>
                                                                        ))
                                                                    }
                                                                </select>

                                                            </div>
                                                            <div
                                                                className='flex flex-col w-full md:w-1/2 gap-2'>
                                                                <label
                                                                    className='text-lg'
                                                                    htmlFor="">
                                                                    Categoria Profissional *:
                                                                </label>
                                                                <select
                                                                    className={`w-full rounded-lg  shadow ${errors.categoriaProfissional && 'border-2 border-red-700'} border-gray-300`}
                                                                    {...register("categoriaProfissional")}>
                                                                    {
                                                                        categoriasProfissionais?.map((valor, index) => (
                                                                            <option
                                                                                key={index}
                                                                                value={valor.id}>{valor.descricao}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {
                                                                    /**
                                                                     *  <ListBoxData
                                                                    setValue={setCategoriaProfissional}
                                                                    people={categoriasProfissionais} />
                                                                     */
                                                                }
                                                            </div>

                                                        </div>
                                                        <div className='flex flex-col lg:flex-row gap-4 w-full mt-2'>

                                                            <div
                                                                className='flex flex-col w-full md:w-1/2 gap-2'>
                                                                <label
                                                                    className='text-lg'
                                                                    htmlFor="percentagemContratacao">
                                                                    Percentagem de Contratação* :
                                                                </label>
                                                                <select
                                                                    className={`w-full rounded-lg  shadow ${errors.percentagemContratacao && 'border-2 border-red-700'} border-gray-300`}
                                                                    {...register("percentagemContratacao")}>
                                                                    {
                                                                        percentagensContratacao?.map((valor, index) => (
                                                                            <option
                                                                                key={index}
                                                                                value={valor.id}>{valor.descricao}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {/**
                                                                 *  <ListBoxData
                                                                    setValue={setPercentagemContratacao}
                                                                    people={percentagensContratacao} />
                                                                 */}
                                                            </div>

                                                            <div className='flex flex-col gap-2 w-full md:w-1/2'>
                                                                <label
                                                                    className='text-lg'
                                                                    htmlFor="cargo">Cargo*:</label>
                                                                <select
                                                                    className={`w-full rounded-lg  shadow ${errors.cargo && 'border-2 border-red-700'} border-gray-300`}
                                                                    {...register("cargo")}>
                                                                    {
                                                                        cargos?.map((cargo, index) => (
                                                                            <option
                                                                                key={index}
                                                                                value={cargo.id}>{cargo.descricao}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {
                                                                    /**
                                                                     *   <ListBoxData
                                                                    setValue={setCargo}
                                                                    people={cargos} />
                                                                     */
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col lg:flex-row gap-4 w-full mt-2'>

                                                            <div
                                                                className='flex flex-col w-full  gap-2'>
                                                                <label
                                                                    className='text-lg'
                                                                >
                                                                    Grau acadêmico* :
                                                                </label>
                                                                <select
                                                                    className={`w-full rounded-lg  shadow ${errors.grauAcademico && 'border-2 border-red-700'} border-gray-300`}
                                                                    {...register("grauAcademico")}>
                                                                    {
                                                                        grauAcademicos?.map((valor, index) => (
                                                                            <option
                                                                                key={index}
                                                                                value={valor.id}>{valor.descricao}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {/**
                                                                 * <ListBoxData
                                                                    setValue={setGrauAcademico}
                                                                    people={grauAcademicos} />
                                                                 */}
                                                            </div>


                                                        </div>
                                                    </>
                                                </section>

                                            }

                                            <section className={`mt-4 flex items-center justify-end gap-4 ${sessaoFormulario > 0 ? 'hidden' : 'flex'}`}>
                                                <button
                                                    disabled={sessaoFormulario <= 0 ? true : false}
                                                    onClick={voltarSessaoFormulario}
                                                    type="button"
                                                    className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent 
                                            bg-red-100 px-4 py-2 text-sm text-red-900 hover:bg-red-200 
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 
                                            focus-visible:ring-offset-2 font-bold disabled:bg-red-50 disabled:text-red-300 disabled:cursor-not-allowed"
                                                >
                                                    <AiOutlineArrowLeft />  <span>Voltar</span>
                                                </button>
                                                <button
                                                    type='button'
                                                    className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent 
                                            bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                                            focus-visible:ring-offset-2 font-bold"
                                                    onClick={proximaSessaoFormulario}
                                                >
                                                    <span>Avançar</span>   <AiOutlineArrowRight />
                                                </button>
                                            </section>

                                            <section className={`mt-4  items-center justify-end gap-4 ${sessaoFormulario > 0 ? 'flex' : 'hidden'}`}>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent 
                                            bg-red-100 px-4 py-2 text-sm text-red-900 hover:bg-red-200 
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 
                                            focus-visible:ring-offset-2 font-bold"
                                                    onClick={voltarSessaoFormulario}
                                                >
                                                    <AiOutlineArrowLeft />  <span>Anterior</span>
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
