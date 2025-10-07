import React from 'react'

function InputBlock({ id, label, type, value, onChange }) {
    return (
        <div className='grid grid-cols-[10rem_1fr] ml-5 gap-5 mt-10 items-center'>
            <label htmlFor={id} className='text-2xl'>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-500 transition-all"
            />
        </div>
    )
}

export default InputBlock
