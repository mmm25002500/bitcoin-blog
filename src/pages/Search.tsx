import { useRouter } from "next/router";
import { useEffect } from 'react';

const SearchPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/Search/%20`);
  }, [router]);

  return null;
};

export default SearchPage;
