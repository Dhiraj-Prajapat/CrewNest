
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useCreateWorkspace } from '../api/use-create-workspace';
import { useCreateWorkspaceModel } from '../store/use-create-workspace-model';

export const CreateWorkspaceModel = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [open, setOpen] = useCreateWorkspaceModel();
  const { isPending, mutate } = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ name },
      {
        onSuccess: (id) => {
          toast.success('Workspace created!');
          router.push(`/workspace/${id}`);

          handleClose();
        },
        onError: (error) => {
          console.error('[CREATE_WORKSPACE]: ', error);
          toast.error('Failed to create workspace.');
        },
      },
    );
  };

  return (
    <Dialog open={open || isPending} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            minLength={3}
            maxLength={20}
            placeholder="Workspace name e.g 'Work', 'Personal', 'Home'"
          />

          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import { useCreateWorkspace } from "../api/use-create-workspace";
// import { useCreateWorkspaceModel } from "../store/use-create-workspace-model";

// export const CreateWorkspaceModel = () => {

//   const [open, setOpen] = useCreateWorkspaceModel();

//   const { mutate, isPending } = useCreateWorkspace();

//   const handleClose = () => {
//     setOpen(false);
//     //todo: clear from
//   };

//   const handleSubmit = async () => {
//     try {
//       const data = await mutate(
//         {
//           name: "workspace 1",
//         },
//         {
//           onSuccess(data) {},
//           onError(error) {},
//         }
//       );
//     } catch (error) {}
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create Workspace</DialogTitle>
//         </DialogHeader>
//         <form className="space-y-4">
//           <Input
//             value=""
//             disabled={false}
//             required
//             autoFocus
//             minLength={3}
//             placeholder="Workspace Name e.g. 'Work', 'Personal', 'Home',"
//           />
//           <div className="flex justify-end">
//             <Button disabled={false}>Create</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };




// //////////////// hand written code above
