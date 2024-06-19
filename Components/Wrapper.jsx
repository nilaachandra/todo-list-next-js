
const Wrapper = ({children}) => {
  return (
    <div className='w-full min-h-screen py-4 lg:px-[25vw] px-4 text-white bg-zinc-900'>
        {children}
    </div>
  )
}

export default Wrapper