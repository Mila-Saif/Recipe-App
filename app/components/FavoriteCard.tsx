'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, X, Trash2, ChevronRight } from 'lucide-react';

export default function FavoritesDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  

  useEffect(() => {
    setIsMounted(true);
    const loadFavorites = () => {
      try {
        const saved = localStorage.getItem('favorites');
        if (saved) {
          setFavorites(JSON.parse(saved));
        }
        } catch (error) {
          console.error('Failed to load favorites:', error);
          localStorage.setItem('favorites', '[]');

      }

    };

    loadFavorites();
    

  
    
      window.addEventListener('favoriteUpdate', loadFavorites);
      return() => window.removeEventListener('favoriteUpdate',loadFavorites);
  }, []);


  const removeFavorite =(id: number) => {
      const newFavorites = favorites.filter(fav => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);

      window.dispatchEvent(new Event('favoriteUpdate'));

  };

  return (
    <>
        <button onClick={() => setIsOpen(true)}>
            <div className=' group flex items-center gap-2 bg-red-50 text-red-600 hover:text-white hover:bg-red-800 rounded-full shadow p-3 ' >

                <Heart className="h-4 w-4" />

                <span className=" hidden md:inline">My Favorites</span>
                <span className=' text-red-800 text-xs py-0.5 px-2 group-hover:text-white rounded-full ml-1'>
                    {favorites.length}
                </span>

            </div>
    



        </button>


        {isOpen && (
            <div className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity'
                onClick={() => setIsOpen(false)} 
            />
        
        )}


            <div className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
        
                <div className="p-6 border-b flex items-center justify-between bg-zinc-50">
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                    <Heart className="fill-red-500 text-red-500" /> 
                    Saved Recipes
                </h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition">
                    <X className="w-6 h-6 text-gray-500" />
                </button>
            </div>



        <div className="p-4 overflow-y-auto h-[calc(100vh-100px)] ">
          
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-gray-400">
              <Heart className="w-12 h-12 mb-2 opacity-20" />
              <p>No favorites yet!</p>
            </div>
          ) : (
            favorites.map((recipe) => (
              
              
              <div key={recipe.id} className="group relative flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                
                
                <Link 
                  href={`/recipe/${recipe.id}`} 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center gap-4 flex-1 min-w-0"
                >
                
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 group-hover:border-red-100 transition-colors" 
                  />
                  
                 
                  <div className="truncate">
                    <h3 className="font-bold text-gray-800 text-sm truncate group-hover:text-red-600 transition-colors">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-400 mt-0.5 font-medium">
                      View Recipe <ChevronRight size={12} className="ml-1" />
                    </div>
                  </div>
                </Link>

                
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    removeFavorite(recipe.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all shrink-0"
                  title="Remove from favorites"
                >
                  <Trash2 size={18} />
                </button>

              </div>
             

            ))
          )}

        </div>
      </div>
            
    

        
    
    </>

  );

        

}