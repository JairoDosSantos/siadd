import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import ModalAddEstudante from '../../../components/Admin/ModalAddEstudante';
import Pagination from '../../../components/Pagination';
import { api } from '../../../service/api';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })


type EstudanteType = {
    id?: number;
    nome_estudante: string;
    email: string;

}

const Disciplinas: NextPage = () => {


    let [isOpen, setIsOpen] = useState(false)
    let [searchStudent, setSearchStudent] = useState("")

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showConfirmeAlert, setShowConfirmeAlert] = useState(false)

    const [messageAlert, setShowMessage] = useState("Ocorreu um erro inesperado. Por favoir, contacte os administradores do sistema!")

    const fetchStudent = async () => {
        try {
            const { data } = await api.get("/estudante/");

            return data as EstudanteType
        } catch (error) {

        }
    }

    const deleteEstudante = async (id: number) => {

        try {

            const response = await api.delete("/estudante/", { data: id });

            if (response.status === 200) {
                setShowSuccessAlert(true)
            }
        } catch (error: any) {
            setShowMessage(error.message)
            setShowErrorAlert(true)
        }
    }

    const { } = useQuery("estudanteLista", fetchStudent)
    const isLoading = false;
    const data = [
        {
            id: 1,
            nome_estudante: "Jairo dos Santos",
            email: "jairocrissantos@gmail.com",
            turma: "B",
            curso: "Informática",
            ano_lectivo: "2020",
            ano_academico: "2º ano"
        },
        {
            id: 2,
            nome_estudante: "Cecil dos Santos",
            email: "cecilcris@gmail.com",
            turma: "B",
            curso: "Informática",
            ano_lectivo: "2020",
            ano_academico: "2º ano"
        }
    ]
    const apagarEstudante = () => {
        setShowConfirmeAlert(false)
        setShowSuccessAlert(true)
    }


    const estudantesFiltrados = searchStudent ? data?.filter((estudante) => estudante.nome_estudante.toLowerCase().includes(searchStudent.toLowerCase())) : []
    return <>
        <SweetAlert2
            backdrop={true}
            show={showSuccessAlert}
            title='Sucesso'
            text='Operação efectuada com sucesso!'
            onConfirm={() => setShowSuccessAlert(false)}
            didClose={() => setShowSuccessAlert(false)}
            didDestroy={() => setShowSuccessAlert(false)}
            icon='success'
            allowOutsideClick={true}
            allowEnterKey={true}
            allowEscapeKey={true}
            showConfirmButton={true}
            confirmButtonColor="#4051ef"
        />
        <SweetAlert2
            backdrop={true}
            show={showConfirmeAlert}
            title='Confirme a informação'
            text='Tem a certeza que pretende eliminar este estudante?'
            onConfirm={apagarEstudante}
            didClose={() => setShowConfirmeAlert(false)}
            didDestroy={() => setShowConfirmeAlert(false)}
            icon='question'
            allowOutsideClick={true}
            allowEnterKey={true}
            allowEscapeKey={true}
            showConfirmButton={true}
            showCancelButton={true}
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
        <HeaderAdmin />
        <main className='px-8 flex gap-8 -mt-10'>
            <Head>
                <title>Estudante | Sistema de avaliação de desempenho de docentes</title>
            </Head>
            <ModalAddEstudante isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className='flex-1'>
                <div className="container px-5 py-16 mx-auto">
                    <div className="flex items-center justify-center gap-4 max-w-fit mb-6 relative mx-auto">

                        <h2 className="font-bold text-center text-xl">Lista de estudantes</h2>


                        <button
                            onClick={() => setIsOpen(true)}
                            title="Cadastrar nova Disciplina"
                            className="botao-icone animacao-link abasolute -top-2 rounded-full h-10 w-10">
                            <BiPlus className="h-4 w-4" />

                        </button>
                    </div>

                    <section className="antialiased ">
                        <div className="flex flex-col justify-center h-full">
                            {/**   <!-- Table --> */}
                            <div className="w-full max-w-2xl lg:max-w-4xl mx-auto bg-white dark:bg-gray-300 shadow-lg 
                rounded-sm border border-gray-200">
                                <header className="px-5 py-4 border-b border-gray-100 w-full">
                                    <div className="font-semibold text-gray-800 rounded-full 
                        bg-gray-50  flex items-center px-4 gap-4  w-full">
                                        <label htmlFor="search">
                                            <FaSearch className='h-6 w-6 text-gray-400' />
                                        </label>
                                        <input
                                            onChange={(event) => setSearchStudent(event.target.value)}
                                            type="search"
                                            id='search'
                                            className='bg-gray-50 dark:bg-white w-full
                                border-none rounded-full text-gray-400 focus:border-none focus:ring-0' />
                                    </div>
                                </header>

                                <div className="overflow-x-auto p-3">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 dark:bg-gray-200">

                                            <tr >
                                                <th></th>
                                                <th className="p-2 text-left">
                                                    <span className="font-semibold ">Estudante</span>
                                                </th>
                                                <th className="p-2 text-left">
                                                    <span className="font-semibold ">Turma à representar</span>
                                                </th>
                                                <th className="p-2 text-left">
                                                    <span className="font-semibold ">Ano acadêmico</span>
                                                </th>
                                                <th className="p-2 text-left">
                                                    <span className="font-semibold ">Curso</span>
                                                </th>
                                                <th className="p-2 text-left">
                                                    <span className="font-semibold ">Ano lectivo</span>
                                                </th>
                                                <th className="p-2 text-left">
                                                    <span className="font-semibold text-center">Acção</span>
                                                </th>
                                            </tr>


                                        </thead>

                                        <tbody className="text-sm divide-y divide-gray-100">
                                            {/**<!-- record 1 --> */}
                                            {
                                                isLoading ? (
                                                    <tr>
                                                        <td className='text-center font-bold'>
                                                            Buscando os estudantes... ⏳
                                                        </td>
                                                    </tr>
                                                ) :
                                                    !searchStudent.length ? (
                                                        data?.map((estudante, index) => (
                                                            <tr key={index}>

                                                                <td className="p-2">
                                                                    <input type="checkbox" className="w-5 h-5" value={estudante.id}
                                                                    />
                                                                </td>

                                                                <td className="p-2 flex flex-col items-start gap-1">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudante.nome_estudante}
                                                                    </span>
                                                                    <span className="font-semibold  text-gray-400 text-xs">{estudante.email}</span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudante.turma}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudante.ano_academico}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudante.curso}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudante.ano_lectivo}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <div className="flex justify-center ">
                                                                        <button onClick={() => setShowConfirmeAlert(true)}>
                                                                            <svg className="w-8 h-8 hover:text-blue-600 rounded-full 
                                                 hover:bg-gray-100 p-1"
                                                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                                                xmlns="http://www.w3.org/2000/svg">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                                                </path>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        ))
                                                    ) : (
                                                        estudantesFiltrados.map((estudanteFiltrada, index) => (
                                                            <tr key={index}>

                                                                <td className="p-2">
                                                                    <input type="checkbox" className="w-5 h-5" value={estudanteFiltrada.id}
                                                                    />
                                                                </td>

                                                                <td className="p-2 flex flex-col items-start gap-1">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudanteFiltrada.nome_estudante}
                                                                    </span>
                                                                    <span className="font-semibold  text-gray-400 text-xs">{estudanteFiltrada.email}</span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudanteFiltrada.turma}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudanteFiltrada.ano_academico}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudanteFiltrada.curso}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <span className="font-medium text-gray-800">
                                                                        {estudanteFiltrada.ano_lectivo}
                                                                    </span>
                                                                </td>

                                                                <td className="p-2 ">
                                                                    <div className="flex justify-center ">
                                                                        <button onClick={() => setShowConfirmeAlert(true)}>
                                                                            <svg className="w-8 h-8 hover:text-blue-600 rounded-full 
                                                 hover:bg-gray-100 p-1"
                                                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                                                xmlns="http://www.w3.org/2000/svg">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                                                </path>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )

                                            }

                                        </tbody>
                                    </table>
                                </div>

                                {/**  <!-- total amount --> */}
                                <div className="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                                    <div>Total</div>
                                    <div className="text-blue-600"> <span x-text="total.toFixed(2)">{data?.length}</span></div>
                                </div>

                                <div className="flex justify-end">
                                    {/**  <!-- send this data to backend (note: use className 'hidden' to hide this input) --> */}
                                    <input type="hidden" className="border border-black bg-gray-50" x-model="selected" />
                                </div>
                            </div>
                        </div >
                    </section >
                    <Pagination />
                </div>

            </div >
        </main >

    </>
}

export default Disciplinas;