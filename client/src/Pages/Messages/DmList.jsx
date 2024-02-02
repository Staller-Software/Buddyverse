import { Link, useParams } from 'react-router-dom';

function DmList() {
    const { id } = useParams();

    const users = [
        { id: '1', name: 'Mert', message: 'Naber kanka?' },
        { id: '20', name: 'Ahmet', message: 'Selam!' },
        // Diğer kullanıcılar
    ];

    const isCurrentLink = (linkId) => {
        return id === linkId;
    };

    return (
        <div className='w-full overflow-auto '>
            <div className='w-full flex gap-[10px] flex-col justify-center items-center mt-[10px] overflow-auto'>
                {users.map(user => (
                    <Link key={user.id} to={`/direct/dm/${user.id}`} id={user.id} className={`flex items-center justify-center min-w-full`}>
                        <p className={`flex rounded-[12px] w-[90%] gap-[15px] duration-[.4s] pt-[10px] pl-[10px] translate-x-[2px] pb-[10px] ${isCurrentLink(user.id) ? 'bg-[#d5d9ff18]' : 'transparent'} hover:bg-[#d5d9ff0a]`}>
                            <span className='rounded-[50px] w-[40px] h-[40px] bg-gray-500'></span>
                            <div>
                                <p>{user.name}</p>
                                <p className='text-[rgb(170,170,170)]'>{user.message}</p>
                            </div>
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )

}
export default DmList;