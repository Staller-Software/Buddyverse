import React, { useState, useEffect } from 'react';
import styles from '../Styles/sidebar.module.css';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';

function SideBar({ type }) {
    let location = useLocation();

    
    return (
        <div>
            <div className={`${styles.sidebar} border-r-[0.5px] border-[#d5d9ff2f] min-w-[275px] h-[100vh] pb-[30px] pt-[30px] pl-[15px] pr-[15px] text-white`}>
                <div className='flex gap-[15px] mt-[10px] items-center pl-[15px] text-[1rem]'>
                    <img src="/buddyverse_logo.png" width={"45"} height={"45"} alt="" />
                    <p className={`${styles.title}`}> Buddyverse </p>
                </div>
                <div className='mt-[40px] flex flex-col gap-[10px] '>
                    <Link to="/" className={`${styles.link} flex gap-[5px] items-center duration-[0.4s] hover:bg-[#547cffc6] min-h-[55px] text-[1.2rem] font-light pl-[15px] pr-[15px] rounded-[15px] ${location.pathname === '/' ? 'font-bold bg-[#547cff]' : 'font-light '}`}>
                        <i className={`fa-solid fa-house ${styles.linkIco} `}>  </i>
                        <p className={`font-medium text-[1rem] `}> Home </p>
                    </Link>

                    <Link to="/reels" className={`${styles.link} flex   gap-[5px] items-center duration-[0.4s] hover:bg-[#547cffc6] min-h-[55px] text-[1.2rem] font-light pl-[15px] pr-[15px] rounded-[15px] ${location.pathname.startsWith('/reels') ? 'font-bold bg-[#547cff]' : 'font-light '}`}>
                        <i className={`fa-solid fa-clapperboard ${styles.linkIco} `}></i>
                        <p className={`font-medium text-[1rem] `}> Reels </p>
                    </Link>

                    <Link to="/direct/inbox" className={`${styles.link} flex gap-[5px] items-center duration-[0.4s] hover:bg-[#547cffc6] h-[55px] text-[1.2rem] font-light pl-[15px] pr-[15px] rounded-[15px]  ${location.pathname.startsWith('/direct/inbox') || location.pathname.startsWith('/direct/dm') ? 'font-bold bg-[#547cff]' : 'font-light '}`}>
                        <i className={`fa-solid fa-comment ${styles.linkIco} `}></i>
                        <p className={`font-medium text-[1rem]  }`}> Messages </p>

                    </Link>

                    <Link to={'/' + Cookies.get('username')} className={`${styles.link} flex gap-[5px] items-center duration-[0.4s] h-[55px] text-[1.2rem] font-light pl-[15px] pr-[15px] hover:bg-[#547cffc6] rounded-[15px] ${location.pathname === `/${Cookies.get("username")}` || location.pathname === `/${Cookies.get("username")}/` ? 'font-bold  bg-[#547cff]' : 'font-light'
                        }`}
                    >
                     <div className={`${styles.sidebarAvatar} mr-[10px] min-w-[22px] min-h-[22px] max-w-[22px] max-h-[22px] rounded-full bg-center bg-cover ${ location.pathname.startsWith('/' + Cookies.get("username")) && '' }`} style={{ backgroundImage: `url(/avatars/${Cookies.get("avatar")})` }}>

                     </div>
                        <p className={`font-medium text-[1rem]`}> Profile </p>

                    </Link>

                </div>

            </div>
        </div>
    );
};

export default SideBar;