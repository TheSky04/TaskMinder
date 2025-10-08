import React from 'react'

function ConfirmModal({setOpenConfirmModal}) {
  return (
    <>
        <div
            className="fixed inset-0 bg-gray bg-opacity-90 backdrop-blur-sm z-9"
            onClick={() => setOpenConfirmModal(false)}
        ></div>

        <div className='pl-10 p-10 rounded-md absolute bg-white shadow-md w-[30rem] h-[15rem] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-center flex-col'>
            <h2 className='text-2xl font-bold mb-5'>Are you sure you want to delete this task?</h2>
            <div className='flex gap-5'>
                <button className='bg-violet-500 text-white py-2 px-5 rounded-md hover:bg-violet-700 transition-all'>Delete</button>
                <button className='bg-gray-300 text-black py-2 px-5 rounded-md hover:bg-gray-500 transition-all' onClick={() => setOpenConfirmModal(false)}>Cancel</button>
            </div>
        </div>
    </>
  )
}

export default ConfirmModal