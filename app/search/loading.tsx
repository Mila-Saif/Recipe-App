import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
   
      <Loader2 className="h-12 w-12 text-red-800 animate-spin mb-4" />
      
    
      <p className="text-gray-500 font-medium animate-pulse">
        Looking for recipes...
      </p>
    </div>
  );
}