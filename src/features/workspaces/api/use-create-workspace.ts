
"use client";

import { useMutation } from 'convex/react';
import { useCallback, useMemo, useState } from 'react';

import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';

type RequestType = { name: string };
type ResponseType = Id<'workspaces'> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<'success' | 'error' | 'settled' | 'pending' | null>(null);

  const isPending = useMemo(() => status === 'pending', [status]);
  const isSuccess = useMemo(() => status === 'success', [status]);
  const isError = useMemo(() => status === 'error', [status]);
  const isSettled = useMemo(() => status === 'settled', [status]);

  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus('pending');

        const response = await mutation(values);
        options?.onSuccess?.(response);

        return response;
      } catch (error) {
        setStatus('error');
        options?.onError?.(error as Error);

        if (!options?.throwError) throw error;
      } finally {
        setStatus('settled');
        options?.onSettled?.();
      }
    },
    [mutation],
  );

  return {
    mutate,
    data,
    error,
    isPending,
    isError,
    isSuccess,
    isSettled,
  };
};


/// below code written by any

// import { useQuery } from "convex/react";

// import { api } from "../../../../convex/_generated/api";
// import { Id } from "../../../../convex/_generated/dataModel";

// interface UseGetWorkspaceProps{
//     id: Id<"workspaces">;
// };

// export const useGetWorkspace= ({ id }: UseGetWorkspaceProps) => {
// const data = useQuery(api.workspaces.getById, { id });
// const isLoading = data === undefined;

// return { data, isLoading };

// };

////////////////// first written code end  


// import { useCallback, useState } from "react";
// import { useMutation } from "convex/react";

// import { api } from "../../../../convex/_generated/api";
// import { Id } from "../../../../convex/_generated/dataModel";

// type RequestType = {name: string};
// type ResponseType = Id<"workspace"> | null;

// type Options = {
//   onSuccess?: (data: ResponseType) => void;
//   onError?: (error: Error) => void;
//   onSettled?: () => void;
//   throwError?: () => boolean;
// };

// export const useCreateWorkspace = () => { 
//      const [data, setData] = useState<ResponseType>(null); 
//      const [error, setError] = useState<Error | null>(null);
//      const [states, setStates] = useState<"success" | "error" | "settled" | "pending" | null>(null);

//      const [isPending, setIsPending] = useState(false);
//      const [isSuccess, setIsSuccess] = useState(false);
//      const [isError, setIsError] = useState(false);
//      const [isSettled, setIsSettled] = useState(false);

//   const mutation = useMutation(api.workspaces.create);

//   const mutate = useCallback(
//     async (values: RequestType, options?: Options) => {
//       try {

//             setData(null);
//             setError(null);
//             setIsError(false);
//             setIsSettled(false);
//             setIsSuccess(false);
            
//             setIsPending(true);


//         const response = await mutation(values);
//         options?.onSuccess?.(response);
//         return response;
//       } catch(error) {
//         options?.onError?.(error as Error);
//         if (options?.throwError) {
//             throw error;
//         }
//       } finally {
//         setIsPending(false);
//         setIsSettled(true);
//         options?.onSettled?.();
//       }
//     },
//     [mutation]
//   );

//   return {
//     mutate,
//     data,
//     error,
//     isPending,
//     isSuccess,
//     isError,
//     isSettled,
//   };
// };


//////////////////////////// second written code end // incomplete code

