import SideBar from "./Sidebar/SideBar";
import TabBar from "./Sidebar/TabBar";

function Reels() {
    return (
        <div className="flex gap-[15px]">
            <SideBar type={"type1"} />
            <div className="w-[100%] h-[100vh] flex justify-center items-center">
                <p className="flex gap-[8px] items-center text-white font-bold mt-[10px]"><i class="fa-solid fa-person-circle-xmark text-[1.8rem]"></i> Reels is currently not providing service.</p>
            </div>
            <TabBar />
        </div>
    )
}
export default Reels;