import React from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion"

function Card({data, reference, onDone, onDelete}) {
    return (
        <motion.div 
            drag 
            dragConstraints={reference} 
            whileDrag={{scale:1.1}} 
            dragTransition={{bounceStiffness:100, bounceDamping:30}} 
            className={`relative flex-shrink-0 w-60 h-72 rounded-[45px] ${data.isDone ? 'bg-green-900/90' : 'bg-zinc-900/90'} text-white px-8 py-10 overflow-hidden`}
        >
            <FaRegFileAlt/>
            <p className='text-sm leading-tight mt-5 font-semibold'>{data.desc}</p>
            <div className='footer absolute bottom-0 w-full left-0'>
                <div className='flex items-center justify-between px-8 py-3 mb-3'>
                    <h5>{data.filesize}</h5>
                    <div className='flex gap-2'>
                        <button
                            onClick={onDone}
                            className={`w-7 h-7 ${data.isDone ? 'bg-green-600' : 'bg-zinc-600'} rounded-full flex items-center justify-center hover:opacity-80`}
                        >
                            ✓
                        </button>
                        <button
                            onClick={onDelete}
                            className='w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center hover:bg-red-600'
                        >
                            <IoClose />
                        </button>
                    </div>
                </div>
                {data.tag.isOpen && (
                    <div className={`tag w-full py-4 ${data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"} flex items-center justify-center`}>
                        <h3 className='text-sm font-semibold'>{data.tag.tagTitle}</h3>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default Card;
