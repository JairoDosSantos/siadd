import { Combobox, Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { api } from '../service/api';

interface SearchModalDocentesProps {
    searchOpenModal: boolean;
    setSearchOpenModal: (value: boolean) => void
}

/**
 * interface PedidoType {
    solicitante: string;
    obra: number;
    pedido: string;
    data: string;
    isPedding: boolean;
    totalAmount: number
}
 */

interface IDocente {

    id?: number;
    nome_docente: string;
    grau_academico_id: number;
    categoria_profissional_id: number

}

/**
 * 
 *
type DocenteType = {
    docente: IDocente;
    estado: string;
    valor: number
}
 */

type generalType = {
    descricao: string;
    id?: number
}


const Search = ({ searchOpenModal, setSearchOpenModal }: SearchModalDocentesProps) => {



    //const transictions = useTransition();
    //  const { pedidos } = useAppSelector((state) => state.combineReducer.pedidoSlice)
    const route = useRouter()
    const [query,
        setQuery] = useState('')

    const getAllDocentes = async () => {

        const { data } = await api.get('/docente');

        return data as IDocente[]
    }

    const getAllCategories = async () => {
        const { data } = await api.get('/categoria');

        return data as generalType[]
    }

    const getAllGree = async () => {

        const { data } = await api.get('/grauAcademico');

        return data as generalType[]
    }

    const { data, isLoading } = useQuery("fetchSeachDocente", getAllDocentes)
    const { data: categories } = useQuery("fetchSeachCategoria", getAllCategories)

    const { data: degrees } = useQuery("fetchSeachDegree", getAllGree)

    const findCategoria = (id: number) => {
        return (categories?.find((categoria) => categoria.id === id))?.descricao
    }

    const findDegree = (id: number) => {
        return (degrees?.find((degree) => degree.id === id))?.descricao
    }

    //const transictions: any = [{ name: 'Jairo dos Santos', category: 'Personalizado', year: '2014', month: 'Fevereiro' }]

    const filteredDocentes = query
        ? data?.filter((docente) => docente.nome_docente.toLowerCase().includes(query.toLowerCase()))
        : []

    function closeModal() {
        setQuery('')
        setSearchOpenModal(false)
    }

    function openModal() {
        setSearchOpenModal(true)
    }

    return (
        <>
            <Transition appear show={searchOpenModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500/50" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <div
                                className="relative inline-block  w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl ring-1 ring-black/5 rounded-md">

                                <Combobox
                                    value=''
                                    as="div"
                                    onChange={(value: any) => { route.push(`/admin/professores/${value.id}/`); closeModal() }}
                                    className='relative ring-0 focus:ring-0 divide-y divide-gray-100 overflow-hidden'>
                                    <div className='flex items-center px-2 w-96 border-1 border-red-500'>
                                        <HiSearch className='h-6 w-6 space-x-1 text-gray-500/75' />
                                        <Combobox.Input
                                            className='w-full bg-transparent dark:bg-white text-sm rounded-xl focus:ring-0 border-0 placeholder:text-gray-500/75 text-gray-800 font-bold'
                                            onChange={(event) => {
                                                setQuery(event.target.value)
                                            }}
                                            placeholder='Pesquisar...' />
                                    </div>
                                    {
                                        isLoading ? (
                                            <p className='p-4 text-sm text-center text-gray-500'>Buscando por docentes no sistema... ⏳</p>
                                        ) : (
                                            filteredDocentes && (
                                                <Combobox.Options static className='py-4 text-sm max-h-96 overflow-y-auto'>
                                                    {filteredDocentes?.map((docente, index) => (

                                                        <Combobox.Option key={index} value={docente}>
                                                            {({ active }) => (
                                                                <div
                                                                    className={`px-4 py-2 space-x-1 ${active
                                                                        ? 'bg-dourado rounded-xl text-white'
                                                                        : 'bg-white'}`}>
                                                                    <span
                                                                        className={`font-medium hover:cursor-pointer ${active
                                                                            ? 'text-white'
                                                                            : 'text-gray-900'}`}>{docente.nome_docente}
                                                                    </span>
                                                                    <span
                                                                        className={`${active
                                                                            ? 'text-white'
                                                                            : 'text-gray-400'}`}>{`por ${findDegree(docente.grau_academico_id)}- ${findCategoria(docente.categoria_profissional_id)}`}</span>
                                                                </div>
                                                            )}
                                                        </Combobox.Option>
                                                    ))}

                                                </Combobox.Options>

                                            )
                                        )
                                    }

                                    {
                                        query && filteredDocentes?.length === 0 && <p className='p-4 text-sm text-gray-500'>Nenhum docente encontrado no sistema.</p>
                                    }
                                </Combobox>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition >
        </>)

}

export default Search;