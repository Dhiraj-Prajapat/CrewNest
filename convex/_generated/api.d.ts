/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as calls from "../calls.js";
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
import type * as tasks_remove from "../tasks/remove.js";
import type * as tasks_update from "../tasks/update.js";
import type * as upload from "../upload.js";
import type * as users from "../users.js";
import type * as workspaces from "../workspaces.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  calls: typeof calls;
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
  "tasks/remove": typeof tasks_remove;
  "tasks/update": typeof tasks_update;
  upload: typeof upload;
  users: typeof users;
  workspaces: typeof workspaces;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
