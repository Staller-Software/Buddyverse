import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from "./Sidebar/SideBar";
import TabBar from "./Sidebar/TabBar";
import { NotFound } from "../App";
import LoadingSpinner from "./LoadingBar";

function Profile() {
    const [loading, setLoading] = useState(true);
    const { usernameParam } = useParams();
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState('/avatars/default-avatar.png');
    const [number_of_followers, setFollowers] = useState(null);
    const [number_of_follows, setFollows] = useState(null);
    const [biography, setBiography] = useState(null);

    function formatBiography(biography) {
        let lines = biography.split('\n');

        let result = '';

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '' && i + 1 < lines.length && lines[i + 1].trim() === '') {
                continue;
            }

            if (lines[i].trim() === '' && i + 1 < lines.length && lines[i + 1].trim() !== '') {
                result += '<br>';
            } else {
                result += lines[i] + '\n';
            }
        }

        return result;
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.stallersoftware.com/get_profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: usernameParam,
                    }),
                });

                const data = await response.json();

                if (data.status !== 'ok') {
                    setErrorMessage(data.message);
                    if (data.message !== 'User not found.') {
                        alert(data.message);
                    }
                } else {
                    setBiography(formatBiography(data.biography));
                    setUsername(data.username);
                    setFollowers(data.followers);
                    setFollows(data.followUps);
                    if (data.avatar !== '') {
                        setAvatar('/avatars/' + data.avatar);
                    }
                }

                setLoading(false); 
            } catch (error) {
                setErrorMessage('Something went wrong: ' + error);
                alert('Something went wrong: ' + error);
                window.location.reload();
            }
        };

        fetchData();
    });
    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="">


            {errorMessage === "User not found." ? (
                <NotFound />
            ) : (
                <div className="flex">
                    <SideBar type={"type1"} />
                    <div className="w-full flex justify-center p-[40px] pl-[0px] pr-[0px]">
                        <div className="w-full flex gap-[80px]  h-max pl-[50px] pr-[50px]">
                            <div className="min-w-[135px] min-h-[135px]">
                                <img src={avatar} className="rounded-full min-w-[135px] max-w-[135px] min-h-[135px] max-h-[135px]"
                                    alt="" width={135} height={135} />
                            </div>
                            <div className="">
                                <div className="flex flex-col gap-[20px]">
                                    <div className="flex gap-[20px]">
                                        <h1 className="text-white font-medium text-[1.4rem]"> {username} </h1>
                                        {username === Cookies.get('username') ? '' :
                                            <div className="flex gap-[8px]">
                                                <button className="text-white font-medium bg-[#2e54cf] rounded-[8px] p-[5px] pl-[25px] pr-[25px]"> Takip Et </button>
                                                <button className="text-white font-medium bg-[#272a35c9] rounded-[8px] p-[5px] pl-[25px] pr-[25px]"> Mesaj Gönder </button>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex gap-[40px]">
                                        <p className="text-white text-[1.2rem]">  <span className="font-medium"> {number_of_followers} </span> follower </p>
                                        <p className="text-white text-[1.2rem]">  <span className="font-medium"> {number_of_follows}  </span> follow </p>
                                    </div>
                                    {biography !== "" && <p className="text-white" dangerouslySetInnerHTML={{ __html: biography }}></p>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            <TabBar />
        </div>
    )
}

export default Profile;