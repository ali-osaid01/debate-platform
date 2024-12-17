export enum STATUS  {
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