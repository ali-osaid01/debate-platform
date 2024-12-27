export enum STATUS {
    SUCCESS = "success",
    FAILED = "failed"
}

export enum ETabs {
    event = "event",
    feed = "feed"
}

export enum EventStatus {
    ACTIVE = 'active',
    CANCELED = 'canceled',
    STARTED = 'started',
    COMPLETED = 'completed',
}

export enum ApprovalStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export enum ParticipantStatus {
    CONFIRMED = "confirmed",
    DECLINED = "declined",
    PENDING = "pending"
}

export enum ENOTIFICATION_TYPES {
    EVENT_ACCEPTED = 1,
    EVENT_INVITATION = 2,
    EVENT_REJECTED = 3,
    EVENT_CANCELLED = 4,
    EVENT_DELETED = 5,
    FOLLOW = 6,
    LIKE = 7,
    UN_FOLLOW = 8,
}

export enum SOCKET_EVENTS {
    CONNECTION = "connection",
    DISCONNECT = "disconnect",
    CHAT_CREATED = "chat-created",
    CHAT_SOCKET_ERROR = "chat-socket-error",
    SEND_MESSAGE = "send-message",
    MESSAGE_SOCKET_ERROR = "message-socket-error",
    CHAT_LIST = "chat-list",
    CHAT_MESSAGE_LIST = "chat-message-list",
    CHAT_LIST_ERROR = "chat-list-error",
    "USER-ADDED" = "user-added",
    "USER-LEAVE" = "user-leave",
    "USER-JOIN-ROOM" = "user-join-room",
    "USER-LEAVE-ROOM" = "user-leave-room",
}  