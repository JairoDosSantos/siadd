import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { api } from '../../service/api';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false });
type ProfessorCardType = {

    nome: string;
    classificacao?: string;
    cargo: string;
    id: number

}

const ProfessorCard = ({ cargo, classificacao, nome, id }: ProfessorCardType) => {
    const route = useRouter()
    const [showAlert, setShowAlert] = useState(false)
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const selectColor = (classificacao: string) => {

        switch (classificacao) {

            case 'Suficiente':
                return 'text-green-500'
            default:
                return 'text-red-500'
        }
    }

    const deleteDocente = async () => {

        try {

            const response = await api.delete('docente/:id', {
                params: {
                    id
                }
            })

            setShowAlert(false)

            console.log(response);

            setShowConfirmAlert(true)

        } catch (error) {
            setShowErrorAlert(true)
        }

    }

    const gotToDocenteInfo = () => {

        route.prefetch(`professores/${id}`)

        route.push(`professores/${id}`)

    }

    return (

        <div className="p-4 sm:w-1/2 lg:w-1/3 w-full">

            <Head>
                <title >Lista | Sistema de avaliação de docentes</title>
            </Head>

            <SweetAlert2
                backdrop={true}
                show={showConfirmAlert}
                title='Sucesso'
                text='Operação realizada com sucesso!'
                onConfirm={() => setShowConfirmAlert(false)}
                didClose={() => setShowConfirmAlert(false)}
                didDestroy={() => setShowConfirmAlert(false)}
                icon='success'
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                confirmButtonColor="#4051ef"
            />

            <SweetAlert2
                backdrop={true}
                show={showAlert}
                title='Atenção!'
                text='Tem a certeza que pretende eliminar este docente do sistema ?'
                icon='question'
                onConfirm={deleteDocente}
                didClose={() => setShowAlert(false)}
                didDestroy={() => setShowAlert(false)}
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                showCancelButton={true}
                cancelButtonText='Cancelar'
                confirmButtonColor="#4051ef"
                confirmButtonText="Sim" />

            <SweetAlert2
                backdrop={true}
                show={showErrorAlert}
                title='Erro ao efectuar operação'
                text='Ocorreu um erro ao efectuar a operação. Por favor,contacte o seu sistema!'
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
            <div className=" flex items-center  justify-between p-4  rounded-lg bg-gray-300 dark:bg-white
             shadow-indigo-50 shadow-md relative">
                <AiOutlineClose
                    onClick={() => setShowAlert(true)}
                    title='Apagar este professor do sistema'
                    className='h-6 w-6 absolute right-2 top-2 cursor-pointer hover:text-indigo-500' />
                <div >
                    <div className='w-38  text-left'>
                        <h2 className="text-gray-900 text-lg font-bold">{nome}</h2>
                        {
                            classificacao?.length ?
                                <h3 className={`mt-2 text-xl font-bold ${selectColor(classificacao)} text-left`}>{classificacao}</h3>
                                : ''
                        }
                        <p
                            title='PHD - Engenheiro Informático'
                            className="text-sm font-semibold text-gray-400 truncate w-36 cursor-default">{cargo}</p>
                    </div>
                    <button
                        onClick={gotToDocenteInfo}
                        className="text-sm mt-6 px-4 py-2 bg-[#304FFE]  
                                        text-white rounded-lg font-laonoto tracking-wider hover:bg-indigo-500 outline-none">Ver perfil</button>
                </div>
                <div
                    className="bg-gradient-to-tr from-blue-600 to-indigo-600 w-32 h-32 
                     rounded-full shadow-2xl shadow-[#304FFE] border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                        <h1 className="text-white text-2xl">
                            <FaChalkboardTeacher className='w-16 h-16' />
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfessorCard;