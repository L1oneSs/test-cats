import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ICatImage } from '@/interfaces/ICatImage';
interface FavoriteCatsStore {
  favorites: ICatImage[];
  addFavorite: (cat: ICatImage) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoriteCats = create<FavoriteCatsStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (cat) => 
        set((state) => ({ favorites: [...state.favorites, cat] })),
      removeFavorite: (id) =>
        set((state) => ({ 
          favorites: state.favorites.filter((cat) => cat.id !== id) 
        })),
      isFavorite: (id) => 
        get().favorites.some((cat) => cat.id === id),
    }),
    {
      name: 'favorite-cats',
    }
  )
);