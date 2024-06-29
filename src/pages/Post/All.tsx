import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Tag from '@/config/Tags.json';

export default function All() {
  const router = useRouter();

  // 重定向到第一個標籤
  useEffect(() => {
    router.replace(`/Post/All/${Tag['Post'][0]}`);
  }, [router]);

  return null;
}
