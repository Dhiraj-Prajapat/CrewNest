# CrewNest Project Overview

## 1. Project Description
CrewNest is a modern collaboration platform (Slack clone) built with Next.js, Convex, and Tailwind CSS. It supports real-time messaging, channels, direct messages, and workspace management.

## 2. Technology Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend/Database**: Convex (Real-time DB + Server Functions)
- **Styling**: Tailwind CSS, Shadcn UI
- **Auth**: Convex Auth (handling customized checking via `convex/users.ts`)
- **State Management**: Jotai + React Query (Convex hooks)

## 3. Directory Structure

### `convex/` (Backend)
- `schema.ts`: Database schema (Workspaces, Members, Channels, Messages, etc.).
- `auth.ts`, `users.ts`: Authentication and user synchronization logic.
- `workspaces.ts`, `members.ts`, `messages.ts`: Core business logic mutations and queries.

### `src/app/` (Frontend Pages)
- `workspace/[workspaceId]`: Main application layout.
  - `channel/[channelId]`: Channel chat view.
  - `member/[memberId]`: Direct message chat view.
  - `dms/`: Landing page for Direct Messages.
  - `sidebar.tsx`: Main left sidebar (Workspace switcher, Home, DMs, Activity).
  - `workspace-sidebar.tsx`: Inner sidebar (Channels list, DM user list).
- `profile/`: User profile page.
- `join/[workspaceId]`: Invite link landing page.

### `src/features/` (Feature-based Modules)
- `auth/`: Auth components (SignIn, SignUp, UserButton) and hooks.
- `workspaces/`: Workspace management (Create, Switch, Join).
- `channels/`: Channel operations (Create, List).
- `messages/`: Message components (Editor, MessageList, Thread).

## 4. Key Features & Workflows

### Authentication
- Users sign in via Email/Password or OAuth.
- `AuthRedirect` handles routing to `/complete-profile` if new.

### Workspace Management
- **Create**: Users can create multiple workspaces.
- **Invite**: Admins generate invite codes/links (Sidebar -> More -> Invite people).
- **Join**:
    - **By Link**: Navigate to `/join/[workspaceId]`.
    - **By Code**: Sidebar -> More -> Join Workspace -> Enter 6-digit code.

### Messaging
- **Channels**: Public/Private text channels.
- **Direct Messages**: 1:1 chats with workspace members. (WhatsApp-style "DMs" sidebar view).
- **Threads**: Reply to specific messages in a side panel.
- **Reactions**: Emoji reactions on messages.

### User Profile
- View own profile at `/profile` (via User Button -> View Profile).
- Edit details during onboarding (`/complete-profile`).

## 5. Recent Customizations
- **WhatsApp-style DMs**: `WorkspaceSidebar` switches to a full contact list view when in DM mode.
- **Join by Code**: Added `joinByCode` backend mutation and UI in Sidebar to join workspaces using only a 6-digit code.
- **Settings Redesign**: Implemented an enterprise-grade Settings Modal with sidebar navigation (General, Audio/Video, Meetings, About), optimized for responsiveness with a wider, user-friendly layout.
- **Professional Dark Mode**: Upgraded to a "Slate" color palette for a clearer, high-contrast dark theme.
- **Task Management Overhaul**: Complete task board with assigning users, permissions (delete protection), scrolling support, and visual priorities.
- **Notification Center**: Real-time notification system for DMs and Tasks, moving alerts from the sidebar to a toolbar popup.
- **Professional Home Dashboard**: Replaced auto-redirect with an animated "Welcome" landing page featuring stats and updates.

## 6. Commands
- `npm run dev`: Start frontend + Convex dev server.
- `npx convex dev`: Start Convex backend independently.
