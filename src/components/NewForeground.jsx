import React, { useRef, useState } from 'react';
import Card from './NewCard';
import { IoMdAdd } from "react-icons/io";

function AddCardForm({ onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        desc: "",
        filesize: "",
        tag: { isOpen: false, tagTitle: "", tagColor: "blue" }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='bg-zinc-800 p-6 rounded-lg w-96'>
            <h2 className='text-white text-xl mb-4'>Add New Card</h2>
            <input
                type="text"
                placeholder="Description"
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className='w-full mb-3 p-2 bg-zinc-700 text-white rounded'
                required
            />
            <input
                type="text"
                placeholder="File size (e.g., 1.5mb)"
                value={formData.filesize}
                onChange={(e) => setFormData({...formData, filesize: e.target.value})}
                className='w-full mb-3 p-2 bg-zinc-700 text-white rounded'
                required
            />
            <div className='mb-3'>
                <label className='text-white block mb-1'>
                    <input
                        type="checkbox"
                        checked={formData.tag.isOpen}
                        onChange={(e) => setFormData({
                            ...formData,
                            tag: { ...formData.tag, isOpen: e.target.checked }
                        })}
                        className='mr-2'
                    />
                    Add Tag
                </label>
                {formData.tag.isOpen && (
                    <div className='ml-4'>
                        <input
                            type="text"
                            placeholder="Tag Title"
                            value={formData.tag.tagTitle}
                            onChange={(e) => setFormData({
                                ...formData,
                                tag: { ...formData.tag, tagTitle: e.target.value }
                            })}
                            className='w-full mb-2 p-2 bg-zinc-700 text-white rounded'
                            required
                        />
                        <select
                            value={formData.tag.tagColor}
                            onChange={(e) => setFormData({
                                ...formData,
                                tag: { ...formData.tag, tagColor: e.target.value }
                            })}
                            className='w-full p-2 bg-zinc-700 text-white rounded'
                        >
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                )}
            </div>
            <div className='flex justify-end gap-2'>
                <button
                    type="button"
                    onClick={onClose}
                    className='px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-500'
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500'
                >
                    Add Card
                </button>
            </div>
        </form>
    );
}

function Foreground() {
    const ref = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [cards, setCards] = useState([
        { 
            id: 1,
            desc: "Your Stored document would be displayed here",
            filesize: ".9mb", 
            close: false,
            isDone: false,
            tag: { isOpen: true, tagTitle:"Download Now", tagColor:"green"}
        }
    ]);

    const handleAddCard = (newCard) => {
        setCards([...cards, { ...newCard, id: Date.now(), isDone: false }]);
        setShowForm(false);
    };

    const handleDone = (id) => {
        setCards(cards.map(card => 
            card.id === id ? { ...card, isDone: !card.isDone } : card
        ));
    };

    const handleDelete = (id) => {
        setCards(cards.filter(card => card.id !== id));
    };

    return (
        <>
            <div ref={ref} className='fixed z-[3] top-0 left-0 w-full h-full flex gap-8 flex-wrap p-5'>
                {cards.length === 0 ? (
                    <div className='w-full h-full flex items-center justify-center'>
                        <button 
                            onClick={() => setShowForm(true)}
                            className='p-4 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors'
                        >
                            <IoMdAdd size={64} color='white' />
                        </button>
                    </div>
                ) : (
                    <>
                        {cards.map((item) => (
                            <Card 
                                key={item.id} 
                                data={item} 
                                reference={ref}
                                onDone={() => handleDone(item.id)}
                                onDelete={() => handleDelete(item.id)}
                            />
                        ))}
                    </>
                )}
            </div>

            {cards.length > 0 && (
                <button 
                    onClick={() => setShowForm(true)}
                    className='fixed bottom-10 right-10 p-3 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors z-[4]'
                >
                    <IoMdAdd size={24} color='white' />
                </button>
            )}

            {showForm && (
                <div className='fixed inset-0 bg-black/50 z-[5] flex items-center justify-center'>
                    <AddCardForm onSubmit={handleAddCard} onClose={() => setShowForm(false)} />
                </div>
            )}
        </>
    );
}

export default Foreground;
