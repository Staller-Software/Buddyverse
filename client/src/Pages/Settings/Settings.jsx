import { Link, useLocation } from "react-router-dom";
import Edit from "./Edit";
import SideBar from "../Sidebar/SideBar";
import TabBar from "../Sidebar/TabBar";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import LoadingSpinner from "../LoadingBar";

function Profile() {
    let location = useLocation();
    const [loading, setLoading] = useState(true);
    const [informations, setInformations] = useState(null);
    useEffect(() => {
        const postData = {
            "userId": Cookies.get("userid")
        };

        fetch("https://api.stallersoftware.com/get_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === "error") {
                    alert(result.message);
                }
                else {
                    setInformations({
                        username: result.username,
                        name: result.name,
                        surname: result.surname,
                        biography: result.biography,
                        avatar: result.avatar,
                        gender: result.gender
                    });
                }
                setLoading(false);
            })
            .catch(error => {
                alert("Something went wrong: " + error);
                setLoading(false);
            });
    }, [])
    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="flex">
            <SideBar type={"type1"} />
            <div className="flex flex-col gap-[10px] min-w-[280px] border-r-[0.5px] pl-[10px] pr-[10px] pt-[42px] border-[#d5d9ff2f]">
                <h1 className="text-white ml-[25px] font-medium text-[1.4rem]">Settings</h1>
                <Link to="/settings/edit" className="flex justify-center items-center text-white w-full">
                    <p className={`w-[90%] rounded-[12px] h-[45px] flex gap-[12px] font-medium text-[1rem] items-center pl-[15px] ${location.pathname.startsWith("/settings/edit") && 'bg-[#d5d9ff18]'} hover:bg-[#d5d9ff0a] duration-[.4s] text-left`}>
                        <i className={`min-w-[20px] max-w-[20px] fa-regular fa-address-book text-[1.5rem] text-white`}></i>
                        Edit profile</p>
                </Link>
                <Link to="/settings/password" className="flex justify-center items-center text-white w-full">
                    <p className={`w-[90%] rounded-[12px] h-[45px] flex gap-[12px] font-medium text-[1rem] items-center pl-[15px] ${location.pathname.startsWith("/settings/password") && 'bg-[#d5d9ff18]'} hover:bg-[#d5d9ff0a] duration-[.4s] text-left`}>
                        <i className="min-w-[20px] max-w-[20px] fa-solid fa-lock"></i>
                        Change Password</p>
                </Link>
                <Link to="/settings/email" className="flex justify-center items-center text-white w-full">
                    <p className={`w-[90%] rounded-[12px] h-[45px] flex gap-[12px] font-medium text-[1rem] items-center pl-[15px] ${location.pathname.startsWith("/settings/email") && 'bg-[#d5d9ff18]'} hover:bg-[#d5d9ff0a] duration-[.4s] text-left`}>
                        <i className="min-w-[20px] max-w-[20px] fa-solid fa-envelope"></i>
                        Email</p>
                </Link>
            </div>
            {location.pathname.startsWith("/settings/edit") && <Edit {...informations} />}
            <TabBar />
        </div>
    )
}
export default Profile;