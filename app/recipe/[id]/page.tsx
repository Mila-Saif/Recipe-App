import Link from "next/link";

async function fetchRecipeDetails(id: string) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('Spoonacular API key is not set in environment variables');
  }

  const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }
  return await response.json();


  
}
export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await fetchRecipeDetails(id);  

  return (

    <div className="min-h-screen p-8">

        <Link href="/recipes" className="text-blue-500 hover:underline">
          Back to Recipes
        </Link>
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-4" />
      <div className="prose max-w-none">
        <h2>Summary</h2>
        <p>{recipe.summary}</p>
    </div>
    </div>
  );
}
