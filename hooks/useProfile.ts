import useSWR from 'swr';
import { LinkedInData } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProfile() {
  const { data, error, isLoading } = useSWR<LinkedInData>('/api/profile', fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
