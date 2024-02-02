function Inbox() {
    return (
        <div className="flex flex-col gap-[10px] justify-center items-center h-[100vh] w-full">
            <div className="flex justify-center items-center border-[3px] border-white rounded-[150px] w-[100px] h-[100px]">
                <i class="fa-regular fa-comments text-white text-[40px]"></i>
            </div>
            <h1 className="mt-[10px] text-white text-[1.3rem] leading-[1]">Your messages</h1>
            <h1 className="text-[rgb(150,150,150)] text-[1.1rem] leading-[1]">Send photos and messages to a friend or group</h1>
            <button className="mt-[4px] p-[5px] pl-[15px] pr-[15px] duration-[.4s] text-white bg-[#547cff] hover:bg-[#547cffc6] rounded-[8px]">Send Message</button>
        </div>
    )
}
export default Inbox;