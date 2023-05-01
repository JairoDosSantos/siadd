import Image from "next/image"

import Logo from '../assets/uniLuanda.png'

import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiFillHome } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogout } from 'react-icons/md'
import { RiBookLine } from 'react-icons/ri'
import Search from "./Search"
import ThemeToggler from "./ThemeToggle"

import nookies from 'nookies'

const Header = () => {

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
                        className="text-gray-300 dark:text-white h-7 w-7 rounded cursor-pointer animacao-link hidden" />
                    <ThemeToggler />
                </div>
            </div>

            <nav className="w-full lg:max-w-4xl  lg:ml-auto p-3 flex lg:justify-end">
                <ul className="flex space-x-2 lg:space-x-6 text-gray-200 dark:text-white font-semibold cursor-pointer p-3">
                    <li>
                        <Link href={'/dashboard'}>

                            <div className={`animacao-link padding-link-header ${rota === '/dashboard' && 'activo'}`}>
                                <AiFillHome className="h-4 w-h-4" />
                                <span className='text-icone'>Página Inicial</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/me'} >
                            <div className={`animacao-link padding-link-header ${(rota === '/pedidos' || rota.includes('/perfil/')) && 'activo'}`}>
                                <CgProfile className="h-4 w-h-4" />
                                <span className='text-icone'>Perfil</span>
                            </div>
                        </Link>
                    </li>
                    <li className={`animacao-link padding-link-header hidden ${rota === '/items' && 'activo'}`}>
                        <RiBookLine className="h-4 w-h-4" />
                        <Link href={'/'}>
                            <span className='text-icone'>Items</span>
                        </Link>
                    </li>
                    <li className="padding-link-header animacao-link hidden">
                        <CgProfile className="h-4 w-h-4" />
                        <Link href={'/'} className='text-icone'>
                            <span className='text-icone'>Physics</span>
                        </Link>
                    </li>
                    <li
                        onClick={sair} className="padding-link-header animacao-link ">
                        <MdOutlineLogout className="h-4 w-h-4" />

                        <span className='text-icone text-icone'> Encerrar</span>


                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Header
