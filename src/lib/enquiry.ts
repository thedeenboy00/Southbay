/** Concept-only enquiry model. Nothing here sends or stores data. */

export const ENQUIRY_TYPES = ["viewing", "ask"] as const;
export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  viewing: "Request a Viewing",
  ask: "Ask About Property",
};

/** Window event used by action links to pre-select the enquiry type before scrolling to the form. */
export const ENQUIRY_TYPE_EVENT = "concept-enquiry-type";

export function isEnquiryType(value: unknown): value is EnquiryType {
  return typeof value === "string" && ENQUIRY_TYPES.some((type) => type === value);
}

export const ENQUIRY_LIMITS = { name: 80, email: 120, phone: 30, messageMin: 10, messageMax: 1000 } as const;

export interface EnquiryValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type EnquiryField = keyof EnquiryValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;
export const ENQUIRY_FIELD_ORDER: readonly EnquiryField[] = ["name", "email", "phone", "message"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s()-]{6,}$/;

/** Expects values that have already been trimmed. Phone is optional. */
export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (values.name === "") errors.name = "Enter your name.";
  else if (values.name.length > ENQUIRY_LIMITS.name) errors.name = `Name must be ${ENQUIRY_LIMITS.name} characters or fewer.`;

  if (values.email === "") errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = "Enter a valid email address, for example name@example.com.";
  else if (values.email.length > ENQUIRY_LIMITS.email) errors.email = `Email must be ${ENQUIRY_LIMITS.email} characters or fewer.`;

  if (values.phone !== "") {
    if (values.phone.length > ENQUIRY_LIMITS.phone) errors.phone = `Phone number must be ${ENQUIRY_LIMITS.phone} characters or fewer.`;
    else if (!PHONE_PATTERN.test(values.phone)) errors.phone = "Use digits, spaces, + ( ) or - only, or leave this blank.";
  }

  if (values.message === "") errors.message = "Enter a message.";
  else if (values.message.length < ENQUIRY_LIMITS.messageMin) errors.message = `Message must be at least ${ENQUIRY_LIMITS.messageMin} characters.`;
  else if (values.message.length > ENQUIRY_LIMITS.messageMax) errors.message = `Message must be ${ENQUIRY_LIMITS.messageMax} characters or fewer.`;

  return errors;
}
