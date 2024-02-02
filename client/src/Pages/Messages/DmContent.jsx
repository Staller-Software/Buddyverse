import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../SocketContext';
import Cookies from 'js-cookie';
import { DateTime } from 'luxon';

function DmContent() {
    const { id } = useParams();



    const { socket, socketConnected } = useSocket();
    const [message, setMessage] = useState('');
    const [inputClick, setInputClick] = useState(false);
    const now = DateTime.now().setZone("Europe/Istanbul");
    const turkishDateTime = now.toFormat("yyyy-MM-dd HH:mm:ss");
    const SendMessage = () => {
        if (socketConnected) {
            socket.emit('message', JSON.stringify({
                text: message,
                toId: id,
                fromId: Cookies.get("userid"),
                timestamp: turkishDateTime
            }));
        }
    };
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-[8px] p-[12px] w-full border-b border-[#d5d9ff2f]">
                <div className="w-12 h-12 rounded-full bg-gray-500"></div>
                <p className="text-white text-1.2rem">Mert</p>
            </div>
            <div className="p-[15px] overflow-y-auto w-full min-h-[calc(100vh-135px)] max-h-[calc(100vh-135px)]">
                { /* Mesajlar burada olacak */}
                <p className="text-white font-bold text-[20px]">Mesajlar burda olsun</p>


            </div>
            <div className={`mt-[6px] flex bg-[#272a3588] rounded-[12px] w-[97%] p-[8px] pl-[16px] pr-[12px]`}>
                <input
                    value={message}
                    onFocus={() => setInputClick(true)}
                    onBlur={() => setInputClick(false)}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Message..."
                    className="flex-grow font-medium text-white placeholder-[rgb(175,175,175)] outline-none bg-transparent"
                />
                
                <button onClick={SendMessage} className="flex text-[#fafafa] duration-[.4s] rounded-[12px] p-[7px] pl-[7px] pr-[10px] font-medium ml-2">
                    <i className={`fa-solid fa-paper-plane duration-[.4s] text-[1.2rem] ${ message.length > 0 && 'text-[#607fe7]' }`}></i>
                </button>
            </div>
        </div>
    );


}
export default DmContent;