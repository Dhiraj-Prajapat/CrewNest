import { useQueryState } from 'nuqs';

export const useProfileMemberId = () => {
  return useQueryState('profileMemberId');
};



/// gpt code without nuqs pkg 

// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useCallback } from 'react';

// export const useProfileMemberId = (): [string | null, (value: string | null) => void] => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const profileMemberId = searchParams.get('profileMemberId');

//   const setProfileMemberId = useCallback(
//     (value: string | null) => {
//       const params = new URLSearchParams(searchParams.toString());

//       if (value) {
//         params.set('profileMemberId', value);
//       } else {
//         params.delete('profileMemberId');
//       }

//       router.replace(`?${params.toString()}`);
//     },
//     [router, searchParams]
//   );

//   return [profileMemberId, setProfileMemberId];
// };
