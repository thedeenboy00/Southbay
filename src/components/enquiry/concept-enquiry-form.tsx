"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ENQUIRY_FIELD_ORDER,
  ENQUIRY_LIMITS,
  ENQUIRY_TYPE_EVENT,
  ENQUIRY_TYPE_LABELS,
  isEnquiryType,
  validateEnquiry,
} from "@/lib/enquiry";
import type { EnquiryErrors, EnquiryField, EnquiryType } from "@/lib/enquiry";
import { propertiesHref } from "@/lib/search-params";
import { cn } from "@/lib/utils";

interface ConceptEnquiryFormProps {
  propertyTitle: string;
  enquiryTypes: readonly EnquiryType[];
  defaultType: EnquiryType;
}

const inputClass = "mt-1.5 block min-h-12 w-full rounded-sm border bg-surface px-3 text-sm text-ink";
const labelClass = "text-sm font-medium text-ink";

function readText(data: FormData, key: EnquiryField): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Demo-only form. It validates in the browser and shows a preview success state.
 * It makes no network request and stores nothing: the entered values are read once for validation and dropped.
 * `method="dialog"` makes a submission without JavaScript do nothing, so no data can leave via a plain form post.
 */
export function ConceptEnquiryForm({ propertyTitle, enquiryTypes, defaultType }: ConceptEnquiryFormProps) {
  const [type, setType] = useState<EnquiryType>(defaultType);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submittedType, setSubmittedType] = useState<EnquiryType | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const onType = (event: Event) => {
      if (event instanceof CustomEvent && isEnquiryType(event.detail) && enquiryTypes.includes(event.detail)) {
        setType(event.detail);
        setSubmittedType(null);
      }
    };
    window.addEventListener(ENQUIRY_TYPE_EVENT, onType);
    return () => window.removeEventListener(ENQUIRY_TYPE_EVENT, onType);
  }, [enquiryTypes]);

  useEffect(() => {
    if (submittedType) successRef.current?.focus();
  }, [submittedType]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validateEnquiry({
      name: readText(data, "name"),
      email: readText(data, "email"),
      phone: readText(data, "phone"),
      message: readText(data, "message"),
    });
    setErrors(found);
    const firstInvalid = ENQUIRY_FIELD_ORDER.find((field) => found[field] !== undefined);
    if (firstInvalid) {
      const element = form.elements.namedItem(firstInvalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }
    setSubmittedType(type);
  };

  if (submittedType) {
    return (
      <div className="fade-in rounded-card border border-line bg-surface p-6 sm:p-8">
        <h3 ref={successRef} tabIndex={-1} className="display text-2xl text-ink focus:outline-none">
          Enquiry preview complete
        </h3>
        <p className="mt-3 text-body">
          {ENQUIRY_TYPE_LABELS[submittedType]} for <span className="font-medium text-ink">{propertyTitle}</span>.
        </p>
        <p className="mt-2 text-body">This is a DeenTech concept. No enquiry has been sent or stored, and no agent has received anything.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="#property-top" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-hover">
            Back to property
          </a>
          <Link href={propertiesHref()} className="inline-flex min-h-12 items-center justify-center rounded-sm border border-brand/30 px-6 text-sm font-semibold text-brand hover:border-brand">
            Continue browsing
          </Link>
          <button type="button" onClick={() => setSubmittedType(null)} className="inline-flex min-h-12 items-center justify-center px-4 text-sm font-medium text-muted underline">
            Preview another enquiry
          </button>
        </div>
      </div>
    );
  }

  const errorCount = ENQUIRY_FIELD_ORDER.filter((field) => errors[field] !== undefined).length;

  const renderError = (field: EnquiryField) =>
    errors[field] ? (
      <p id={`enquiry-${field}-error`} className="mt-1.5 text-sm text-danger">
        {errors[field]}
      </p>
    ) : null;
  const fieldProps = (field: EnquiryField) => ({
    id: `enquiry-${field}`,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `enquiry-${field}-error` : undefined,
    className: cn(inputClass, errors[field] ? "border-danger" : "border-line"),
  });

  return (
    <form method="dialog" noValidate onSubmit={onSubmit} className="rounded-card border border-line bg-surface p-5 sm:p-8">
      <p className="eyebrow">Enquiring about</p>
      <p className="mt-1 text-lg font-semibold text-ink">{propertyTitle}</p>

      {errorCount > 0 ? (
        <p role="alert" className="mt-5 rounded-sm border border-danger/40 px-4 py-3 text-sm text-danger">
          Please correct {errorCount === 1 ? "1 field" : `${errorCount} fields`} before continuing.
        </p>
      ) : null}

      <fieldset className="mt-6">
        <legend className={labelClass}>Enquiry type</legend>
        {enquiryTypes.length > 1 ? (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {enquiryTypes.map((option) => (
              <label key={option} className={cn("flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border px-4 text-sm", type === option ? "border-brand bg-sunken font-semibold text-ink" : "border-line text-body")}>
                <input type="radio" name="enquiryType" value={option} checked={type === option} onChange={() => setType(option)} className="h-4 w-4 accent-brand" />
                {ENQUIRY_TYPE_LABELS[option]}
              </label>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-body">{ENQUIRY_TYPE_LABELS[type]}</p>
        )}
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className={labelClass}>Name</label>
          <input {...fieldProps("name")} type="text" autoComplete="name" maxLength={ENQUIRY_LIMITS.name} required />
          {renderError("name")}
        </div>
        <div>
          <label htmlFor="enquiry-email" className={labelClass}>Email</label>
          <input {...fieldProps("email")} type="email" autoComplete="email" maxLength={ENQUIRY_LIMITS.email} required />
          {renderError("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-phone" className={labelClass}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" maxLength={ENQUIRY_LIMITS.phone} />
          {renderError("phone")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className={labelClass}>Message</label>
          <textarea {...fieldProps("message")} rows={5} maxLength={ENQUIRY_LIMITS.messageMax} required />
          {renderError("message")}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-brand px-8 text-sm font-semibold text-white transition hover:bg-brand-hover active:translate-y-px">
          Preview enquiry
        </button>
        <p className="text-xs text-muted">Concept only: nothing is sent or stored.</p>
      </div>
    </form>
  );
}
