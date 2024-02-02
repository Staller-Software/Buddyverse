import { useState, useEffect } from 'react';
import styles from './Styles/register.module.css';
function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const RegisterPost = async () => {
        try {
            const response = await fetch('https://api.stallersoftware.com/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: name,
                    surname: surname,
                    email: email,
                }),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                alert(responseData?.message);
                if (responseData?.status === 'ok')
                {
                    window.location.href = '/login';
                }
            } else {
                console.error("An error occurred while registering");
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    useEffect(() => {
        document.title = 'Buddychat - Register';
    }, [])

    return (
        <div className={`${styles.registercontainer} flex justify-center items-center`}>
            <div className={`${styles.register_infocontainer}  w-max h-[100vh] pl-[10px] pr-[10px] flex flex-col justify-center  items-center`}>
                <div className='w-[450px] bg-[#12151a] p-[30px] rounded-[8px] flex flex-col items-center'>
                    <h2 className='text-white w-[100%] text-left text-[1.5rem] font-semibold mb-[20px]'>✍️ Enter your information.</h2>

                    <label className='text-white mt-[20px] mb-[3px] text-left w-[100%]'> Username: </label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className='w-[100%] rounded-[8px] h-[40px] text-white pl-[6px] pr-[6px] bg-[#0c0f12] focus:border-[3px] focus:border-blue-600  outline-none' type='text'></input>

                    <label className='text-white mt-[20px] mb-[3px] text-left w-[100%]'> Name: </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className='w-[100%] rounded-[8px] h-[40px] text-white pl-[6px] pr-[6px] bg-[#0c0f12] focus:border-[3px] focus:border-blue-600  outline-none' type='text'></input>

                    <label className='text-white mt-[20px] mb-[3px] text-left w-[100%]'> Surname (Optional): </label>
                    <input value={surname} onChange={(e) => setSurname(e.target.value)} className='w-[100%] rounded-[8px] h-[40px] text-white pl-[6px] pr-[6px] bg-[#0c0f12] focus:border-[3px] focus:border-blue-600  outline-none' type='text'></input>

                    <label className='text-white mt-[20px] mb-[3px] text-left w-[100%]'> E-mail Adress: </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-[100%] rounded-[8px] h-[40px] text-white pl-[6px] pr-[6px] bg-[#0c0f12] focus:border-[3px] focus:border-blue-600 outline-none' type='email'></input>

                    <label className='text-white mt-[20px] mb-[3px] text-left w-[100%] '> Password: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-[100%] rounded-[8px] h-[40px] text-white pl-[6px] pr-[6px] bg-[#0c0f12] focus:border-[3px] focus:border-blue-600  outline-none' type='password'></input>

                    <button onClick={RegisterPost} className='flex gap-[10px] justify-center items-center text-white mt-[10px] duration-300 bg-blue-700 hover:bg-blue-900 rounded-[8px] w-[100%] h-[40px]'><i class="fa-solid fa-user-plus"></i>  Register </button>

                    <a href='/login' className='cursor-pointer hover:underline text-left w-[100%] text-blue-600 mt-[10px]'> Do you have an account? </a>

                </div>
            </div>
        </div>
    )
}

export default RegisterPage;