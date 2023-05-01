import Image from "next/image"

import Logo from '../../assets/uniLuanda.png'

import Link from "next/link"
import { useRouter } from "next/router"
import nookies from 'nookies'
import { useEffect, useState } from "react"
import { BiSearchAlt } from 'react-icons/bi'
import { FaCommentSlash, FaCottonBureau, FaHome, FaPlaneDeparture, FaYammer } from "react-icons/fa"
import { MdOutlineLogout } from 'react-icons/md'
import Search from "../Search"
import ThemeToggler from "../ThemeToggle"

const HeaderAdmin = () => {

    const route = useRouter()
    const [rota, setRota] = useState(route.pathname)
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => { setRota(route.pathname) }, [route.pathname])
    const sair = () => {
        nookies.destroy(null, "USER_LOGGED_CAD")

        route.push("/")
    }
    const openModal = () => setIsOpen(true)

    return (
        <header className="w-full h-56 bg-azul dark:bg-gray-800  dark:border-gray-700 px-8 transition-all duration-300 ">

            <Search searchOpenModal={isOpen} setSearchOpenModal={setIsOpen} />
            {/**Primeira linha, onde estará o logo e o  ícone*/}
            <div className="flex items-center justify-between">
                <Image src={Logo} height={100} width={100} objectFit={"contain"} />
                <div className="flex space-x-4 items-center">
                    <BiSearchAlt
                        onClick={openModal}
                        title="Pesquisar por pedidos"
                        className="text-gray-300 dark:text-white h-7 w-7 rounded cursor-pointer animacao-link" />
                    <ThemeToggler />
                </div>
            </div>

            <nav className="w-full lg:max-w-4xl  lg:ml-auto py-3 flex lg:justify-end">
                <ul className="flex text-gray-200 dark:text-white font-semibold cursor-pointer py-3">

                    <li className={`padding-link-header animacao-link truncate  ${route.pathname === "/admin" ? "activo-header" : ""}`}>
                        <FaHome className="h-4 w-h-4" />
                        <Link href={'/admin/'} className='text-icone'>
                            <span className='text-icone'> Página Inicial</span>
                        </Link>

                    </li>
                    <li className={`padding-link-header animacao-link truncate  ${route.pathname === "/admin/departamento" ? "activo-header" : ""}`}>
                        <FaPlaneDeparture className="h-4 w-h-4" />
                        <Link href={'/admin/departamento'} className='text-icone'>
                            <span className='text-icone'>Gerir Departamento</span>
                        </Link>

                    </li>
                    <li className={`padding-link-header animacao-link truncate  ${route.pathname === "/admin/turma" ? "activo-header" : ""}`}>
                        <FaCommentSlash className="h-4 w-h-4" />
                        <Link href={'/admin/turma'} className='text-icone'>
                            <span className='text-icone'> Gerir Turma</span>
                        </Link>

                    </li>
                    <li className={`padding-link-header animacao-link truncate  ${route.pathname === "/admin/curso" ? "activo-header" : ""}`}>
                        <FaCottonBureau className="h-4 w-h-4" />
                        <Link href={'/admin/curso'} className='text-icone'>
                            <span className='text-icone'>Gerir Curso</span>
                        </Link>
                    </li>
                    <li className={`padding-link-header animacao-link truncate  ${route.pathname === "/admin/eleger_membros_cad" ? "activo-header" : ""}`}>
                        <FaYammer className="h-4 w-4 " />
                        <Link href={'/admin/eleger_membros_cad'} className='text-icone'>
                            <span className='text-icone'>Eleger membros ao CAD</span>
                        </Link>

                    </li>

                    <li
                        onClick={sair}
                        className="padding-link-header animacao-link ">
                        <MdOutlineLogout className="h-4 w-h-4" />

                        <span
                            className='text-icone text-icone'> Encerrar</span>

                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default HeaderAdmin
