// import { useParams } from 'next/navigation';

// import { Id } from '../../convex/_generated/dataModel';

// export const useWorkspaceId = () => {
//     const params = useParams();
//     return params.workspaceId as Id<"workspaces">;
// };

// gourav code

// updated code

"use client";

import { useParams } from 'next/navigation';
import { Id } from '../../convex/_generated/dataModel';

export const useWorkspaceId = () => {
    const params = useParams();
    
    // Return null if workspaceId is not present instead of undefined
    return (params.workspaceId as Id<"workspaces">) || null;
};
