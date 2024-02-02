const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen gap-[35px]">
        <div className="animate-spin rounded-full h-[35px] w-[35px] border-t-2 border-[#547cff] border-opacity-100 relative">
        </div>
  
        <div className='fixed bottom-[10px] text-white text-[1.3rem]'>
          <p>Having connection problems? <a href='/destek' className='text-[#547cff]'>Support</a></p>
        </div>
      </div>
    );
  };

  export default LoadingSpinner;