import React from 'react'
import { LogoutBtn, Logo, Container, ThemeButton } from '../index.js'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

    const loginStatus = useSelector(state => state.auth.loginStatus);
    const navigate = useNavigate();

    const navItems = [
        {
            name : "Home",
            slug : '/',
            active : true
        },
        {
            name : "Login",
            slug : '/login',
            active : !loginStatus
        },
        {
            name : "Signup",
            slug : '/signup',
            active : !loginStatus
        },
        {
            name : "My Posts",
            slug : '/all-posts',
            active : loginStatus
        },
        {
            name : "Add Post",
            slug : '/add-post',
            active : loginStatus
        }
    ]

    const navLinkStyles = ({ isActive }) => {
        return {
            
          color: '',
          fontWeight: isActive ? 'bolder' : 'normal',
          backgroundColor : isActive ? 'rgb(148, 163, 184) dark:rgb(16 185 129)' : '',
          borderRadius: '15px'
        };
    };


    return (
        <header className='w-full p-4 bg-slate-300 dark:bg-slate-700 dark:text-white shadow-md dark:shadow-2xl dark:shadow-zinc-400'>
            <Container>
                <nav className='flex justify-center md:justify-between flex-wrap'>
                    <div className=' mx-2 my-1'>
                        <Link to='/' >
                            <Logo width='70px'   />
                        </Link>
                    </div>
                    <div className={`${loginStatus? 'md:pl-[15.1rem]' : 'md:pl-[3.3rem]'} text-black dark:text-white sm:pl-[1.2rem] w-auto flex justify-evenly flex-wrap`}>
                        {navItems.map((item) => 
                        item.active ? (
                        <NavLink key={item.name}
                        style={navLinkStyles}
                        to={`${item.slug}`}
                        >
                            <button

                            // onClick={() => navigate(item.slug)}
                            className='py-2 w-[6rem] hover:bg-slate-400 dark:hover:bg-emerald-700  rounded-xl m-2'
                            >{item.name}</button>
                        </NavLink>
                        ) : null
                        )}
                        
                    </div>
                    <div className='flex justify-between h-auto'>
                        {loginStatus && (
                            <NavLink 
                            style={navLinkStyles}
                            className='px-4 py-2 my-2 w-[8rem] duration-200 hover:bg-blue-100 dark:hover:bg-emerald-700 rounded-full text-center cursor-pointer '
                            to={'/my-account'}
                            // onClick={() => navigate('/my-account')}
                            >
                                My Account
                            </NavLink>
                        )}
                        {loginStatus && (
                            <div> 
                                <LogoutBtn />
                            </div>
                        )}
                        <div className={`${!loginStatus ? "m-4 sm:mt-[1.1rem]" : 'pt-4 sm:pt-0 sm:m-4'}`}>
                            <ThemeButton />
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header
