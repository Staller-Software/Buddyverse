import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import LoadingSpinner from '../LoadingBar';


function Edit(props) {
    const [username, setUsername] = useState(props.username || '');
    const [name, setName] = useState(props.name || '');
    const [surname, setSurname] = useState(props.surname || '');
    const [avatar, setAvatar] = useState(null);
    const [biography, setBiography] = useState(props.biography || '');
    const [gender, setGender] = useState(props.gender || 'Undefined');
    const [genderComboboxVisible, setGenderComboboxVisible] = useState(false);
    const [textareaActive, setTextAreaActive] = useState(false);
    const [avatarLoadingStatus, setAvatarLoadingStatus] = useState('');

    useEffect(() => {
        if (props.avatar === "") {
            setAvatar('/avatars/default-avatar.png');
        } else {
            setAvatar('/avatars/' + props.avatar);
        }
    }, [props.avatar]);

    const handleTextareaChange = (e) => {
        const newValue = e.target.value;

        if (newValue.length <= 150) {
            setBiography(newValue);
        }
    }

    function GenderComboBox() {
        const toggleGenderCombobox = () => {
            setGenderComboboxVisible(!genderComboboxVisible);
        };

        return (
            <div className='mt-[10px]'>

                <div
                    onClick={toggleGenderCombobox}
                    className={`mt-[10px] w-full flex flex-col justify-center text-white rounded-[12px] min-h-[35px] bg-[#d5d9ff18]  cursor-pointer ${genderComboboxVisible == true && 'rounded-b-[0px]'}`}>

                    <p className={`rounded-[12px] rounded-b-[0] flex justify-between items-center pl-[10px] pr-[15px] ${genderComboboxVisible && 'bg-[#547cff]  pt-[15px] pb-[15px]'}`}>
                        <span className='font-medium'>Choose your gender ({gender})</span>

                        <i className={`${genderComboboxVisible ? 'fa-solid fa-xmark' : 'fa-solid fa-chevron-down'} `}></i>
                    </p>
                    <div className={`dropDownItem ${genderComboboxVisible ? 'flex' : 'hidden'}`}>
                        <ul className='w-full'>
                            <li onClick={() => setGender('Male')} className='text-[1.1rem] flex gap-[6px] pl-[10px]  h-[35px] items-center text-white hover:bg-[#d5d9ff18] '><i className="fa-solid fa-person"></i> Male</li>
                            <li onClick={() => setGender('Woman')} className='text-[1.1rem] flex gap-[6px] h-[35px] items-center pl-[10px] text-white hover:bg-[#d5d9ff18] '><i className="fa-solid fa-person-dress"></i> Woman</li>
                            <li onClick={() => setGender('Undefined')} className='text-[1.1rem] flex gap-[6px] h-[35px] items-center pl-[10px] text-white hover:bg-[#d5d9ff18] '><i className="fa-solid fa-question"></i> I don't want to specify</li>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }



    const getFileExtension = (fileName) => {
        return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
    };
    const handleAvatarFileChange = () => {
        const fileInput = document.getElementById('avatarInput');
        const file = fileInput.files[0];
        document.getElementById('avatarInput').value = '';
        if (file) {
            setAvatarLoadingStatus('loading');
            ChangeAvatar(file, getFileExtension(file.name));
        }
        else {
            alert("There is no file.");
        }
    };
    function SaveEdits() {
        const postData = {
            "username": username,
            "name": name,
            "surname": surname,
            "biography": biography,
            "gender": gender,
            "userId": Cookies.get("userid")
        };

        fetch("https://api.stallersoftware.com/save_edits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(results => {
                alert(results.message);
                if (results.status === "ok") {
                    Cookies.set("username", username);
                }
            })
            .catch(error => {
                alert("Something went wrong: " + error);
            });
    }

    const OpenAvatarInput = () => {
        document.getElementById('avatarInput').click();
    }

    function ChangeAvatar(file, filename) {
        if (!file) {
            alert("Avatar could not be selected.");
            return;
        }

        const formData = new FormData();
        formData.append('userId', Cookies.get("userid"));
        formData.append('avatar', file);

        axios.post('https://api.stallersoftware.com/change_avatar', formData)
            .then(response => {

                alert(response.data.message);
                if (response.data.status === "ok") {
                    window.location.reload();
                }
                else {
                    setAvatarLoadingStatus('');

                    //   window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Avatar could not be changed: " + error.message);
                setAvatarLoadingStatus('');
                window.location.reload();
            });
    }
    const RemoveAvatar = () => {
        if (Cookies.get("avatar") !== "" && Cookies.get("avatar") !== "default-avatar.png") {
            fetch('https://api.stallersoftware.com/remove_avatar', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: Cookies.get('userid')
                })
            })
                .then(response => response.json())
                .then(result => {
                    alert(result.message);
                    if (result.status === "ok") {
                        window.location.reload();
                    }
                })
                .catch(error => {
                    alert("Something went wrong: " + error);
                });
        }
        else {
            alert("You don't have an avatar anyway.");

        }
    }
    return (
        <div className="flex flex-col items-center max-h-screen w-full pt-[42px] pb-[42px] overflow-auto">
            <div className='flex flex-col justify-start items-center min-w-[70%] max-w-[70%]'>
                <h1 className='text-white font-medium text-[1.4rem] text-left w-full mb-[20px]'> Edit Profile </h1>

                <div className='w-full'>
                    <div className='mb-[30px]'>
                        <input className='hidden' type="file" id="avatarInput" onChange={(e) => { handleAvatarFileChange(); }} accept=".jpg, .jpeg, .png, .gif" />

                        <label className="text-white font-medium text-[1.2rem] text-left w-full"> Your Avatars </label>
                        <img className='mt-[10px] rounded-full min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px]' src={avatar} width={100} height={100}></img>
                        <label
                            onClick={OpenAvatarInput}
                            className='cursor-pointer  text-[rgb(218,226,255)] font-medium text-[0.9rem] text-left w-full'> {avatarLoadingStatus === 'loading' ? 'Avatar is being updated, do not close the page.' : 'Change your avatar'} </label>
                        {Cookies.get("avatar") !== "" && Cookies.get("avatar") !== "default-avatar.png" && (
                            <label
                                onClick={RemoveAvatar}
                                className={`cursor-pointer text-[rgb(255,218,218)] font-medium text-[0.9rem] text-left w-full ${avatarLoadingStatus === 'loading' ? 'hidden' : 'flex'
                                    }`}
                            >
                                Remove avatar
                            </label>
                        )}

                    </div>


                    <label className="text-white font-medium text-[1.2rem] text-left w-full"> Username </label>
                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='mt-[10px] mb-[30px] text-left w-full bg-[#d5d9ff18] outline-none rounded-[12px] p-[8px] pl-[15px] pr-[15px] text-white font-medium' />

                    <label className="text-white font-medium text-[1.2rem] text-left w-full"> Name </label>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-[10px] mb-[30px] text-left w-full bg-[#d5d9ff18] outline-none rounded-[12px] p-[8px] pl-[15px] pr-[15px] text-white font-medium' />

                    <label
                        className="text-white font-medium text-[1.2rem] text-left w-full"> Surname </label>
                    <input type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className='mt-[10px] mb-[30px] text-left w-full bg-[#d5d9ff18] outline-none  rounded-[12px] p-[8px] pl-[15px] pr-[15px] text-white font-medium' />

                    <label className="text-white font-medium text-[1.2rem] text-left w-full mb-[10px]"> Biography </label>

                    <div className={`mt-[10px] mb-[30px] relative bg-[#d5d9ff18] rounded-[12px] h-[75px]`}>
                        <textarea type="text" onFocus={() => setTextAreaActive(true)}
                            onBlur={() => setTextAreaActive(false)}
                            value={biography}
                            onChange={handleTextareaChange}
                            className='resize-none max-w-[85%] max-h-[75px] mt-[10px] mb-[30px] text-left w-full outline-none bg-transparent p-[3px] pl-[15px] pr-[15px] text-white font-medium' />
                        <p className='absolute bottom-[5px] right-[15px] text-[rgb(175,175,175)]'> {biography.length}/150 </p>
                    </div>

                    <GenderComboBox />

                    <div className='flex justify-end mt-[10px]'>
                        <button
                            onClick={SaveEdits}
                            className=' text-white duration-[.4s] bg-[#547cff] hover:bg-[#547cffc6] p-[10px] rounded-[12px] w-[200px]'> Save </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Edit;