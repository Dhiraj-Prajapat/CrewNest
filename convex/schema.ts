// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// ✅ Export your schema
export default defineSchema({
  // --- Authentication tables (users, sessions, etc.)
  ...authTables,

  // ========================
  // 📌 TASK MANAGEMENT
  // ========================
  tasks: defineTable({
    workspaceId: v.id("workspaces"),
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.string()), // stored as ISO string
    completed: v.boolean(),
    createdBy: v.id("users"), // reference to creator
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(v.array(v.string())),
    createdAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_workspace_priority", ["workspaceId", "priority"]),

  taskAssignments: defineTable({
    taskId: v.id("tasks"),
    memberId: v.id("members"),
  })
    .index("by_task_id", ["taskId"])
    .index("by_member_id", ["memberId"]),

  subtasks: defineTable({
    taskId: v.id("tasks"),
    title: v.string(),
    isCompleted: v.boolean(),
  }).index("by_task_id", ["taskId"]),

  // ========================
  // 📌 USER DATA
  // ========================
  profiles: defineTable({
    userId: v.string(), // store user._id or external ID
    name: v.string(),
    age: v.string(),
    contact: v.string(),
    bio: v.string(),
    company: v.string(),
  }),

  userMetadata: defineTable({
    userId: v.id("users"),
    isNewUser: v.boolean(),
    tourSeen: v.boolean(),
  }).index("by_userId", ["userId"]),

  // ========================
  // 📌 WORKSPACES & MEMBERS
  // ========================
  workspaces: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }).index("by_join_code", ["joinCode"]),

  members: defineTable({
    userId: v.id("users"),
    workspaceId: v.id("workspaces"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
    .index("by_user_id", ["userId"])
    .index("by_workspace_id", ["workspaceId"])
    .index("by_workspace_id_user_id", ["workspaceId", "userId"]),

  // ========================
  // 📌 COMMUNICATION
  // ========================
  channels: defineTable({
    name: v.string(),
    workspaceId: v.id("workspaces"),
  }).index("by_workspace_id", ["workspaceId"]),

  conversations: defineTable({
    workspaceId: v.id("workspaces"),
    memberOneId: v.id("members"),
    memberTwoId: v.id("members"),
  }).index("by_workspace_id", ["workspaceId"]),

  messages: defineTable({
    body: v.string(),
    image: v.optional(v.id("_storage")),
    memberId: v.id("members"),
    workspaceId: v.id("workspaces"),
    channelId: v.optional(v.id("channels")),
    parentMessageId: v.optional(v.id("messages")),
    conversationId: v.optional(v.id("conversations")),
    updatedAt: v.optional(v.number()),
  })
    .index("by_workspace_id", ["workspaceId"])
    .index("by_member_id", ["memberId"])
    .index("by_channel_id", ["channelId"])
    .index("by_conversation_id", ["conversationId"])
    .index("by_parent_message_id", ["parentMessageId"])
    .index("by_channel_id_parent_message_id_conversation_id", [
      "channelId",
      "parentMessageId",
      "conversationId",
    ]),

  reactions: defineTable({
    workspaceId: v.id("workspaces"),
    messageId: v.id("messages"),
    memberId: v.id("members"),
    value: v.string(),
  })
    .index("by_workspace_id", ["workspaceId"])
    .index("by_message_id", ["messageId"])
    .index("by_member_id", ["memberId"]),

  notifications: defineTable({
    userId: v.id("users"),           // Who receives the notification
    workspaceId: v.id("workspaces"),
    type: v.union(v.literal("message"), v.literal("task")),
    itemId: v.string(),              // ID of the message or task 
    title: v.string(),               // "New Message" or "New Task Assigned"
    body: v.string(),                // Preview text
    isRead: v.boolean(),
    fromUserId: v.optional(v.id("users")), // Who triggered it
  }).index("by_user_workspace", ["userId", "workspaceId", "isRead"]),

  // ========================
  // 📌 CALLS & WEBRTC
  // ========================
  calls: defineTable({
    workspaceId: v.id("workspaces"),
    channelId: v.optional(v.id("channels")),
    conversationId: v.optional(v.id("conversations")),
    initiatorId: v.id("members"),
    type: v.union(v.literal("voice"), v.literal("video")),
    status: v.union(v.literal("waiting"), v.literal("active"), v.literal("ended")),
    participants: v.array(v.id("members")),
    roomUrl: v.optional(v.string()),
    createdAt: v.number(),
    endedAt: v.optional(v.number()),
  })
    .index("by_workspace_id", ["workspaceId"])
    .index("by_channel_id", ["channelId"])
    .index("by_conversation_id", ["conversationId"]),

  signals: defineTable({
    callId: v.id("calls"),
    senderId: v.id("members"),
    targetId: v.id("members"),
    data: v.any(),
    createdAt: v.number(),
  }).index("by_callId", ["callId"]),

  callPresence: defineTable({
    callId: v.id("calls"),
    memberId: v.id("members"),
    userId: v.id("users"),
    audioOn: v.boolean(),
    videoOn: v.boolean(),
    joinedAt: v.number(),
    leftAt: v.optional(v.number()),
  }).index("by_callId", ["callId"]),
});

//   // convex/schema.ts (add to your existing defineSchema block)

// tasks: defineTable({
//   workspaceId: v.id("workspaces"),
//   title: v.string(),
//   description: v.optional(v.string()),
//   priority: v.union(
//     v.literal("low"),
//     v.literal("medium"),
//     v.literal("high")
//   ),
//   dueDate: v.optional(v.string()), // Store as ISO string
//   completed: v.boolean(),
//   createdBy: v.id("users"),
//   assignedTo: v.optional(v.id("users")),
//   subtasks: v.optional(v.array(v.string())),
//   createdAt: v.number(),
// })
//   .index("by_workspace", ["workspaceId"])
//   .index("by_workspace_priority", ["workspaceId", "priority"]),

// taskAssignments: defineTable({
//   taskId: v.id("tasks"),
//   memberId: v.id("members")
// })
//   .index("by_task_id", ["taskId"])
//   .index("by_member_id", ["memberId"]),

// subtasks: defineTable({
//   taskId: v.id("tasks"),
//   title: v.string(),
//   isCompleted: v.boolean()
// })
//   .index("by_task_id", ["taskId"]),


//   profiles: defineTable({
//     userId: v.string(), // should be string if you store `user._id`
//     name: v.string(),
//     age: v.string(),
//     contact: v.string(),
//     bio: v.string(),
//     company: v.string(),
//   }),

//   userMetadata: defineTable({
//     userId: v.id("users"),
//     isNewUser: v.boolean(),
//     tourSeen: v.boolean(),
//   }).index("by_userId", ["userId"]),

//   workspaces: defineTable({
//     name: v.string(),
//     userId: v.id("users"),
//     joinCode: v.string(),
//   }),

//   members: defineTable({
//     userId: v.id("users"),
//     workspaceId: v.id("workspaces"),
//     role: v.union(v.literal("admin"), v.literal("member")),
//   })
//     .index("by_user_id", ["userId"])
//     .index("by_workspace_id", ["workspaceId"])
//     .index("by_workspace_id_user_id", ["workspaceId", "userId"]),

//   channels: defineTable({
//     name: v.string(),
//     workspaceId: v.id("workspaces"),
//   }).index("by_workspace_id", ["workspaceId"]),

//   conversations: defineTable({
//     workspaceId: v.id("workspaces"),
//     memberOneId: v.id("members"),
//     memberTwoId: v.id("members"),
//   }).index("by_workspace_id", ["workspaceId"]),

//   messages: defineTable({
//     body: v.string(),
//     image: v.optional(v.id("_storage")),
//     memberId: v.id("members"),
//     workspaceId: v.id("workspaces"),
//     channelId: v.optional(v.id("channels")),
//     parentMessageId: v.optional(v.id("messages")),
//     conversationId: v.optional(v.id("conversations")),
//     updatedAt: v.optional(v.number()),
//   })
//     .index("by_workspace_id", ["workspaceId"])
//     .index("by_member_id", ["memberId"])
//     .index("by_channel_id", ["channelId"])
//     .index("by_conversation_id", ["conversationId"])
//     .index("by_parent_message_id", ["parentMessageId"])
//     .index("by_channel_id_parent_message_id_conversation_id", [
//       "channelId",
//       "parentMessageId",
//       "conversationId",
//     ]),

//   reactions: defineTable({
//     workspaceId: v.id("workspaces"),
//     messageId: v.id("messages"),
//     memberId: v.id("members"),
//     value: v.string(),
//   })
//     .index("by_workspace_id", ["workspaceId"])
//     .index("by_message_id", ["messageId"])
//     .index("by_member_id", ["memberId"]),


//     // ✅ Calls table
//   calls: defineTable({
//     workspaceId: v.id('workspaces'),
//     channelId: v.optional(v.id('channels')),
//     conversationId: v.optional(v.id('conversations')),
//     initiatorId: v.id('members'),
//     type: v.union(v.literal('voice'), v.literal('video')),
//     status: v.union(
//       v.literal('waiting'),
//       v.literal('active'),
//       v.literal('ended')
//     ),
//     participants: v.array(v.id('members')),
//     roomUrl: v.optional(v.string()),
//     createdAt: v.number(),
//     endedAt: v.optional(v.number()),
//   })
//     .index('by_workspace_id', ['workspaceId'])
//     .index('by_channel_id', ['channelId'])
//     .index('by_conversation_id', ['conversationId']),

//   // ✅ NEW: WebRTC signaling messages
//   signals: defineTable({
//     callId: v.id("calls"),
//     senderId: v.id("members"),
//     targetId: v.id("members"),
//     data: v.any(),
//     createdAt: v.number(),
//   }).index("by_callId", ["callId"]),

//   // ✅ NEW: Track call participant presence
//   callPresence: defineTable({
//     callId: v.id("calls"),
//     memberId: v.id("members"),
//     userId: v.id("users"),
//     audioOn: v.boolean(),
//     videoOn: v.boolean(),
//     joinedAt: v.number(),
//     leftAt: v.optional(v.number()),
//   }).index("by_callId", ["callId"]),
// });



>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
