'use client';
import image from '../public/Party 🥳  sticker pack _ AI Emoji Generator.jpg'
import {useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/navigation';
import { Search, Flame, Filter, X, Check } from 'lucide-react';
import Link from 'next/link';
import FavoriteButton from './components/FavoriteButton';
import FavoriteCard from './components/FavoriteCard';



const Common_Ingredients = [
  'Flour', 'Sugar', 'Butter', 'Milk', 'Eggs', 'Vanilla', 'Baking Powder',
  'Chocolate', 'Strawberries', 'Blueberries', 'Apple', 'Banana',
  'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp',
  'Tomato', 'Potato', 'Onion', 'Garlic', 'Carrot', 'Spinach', 'Broccoli',
  'Rice', 'Pasta', 'Cheese', 'Olive Oil'
];




export default function Home() {

  const [query, setQuery] = useState('');
  const [randomRecipes, setRandomRecipes] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [ingredientsSearch, setIngredientsSearch] = useState('');

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const filterRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (query.trim()) params.append('query', query);
    
    if (selectedIngredients.length > 0 ) {
      params.append('ingredients', selectedIngredients.join(','));
      
    } 

    if (params.toString()) {
      router.push(`/search?${params.toString()}`);
    }
  };
    
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));

    }else {
      setSelectedIngredients([...selectedIngredients, ingredient]);

    }
    setIngredientsSearch('');
  };

  const filteredIngredients = Common_Ingredients.filter(ing => 
    ing.toLocaleLowerCase().includes(ingredientsSearch.toLocaleLowerCase())
  );

  useEffect(() => {

  const fetchRandomRecipes = async () => {
    const cache_Durattion = 60 * 60 * 1000;
    const cachedData = localStorage.getItem('randomRecipes');
    const cachedTime = localStorage.getItem('randomRecipesTimestamp');

    if (cachedData && cachedTime) {
      const now = Date.now() - parseInt(cachedTime);

      if (now < cache_Durattion) {
        setRandomRecipes(JSON.parse(cachedData));
        console.log('Using cached random recipes');
        return;
      }

    }
    try {
      const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
      if (!apiKey) {
        throw new Error('Spoonacular API key is not set in environment variables');
      }

      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=9&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch random recipes');
      }
      
      const data = await response.json();
      setRandomRecipes(data.recipes || []);
    

    setRandomRecipes(data.recipes);
      localStorage.setItem('randomRecipes', JSON.stringify(data.recipes));
      localStorage.setItem('randomRecipesTimestamp', String(Date.now()));

    }

    catch (error) {
      console.error('Error fetching random recipes:', error);
    }
  };

  fetchRandomRecipes();


}
  , []);








  return (
    <div className=" min-h-screen bg-white font-sans dark:bg-white">

      {/* the header card */}
      <div className='flex flex-row absolute left-4  top-4 items-center gap-4'>
        <img src={image.src} alt="pizza png" className='h-16 w-16 ' />
        <div className='flex flex-center flex-col mt-2'>
        <h2 className='text-2xl mt-1 font-semibold text-black dark:text-black'>SpoonaKolar</h2>
        <p className='text-gray-600 font-light text-sm'>Find Recipes</p>
        </div>



      </div>
    

      <div className="absolute flex flex-row gap-2 items-center right-4 top-4 mt-4" >

        <FavoriteCard />
      
   

      </div>


      <div className="  max-w-3xl mx-auto mt-20 md:mt-4 p-4 flex items-center gap-2 w-full">
        {/* filter starts */}
        

          <div className='relative flex-1 ' ref={filterRef}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              type='text'
              placeholder='Search recipes'
              
              className='w-full h-[52px] p-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-zinc-500 shadow-sm text-lg '
            
            />

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors focus:outline-none ${selectedIngredients.length > 0 ? 'text-red-800 hover:text-red-900 bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            
            >
              <Filter
                className='h-5 w-5'
              />

              {selectedIngredients.length > 0 && (
                <span className='absolute -top-1 -right-1 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-red-800 text-[9px] font-bold text-white border border-white'>
                    {selectedIngredients.length}
                </span>
              )}

            </button>

            {isFilterOpen && (
              <div className='absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden'>
                <div className='p-3 border-b border-gray-100 bg-gray-50'>

               
                    <p className='text-sm font-bold text-gray-700 mb-2 '> Filter Ingredients

                    </p>
                    <input
                    type="text"
                    placeholder='Search Ingredients list...'
                    value={ingredientsSearch}
                    onChange={(e) => setIngredientsSearch(e.target.value)}
                    className='w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-800'
                    />
                </div>
             

            {selectedIngredients.length > 0 && (
              <div className='p-2 flex flex-wrap gap-2 border-b border-gray-100 bg-white'>
                {selectedIngredients.map(ing => (
                  <span key={ing} className='bg-red-50 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-red-100 shadow-sm'>
                    {ing}
                    <X className='h-3 w-3 cursor-pointer hover:text-red-600' 
                    onClick={() => toggleIngredient(ing)}
                    />
                    
                      </span>
                    ))}

              

              </div>
 
              )}

              <div className='max-h-48 overflow-y-auto p-3 bg-white'>
                {filteredIngredients.length === 0 ? (
                  <p className='p-3 text-sm text-gray-500 text-center'> No Matches Found

                  </p>
                ) : (
                  filteredIngredients.map(ing => (
                    <div 
                      key={ing}
                      onClick={() => toggleIngredient(ing)}
                      className='Px-3 py-2 text-sm cursor-pointer hover:bg-red-50 flex items-center justify-between rounded-md transition-colors'
                    >
                      <span className={selectedIngredients.includes(ing) ? 'font-bold text-red-800 ' : 'text-gray-700'}> {ing}

                      </span>

                      {selectedIngredients.includes(ing) && <Check className='h-4 w-4 text-red-800'/>}

                    </div>
                  ))


                )}

              </div>
            </div>




          )}

          </div>

          <button 
          onClick={handleSearch}
          className='bg-red-800 text-white p-3 rounded-md hover:bg-red-900 focus:outline-none shadow-sm h-[52px] w-[52px] flex items-center justify-center shrink-0 '
          >
            <Search className='h-5 w-5'/>

          </button>

        

     </div>

      



        {/* <input  value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
        type="text"  placeholder="Search recipes..." className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-white dark:border-zinc-700 dark:text-black" />

        <button 
        onClick={handleSearch} className="   bg-red-800  text-white p-3 rounded-md hover:bg-red-900 focus:outline-none ">
          <Search className="h-4 w-4" />
        </button>
      </div> */}

      {/* the end of the header card  */}


      {/* the select ingredients */}

      {/* <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 '>
        <MultiSelect
        label='Filter Ingredients'
        placeholder='Select ingredients '
        options={Common_Ingredients}
        selected={selectedIngredients}
        onChange={setSelectedIngredients}

        
        />

      </div> */}


      {/* Random Recipes */}
      <div className="mt-2 p-2">
        <div className='flex flex-col items-center text-center gap-1  mb-4'>
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-red-500" />
            <p className="text-lg font-bold ">Trending Recipes</p>


          </div>
            <p className="text-gray-600 text-sm">Find new recipes and their ingredients below</p>

         
          
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {randomRecipes.map((recipe: any) => (

            <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className='flex justify-end pb-4'>
                <FavoriteButton recipe={recipe} />


              </div>
              <Link href={`/recipe/${recipe.id}`} className='w-full block h-48 overflow-hidden hover:scale-105 transition-transform duration-500'>
                  <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500 rounded-md mb-4" />
              </Link>


                <div className='p-4  flex items-center justify-between gap-4 '>
                  <h2 className="text-sm font-bold line-clamp-2 leading-tight text-gray-800">{recipe.title}</h2>

                   

                  <Link href={`/recipe/${recipe.id}`} className='shrink-0'>
                    <button className="bg-red-800 text-white p-2 text-sm rounded-md hover:bg-red-900 focus:outline-none shrink-0">View Recipe</button></Link>
                  

                </div>
           
              
              
            </div>
          ))}
        </div>
      </div>


      {/* End random recipes */}
    </div>
  );
}
