import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import RegisterPage from './Pages/Register';
import LoginPage from './Pages/Login';
import Profile from './Pages/Profile';
import Home from './Pages/Home';
import Reels from './Pages/Reels';
import Messages from './Pages/Messages/Messages';
import Settings from './Pages/Settings/Settings';
import Cookies from 'js-cookie'; 
import { SocketProvider, useSocket } from './SocketContext';

import './tailwind.css';
import SideBar from './Pages/Sidebar/SideBar';
import LoadingSpinner from './Pages/LoadingBar';

const NotFound = () => {
  return (
    <div className='flex w-full'>
      <SideBar type={"type1"} />
      <div className='pt-[35px] flex flex-col gap-[20px] items-center text-center h-[100vh] w-full'>
        <h1 className='text-white font-medium w-full text-center text-[25px]'>
          Sorry, this page cannot be reached.
        </h1>
        <p className='text-white w-full text-center text-[16px]'>The link you clicked may be broken or the page may have been removed. <a href="/" className='hover:underline text-[#547cff]'>Back to the Buddyverse.</a></p>
      </div>
    </div>

  )
};

const App = () => {
  return (
    <Router>
      <SocketProvider>
        <MainApp />
      </SocketProvider>
    </Router>
  );
};

const MainApp = () => {
  const { socket, socketConnected, connectionError } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  let xd = 0;
  
  useEffect(() => {
    
    const CookieControl = async () => {
      if (xd !== 1 && socketConnected && !connectionError) {
        try {
          const email = Cookies.get("email");
          const userid = Cookies.get("userid");
          const password = Cookies.get("password");

          if (email !== undefined && userid !== undefined && password !== undefined) {
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
              if (responseData?.status === 'ok') {
                await UpdateAvatarCookie();
              } else {
                alert(responseData?.message);
              }
            } else {
              alert("An error occurred while logging in");
            }
          } else {
            navigate("/login");
          }
        } catch (error) {
          alert("An error occurred while checking");
        }
      }
      else {
      }
    };

    const UpdateAvatarCookie = async () => {
      if (xd !== 1) {
        try {
          const response = await fetch('https://api.stallersoftware.com/get_info', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "userId": Cookies.get("userid"),
              "why": "getavatar"
            })
          });

          if (response.ok) {
            const result = await response.json();
            if (result.status === "error") {
              alert(result.message);
            } else {
              if (result.avatar !== "") {
                Cookies.set("avatar", result.avatar);
              } else {
                Cookies.set("avatar", "default-avatar.png");
              }
              console.log("Login and Avatar fetching was successful!");
              setAvatarLoaded(true);
            }
          } else {
            alert("Something went wrong while fetching avatar");
          }
        } catch (error) {
          alert("Something went wrong: " + error);
        }
      }
    };
    if (!location.pathname.startsWith('/register') && !location.pathname.startsWith('/login')) {
      CookieControl();
    }
    if (location.pathname.startsWith('/direct') && !location.pathname.startsWith('/direct/dm')) {
      navigate("/direct/inbox");
    }
    if (location.pathname === '/settings' || location.pathname === '/settings/') {
      navigate("/settings/edit");
    }
    if (socketConnected) {
      socket.on('incomingMessage', (message) => {
        console.log("Received new message: " + message);
      });
    }

    return () => {
      if (socketConnected) {
        socket.off('incomingMessage');
      }
    };
  }, [socketConnected, connectionError]); 

  if (!socketConnected || connectionError || !avatarLoaded) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/direct" element={<Messages />} />
        <Route path="/direct/" element={<Messages />} />
        <Route path="/direct/inbox" element={<Messages />} />
        <Route path="/direct/dm/:id" element={<Messages />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:usernameParam" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export { NotFound };
export default App;
