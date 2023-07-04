import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../types';
import useLoginModal from './useLoginModal';

interface IUseFavorite {
  itemId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ itemId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const haveFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(itemId);
  }, [currentUser, itemId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => { 
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if(haveFavorited) {
        request = () => axios.delete(`/api/favorites/${itemId}`);
      }
      else {
        request = () => axios.post(`/api/favorites/${itemId}`);
      }

      await request();
      router.refresh();
      if (haveFavorited) {
        toast("Removed successfully", {icon: "🗑️", duration: 3500});
      }
      else {
        toast("Saved successfully", { icon: "🔖", duration: 3500 });
      }
    }
    catch (error: any) {
      toast.error("Saving item went wrong");
    }
  }, [haveFavorited, itemId, currentUser, loginModal, router]);

  return {haveFavorited, toggleFavorite};
};

export default useFavorite;