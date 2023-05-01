import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import nookies from 'nookies';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaCheck, FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import loadImage from '../../assets/load.gif';
import Header from '../../components/Header';
import { api } from '../../service/api';

const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })
// import { Container } from './styles';

type EstadoRespostaType = {
    id?: number;
    descricao: string
}

type RespostaType = {
    id?: number,
    periodo_avaliacao_id: number;
    indicador: IndicadorType;
    estadoresposta: EstadoRespostaType;
    resposta: string
    documento_compravante: string;
    avaliador_id: number
}
type IndicadorType = {
    id?: number,
    descricao: string,
    pontuacao: number,
    parametro_id: number,
}


const ValidarAvaliacao: NextPage = () => {

    const [searchDocente, setSearchDocente] = useState("")

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RespostaType>();

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    let [idAvaliador, setIdAvaliador] = useState(0)
    const route = useRouter();

    const { id } = route.query


    const [load, setLoad] = useState(false)

    useEffect(() => {
        //Buscar ID do professor logado no Cookie
        const { USER_LOGGED_CAD } = nookies.get(null)

        const user = JSON.parse(USER_LOGGED_CAD.trim());
        setIdAvaliador(user.id)
    }, [])

    const getAllResponsesOfMyAvaliado = async () => {

        const idDocente = id

        try {

            const getRespostas = await api.get(`/resposta/docente/${idDocente}`)
            return getRespostas.data as RespostaType[]

        } catch (error: any) {
            console.log(error.message)
        }

    }
    const { data: respostasAvaliacao, isLoading, error } = useQuery('fetchRespostaAvaliado', getAllResponsesOfMyAvaliado)

    const onSubmitAprovar: SubmitHandler<RespostaType> = async (data) => {
        setLoad(true)
        //data.estadoresposta.id = 2;
        data.avaliador_id = idAvaliador;

        try {
            const response = await api.put("/avaliacao/validar", {

                estado_resposta_id: 2,
                avaliador_id: idAvaliador,
                avaliacao_id: data.id,
                obs_validacao: ""
            })
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

    const onSubmitReprovar: SubmitHandler<RespostaType> = async (dataB) => {

        dataB.estadoresposta.id = 3
        dataB.avaliador_id = idAvaliador;

        try {
            const response = await api.post("/avaliacao/validar", {
                avaliacao_id: dataB.id,
                estado_resposta_id: 3,
                avaliador_id: idAvaliador
            })
            if (response.status === 200) {
                setShowSuccessAlert(true)
            }

        } catch (error) {
            setShowErrorAlert(true)
        }
    }



    const filteredDocente = searchDocente ? respostasAvaliacao?.filter((docente) => docente.indicador.descricao?.toLowerCase().includes(searchDocente.toLowerCase())) : []


    return (
        <>
            <SweetAlert2
                backdrop={true}
                show={showSuccessAlert}
                title='Sucesso'
                text='Operação efectuada com sucesso!'
                onConfirm={() => { route.reload() }}
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
            <Head>
                <title>Valide os seus avaliados | Sistema de avaliação de docentes</title>
            </Head>
            <Header />
            <main className='px-8 flex flex-wrap gap-4 justify-center mt-4 pb-4'>
                <section className="antialiased w-full lg:w-1/2">
                    <div className="flex flex-col justify-center h-full">
                        {/**   <!-- Table --> */}
                        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-300 shadow-lg 
                rounded-sm border border-gray-200">
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

                            <>
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 dark:bg-gray-200">

                                        <tr className=''>
                                            <th></th>
                                            <th className="p-2 text-left ">
                                                <span className="font-semibold ">Idicador</span>
                                            </th>
                                            <th className="p-2 text-left ">
                                                <span className="font-semibold ">Pontuação</span>
                                            </th>
                                            <th className="p-2 text-left ">
                                                <span className="font-semibold ">Resposta</span>
                                            </th>

                                            <th className="p-2 text-left ">
                                                <span className="font-semibold ">Documento</span>
                                            </th>
                                            <th className="p-2  ">
                                                <div className="font-semibold text-center">Acção</div>
                                            </th>
                                        </tr>


                                    </thead>

                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {/**               <!-- record 1 --> */}
                                        {
                                            isLoading ? (
                                                <tr className='text-center font-bold'>
                                                    <td className="p-2">
                                                        Processando os dados...
                                                    </td>
                                                </tr>
                                            ) : (
                                                !filteredDocente?.length ?
                                                    (
                                                        respostasAvaliacao?.map((respostas, index) => (
                                                            <tr

                                                                key={index}
                                                                className=''>
                                                                <td className="p-2">
                                                                    <input type="checkbox" className="w-5 h-5" value={respostas.id}
                                                                    />
                                                                </td>
                                                                <td className="p-2">
                                                                    <span className="font-medium text-gray-800">
                                                                        {respostas.indicador.descricao}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2">
                                                                    <span className="font-medium text-gray-800">
                                                                        {respostas.indicador.pontuacao}
                                                                    </span>
                                                                </td>

                                                                <td className="p-2">
                                                                    <span className="font-medium text-gray-800">
                                                                        {respostas.resposta}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2">
                                                                    <span className="font-medium text-gray-800">
                                                                        {respostas.documento_compravante}
                                                                    </span>
                                                                </td>


                                                                <td

                                                                    className="p-2 flex items-center gap-2">
                                                                    <form onSubmit={handleSubmit(onSubmitAprovar)}>
                                                                        <input
                                                                            defaultValue={respostas.id}
                                                                            {...register("id")}
                                                                            type="hidden" />
                                                                        <button
                                                                            defaultValue={2}
                                                                            title='Validar resposta'
                                                                            className={`${respostas.estadoresposta.id === 1 ? "flex" : "invisible"} font-medium cursor-pointer bg-azul text-white px-4 py-2 rounded hover:brightness-75`}>

                                                                            {
                                                                                load ? (<>
                                                                                    <Image
                                                                                        src={loadImage}
                                                                                        className="h-5 w-5"
                                                                                        height={20}
                                                                                        width={20} />
                                                                                </>
                                                                                ) : (<FaCheck />)
                                                                            }
                                                                        </button>
                                                                    </form>

                                                                    <form onSubmit={handleSubmit(onSubmitReprovar)}>
                                                                        <input
                                                                            defaultValue={respostas.id}
                                                                            {...register("id")}
                                                                            type="hidden" />
                                                                        <button
                                                                            title='Invalidar resposta '
                                                                            className={`${respostas.estadoresposta.id === 1 ? "flex" : "invisible"} font-medium cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:brightness-75`}>
                                                                            <AiOutlineDelete />
                                                                        </button>
                                                                    </form>
                                                                </td>


                                                            </tr>

                                                        ))
                                                    ) : (
                                                        filteredDocente?.map((respostas, index) => (
                                                            <tr

                                                                key={index}
                                                                className=''>
                                                                <td className="p-2">
                                                                    <input type="checkbox" className="w-5 h-5" value={respostas.id}
                                                                    />
                                                                </td>
                                                                <td className="p-2">
                                                                    <div className="font-medium text-gray-800">
                                                                        {respostas.indicador.descricao}
                                                                    </div>
                                                                </td>
                                                                <td className="p-2">
                                                                    <div className="font-medium text-gray-800">
                                                                        {respostas.indicador.pontuacao}
                                                                    </div>
                                                                </td>

                                                                <td className="p-2">
                                                                    <div className="font-medium text-gray-800">
                                                                        {respostas.resposta}
                                                                    </div>
                                                                </td>
                                                                <td

                                                                    className="p-2">
                                                                    <div
                                                                        onClick={() => Router.push(`${respostas.documento_compravante}`)}
                                                                        className="font-medium text-gray-800">
                                                                        {respostas.documento_compravante || "não possue"}
                                                                    </div>
                                                                </td>

                                                                <td

                                                                    className="p-2 flex items-center gap-2">
                                                                    <button
                                                                        title='Validar resposta'
                                                                        className={`${respostas.estadoresposta.id === 1 ? "flex" : "hidden"} font-medium cursor-pointer bg-azul text-white px-4 py-2 rounded hover:brightness-75`}>
                                                                        <FaCheck />
                                                                    </button>
                                                                    <button
                                                                        title='Invalidar resposta'
                                                                        className={`${respostas.estadoresposta.id === 1 ? "flex" : "hidden"} font-medium cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:brightness-75`}>
                                                                        <AiOutlineDelete />
                                                                    </button>
                                                                </td>


                                                            </tr>

                                                        ))
                                                    )
                                            )
                                        }

                                    </tbody>
                                </table>
                            </>

                            {/**  <!-- total amount --> */}
                            <div className="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                                <div>Total</div>
                                <div className="text-blue-600"> <span x-text="total.toFixed(2)">{respostasAvaliacao?.length}</span></div>
                            </div>

                            <div className="flex justify-end">
                                {/**  <!-- send this data to backend (note: use className 'hidden' to hide this input) --> */}
                                <input type="hidden" className="border border-black bg-gray-50" x-model="selected" />
                            </div>
                        </div>
                    </div >
                </section >
            </main>
        </>
    );
}

export default ValidarAvaliacao;