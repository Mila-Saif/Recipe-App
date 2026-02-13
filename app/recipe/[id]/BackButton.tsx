'use client';
import { ArrowLeft } from 'lucide-react';
import {useRouter} from 'next/navigation';

export default function BackButton() {
    const router = useRouter();
    return (
        <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-800 rounded-full shadow p-3 "> 
          <ArrowLeft className="h-4 w-4" />
        </button>

    );
}