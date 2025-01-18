import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { useCats } from "@/hooks/use-cats";
import { useFavoriteCats } from "@/store/use-favourite-cats";
import { BarLoader, PuffLoader } from "react-spinners";
import { ICatImage } from "@/interfaces/ICatImage";

interface CatGridProps {
  showFavorites: boolean;
}

export function CatGrid({ showFavorites }: CatGridProps) {
  const { cats, isLoading, isFetchingNextPage, fetchNextPage } = useCats();
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavoriteCats();
  const observerRef = useRef<IntersectionObserver>();
  const lastCatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (lastCatRef.current) {
      observerRef.current.observe(lastCatRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, cats]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <PuffLoader color="#3B82F6" />
      </div>
    );
  }

  const displayedCats = showFavorites ? favorites : cats;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayedCats.map((cat: ICatImage, index: number) => (
          <div
            key={cat.id}
            ref={index === displayedCats.length - 1 ? lastCatRef : null}
            className="relative aspect-square group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={cat.url}
              alt="Cat"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() =>
                isFavorite(cat.id) ? removeFavorite(cat.id) : addFavorite(cat)
              }
              className="absolute bottom-2 right-2 p-2 rounded-full 
                         bg-white/80 opacity-0 group-hover:opacity-100 
                         transition-opacity duration-200"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite(cat.id)
                    ? "fill-orange-500 stroke-orange-500"
                    : "stroke-orange-500"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      {displayedCats != favorites && isFetchingNextPage && (
        <div className="flex justify-center mt-10">
          <BarLoader color="#3B82F6" width={200} />
        </div>
      )}
    </>
  );
}
