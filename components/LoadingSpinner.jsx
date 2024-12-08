'use client';
import { useLoadingStore } from '@/contexts/LoadingContext';

export default function LoadingSpinner() {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">กำลังโหลด...</p>
      </div>
    </div>
  );
}