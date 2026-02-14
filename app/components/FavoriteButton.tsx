'use client';
import { Heart } from 'lucide-react';   
import { useState, useEffect } from 'react';

export default function FavoriteButton({ recipe}: {recipe: {id: number, title: string, image: string} }) {
    const [isFavorite, setFavorite] = useState(false);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isSaved = savedFavorites.some((fav: any) => fav.id === recipe.id);
        setFavorite(isSaved);

    const checkFavorite = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isSaved = savedFavorites.some((fav: any) => fav.id === recipe.id);
        setFavorite(isSaved);
    };
    

    window.addEventListener('favoriteUpdate', checkFavorite);
    return () => window.removeEventListener('favoriteUpdate ', checkFavorite);
  }, [recipe.id]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let newFavorites;

        if (isFavorite) {
            newFavorites = savedFavorites.filter((fav: any) => fav.id !== recipe.id);
          
    } else {
        newFavorites = [...savedFavorites, {id: recipe.id, title: recipe.title, image: recipe.image} ];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorite(!isFavorite);
        

    window.dispatchEvent(new Event('favoriteUpdate'));
    };

    return (
        <button onClick={toggleFavorite} className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors focus:outline-0 " >
            <Heart className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-red-800 text-red-800'  : ''}`} />
        </button>
    );
}