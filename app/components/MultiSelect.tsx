// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import { X, ChevronDown, Check } from 'lucide-react';

// interface MultiSelectProps {
//   label: string;
//   options: string[];
//   selected: string[];
//   onChange: (selected: string[]) => void;
//   placeholder?: string; 
// }

// export default function MultiSelect({ label, options, selected, onChange, placeholder = 'Select options' }: MultiSelectProps) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);

//     const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));

//     const toggleOption = (option: string) => {
//         if (selected.includes(option)) {
//             onChange(selected.filter(item => item !== option));
//         } else {
//             onChange([...selected, option]);
//         }
//         setSearchTerm('');
//     };

//     const removeOption = (optionRemove: string, e: React.MouseEvent) => {
//         e.stopPropagation();
//         onChange(selected.filter(option => option !== optionRemove));
//     };

//     return (
//         <div className='relative w-full '>
//             <label className='block text-sm font-bold text-gray-700 mb-1 '>
//                 {label}


//             </label>

//             <div
//             onClick={() => setIsOpen(!isOpen)}
//             className='min-h-40 p-2 border-gray-300 rounded-md bg-white cursor-text flex flex-wrap gap-3 items-center hover:border-zinc-400 focus-within:ring-zinc-500 transition-all' 
            
//             >
//                 {selected.map(option => (
//                     <span key={option} className='bg-red-50 text-red-800 text-sm px-2 py-0.5 rounded-full flex items-center gap-1 border border-red-100 '>
//                         {option} 
//                         <button onClick={(e) => removeOption(option, e)} className='hover:text-red-600 focus:outline-none'>
//                             <X className='h-3 w-3'/>
//                         </button>

//                     </span>
//                 ))}

//                 <input
//                 type='text'
//                 value={searchTerm}
//                 onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setIsOpen(true);
//                 }}
//                 placeholder={selected.length === 0 ? placeholder : ""}
//                 className='flex-1 min-w-60 outline-none text-sm bg-transparent placeholder:text-gray-400'
//                 />
               

//                <ChevronDown className={`h-4 w-4 text-gray-400 ml-auto transition-transform ${isOpen ? "rotate-180" : ''}`} />

//             </div>



//             {isOpen && (
//                 <div className='absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-r-md shadow-2xl max-h-60 overflow-auto'>
//                     {filteredOptions.length === 0 ?(
//                         <div className='p-6 text-sm text-gray-500 text-center'> No matches found

//                         </div>
//                     ) : (

//                         filteredOptions.map(options => (
//                             <div
//                             key={options}
//                             onClick={() => toggleOption(options)}
//                             className='px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between group]:'
//                             >
//                              <span className= {selected.includes(options) ? 'font-medium text-red-800' : 'text-gray-50-700'}>
//                                 {options}

//                              </span>
//                              {selected.includes(options) && <Check className='h-4 w-4 text-red-800' />}

//                             </div>
//                         ))
//                     )}

//                 </div>
//             )}

//         </div>
//     );
        
    

//         }