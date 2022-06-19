export const enum UserType {
  CUSTOMER = "customer",
  AGENCY = "agency",
  ADMIN = "admin",
}

export const enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export const enum TransactionStatus {
  INITIAL = "initial",
  INVALID = "invalid",
  CANCELLED_BY_CUSTOMER = "cancelledByCustomer",
  AUTHORIZATION_DECLINED = "authorizationDeclined",
  FAILED = "failed",
  SUCCESS = "success",
}
