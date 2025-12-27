/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as channels from "../channels.js";
import type * as conversations from "../conversations.js";
import type * as functions from "../functions.js";
import type * as http from "../http.js";
import type * as members from "../members.js";
import type * as messages from "../messages.js";
import type * as notifications from "../notifications.js";
import type * as profiles from "../profiles.js";
import type * as reactions from "../reactions.js";
import type * as tasks_create from "../tasks/create.js";
import type * as tasks_get from "../tasks/get.js";
import type * as tasks_getAll from "../tasks/getAll.js";
import type * as tasks_getFiltered from "../tasks/getFiltered.js";
import type * as tasks_update from "../tasks/update.js";
import type * as tasks from "../tasks.js";
import type * as upload from "../upload.js";
import type * as users from "../users.js";
import type * as workspaces from "../workspaces.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  channels: typeof channels;
  conversations: typeof conversations;
  functions: typeof functions;
  http: typeof http;
  members: typeof members;
  messages: typeof messages;
  notifications: typeof notifications;
  profiles: typeof profiles;
  reactions: typeof reactions;
  "tasks/create": typeof tasks_create;
  "tasks/get": typeof tasks_get;
  "tasks/getAll": typeof tasks_getAll;
  "tasks/getFiltered": typeof tasks_getFiltered;
  "tasks/update": typeof tasks_update;
  tasks: typeof tasks;
  upload: typeof upload;
  users: typeof users;
  workspaces: typeof workspaces;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
