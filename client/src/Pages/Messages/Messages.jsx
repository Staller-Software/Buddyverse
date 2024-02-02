import React, { useEffect, useState } from 'react';
import SideBar from "../Sidebar/SideBar";
import TabBar from "../Sidebar/TabBar";
import { useLocation } from "react-router-dom";
import Inbox from './Inbox';
import DmContent from './DmContent';
import DmList from './DmList';
import { useSocket } from '../../SocketContext';
import Cookies from 'js-cookie';

function Messages() {
    const location = useLocation();

    return (

        <div className="flex">
            <SideBar type={"type2"} />

            <div className='text-white min-w-[320px] border-r-[0.5px] border-[#d5d9ff2f] overflow-auto max-h-screen'>
                { /* Dm List */}
                <div className='sticky top-0 w-full pl-[25px] pr-[25px] pt-[35px] pb-[5px] flex flex-col gap-[20px]'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-medium text-[1.3rem]'> { Cookies.get('username') } </h2>
                        <i class="fa-solid fa-pen-to-square cursor-pointer text-[1.3rem]"></i>
                    </div>
                    <div>
                        <p className='font-medium text-[1.1rem]'>Messages</p>
                    </div>
                </div>
                <div className='overflow-auto'>
                    <DmList />
                </div>
            </div>
            { /* Content */}
            {location.pathname.startsWith('/direct/inbox') && <Inbox />}
            {location.pathname.startsWith('/direct/dm') && <DmContent />}

            <TabBar />
        </div>
    )
}
export default Messages;