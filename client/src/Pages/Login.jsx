import styles from './Styles/login.module.css';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LoginPost = async () => {
        try {
            const response = await fetch("https://api.stallersoftware.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                alert(responseData?.message);
                if (responseData?.status === 'ok') {
                    const expirationDate = new Date();
                    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                    Cookies.set('email', responseData.email, {
                        expires: expirationDate,
                        path: '/'
                    });
                    Cookies.set('username', responseData.username, {
                        expires: expirationDate,
                        path: '/'
                    });
                    Cookies.set('avatar', responseData.avatar, {
                        expires: expirationDate,
                        path: '/'
                    });
                    Cookies.set('userid', responseData.userid, {
                        expires: expirationDate,
                        path: '/'
                    });
                    Cookies.set('password', responseData.password, {
                        expires: expirationDate,
                        path: '/'
                    });
                    window.location.href = '/';
                }
            }
            else {
                alert("An error occurred while logging in");
            }
        }
        catch (error) {
            alert("Error: " + error);
        }
    };

    useEffect(() => {
        document.title = 'Buddychat - Register';
    }, [])
    return (
        <div className={`${styles.logincontainer} flex justify-center items-center`}>
            <div className={`${styles.login_infocontainer} w-max h-[100vh] pl-[10px] pr-[10px] flex flex-col justify-center  items-center`}>
                <div className='w-[450px] bg-[#12151a] p-[30px] rounded-[8px] flex flex-col items-center'>
                    <h2 className='text-white w-[100%] text-left text-[1.5rem] font-semibold mb-[20px]'>✍️ Enter your information.</h2>

                    <label className='text-white mt-[20px] mb-[3px] text-left w-[100%]'> E-mail Adress: </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-[100%] rounded-[8px] h-[40px] text-white pl-[6px] pr-[6px] bg-[#0c0f12] focus:border-[3px] focus:border-blue-600 outline-none' type='email'></input>

                    <label className='text-white mt-[20px] mb-[3px] text-left w-[100%] '> Password: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-[100%] rounded-[8px] h-[40px] text-white pl-[6px] pr-[6px] bg-[#0c0f12] focus:border-[3px] focus:border-blue-600  outline-none' type='password'></input>

                    <button onClick={LoginPost} className='flex gap-[10px] justify-center items-center text-white mt-[10px] duration-300 bg-blue-700 hover:bg-blue-900 rounded-[8px] w-[100%] h-[40px]'><i class="fa-solid fa-right-to-bracket"></i>  Login </button>

                    <a href='/register' className='cursor-pointer hover:underline text-left w-[100%] text-blue-600 mt-[10px]'> Don't have an account? </a>

                </div>
            </div>
        </div>
    )
}

export default LoginPage;