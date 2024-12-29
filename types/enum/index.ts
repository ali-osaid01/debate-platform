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
    SEND_MESSAGE = "send-message",
    CHAT_LIST = "chat-list",
    "USER-ADDED" = "user-added",
    "USER-LEAVE" = "user-leave",
    "USER-JOIN-ROOM" = "user-join-room",
    "USER-LEAVE-ROOM" = "user-leave-room",
    "FETCH-CHAT-MESSAGE" = "fetch-chat-message",
    NEW_MESSAGE = "new-message",
}  