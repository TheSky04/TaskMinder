import React from 'react'

function Header() {

    const bellLogo = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>);
    const profilePhoto = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>);
    const chewronDownLogo = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>);
    const searchIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>);

  return (
    <div className='flex justify-between items-center p-14 pb-5 border-b-1 border-gray-200'>
        <div>
            <p className='text-black text-5xl font-bold pb-3'>Hello, Furkan</p>
            <p className='text-gray-500 text-xl'>Lets organize your Daily Tasks</p>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-96 px-3 py-2 pl-2">
            <span>{searchIcon}</span>
            <input
                type="text"
                placeholder="Search"
                className="flex-grow outline-none"
            />
        </div>
        <div className='flex items-center gap-6 pr-10'>
            <span>{bellLogo}</span>
            <span>{profilePhoto}</span>
            <div>
                <p className='font-bold text-xl'>Furkan Baş</p>
                <p className='text-gray-500'>User</p>
            </div>
            <span>{chewronDownLogo}</span>
        </div>
    </div>
  )
}

export default Header