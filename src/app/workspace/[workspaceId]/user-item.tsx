import { type VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';

import type { Id } from '@/../convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';

const userItemVariants = cva('flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden', {
  variants: {
    variant: {
      default: 'text-white',
      active: 'text-black bg-white/90 hover:bg-white/90',
      message: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md my-1 h-12',
      activeMessage: 'text-primary dark:text-primary bg-primary/10 dark:bg-primary/20 rounded-md my-1 h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface UserItemProps {
  id: Id<'members'>;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>['variant'];
}

export const UserItem = ({ id, label = 'Member', image, variant }: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label.charAt(0).toUpperCase();

  const isMessageVariant = variant === 'message' || variant === 'activeMessage';

  return (
    <Button variant="transparent" className={cn(userItemVariants({ variant }))} size={isMessageVariant ? "default" : "sm"} asChild>
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className={cn(isMessageVariant ? "mr-3 size-10" : "mr-1 size-5")}>
          <AvatarImage alt={label} src={image} />
          <AvatarFallback className="text-xs text-gray-700 ">{avatarFallback}</AvatarFallback>
        </Avatar>

        <span className={cn("truncate", isMessageVariant ? "text-base font-medium" : "text-sm")}>{label}</span>
      </Link>
    </Button>
  );
};
