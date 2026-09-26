"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import {
  CreateContactEnquirySchema,
  BudgetTierSchema,
  ProjectTypeSchema,
  type Product,
} from "@/types";

export interface EnquiryFormProps {
  products: Product[];
  initialProductSlug?: string;
}

export function EnquiryForm({
  products,
  initialProductSlug,
}: EnquiryFormProps) {
  // Find prefilled product if matching slug is provided
  const matchedProduct = initialProductSlug
    ? products.find(
        (p) => p.slug.toLowerCase() === initialProductSlug.toLowerCase()
      )
    : undefined;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<"email" | "phone">("email");
  const [projectType, setProjectType] = useState<string>("New Build");
  const [interestedProductId, setInterestedProductId] = useState<string>(
    matchedProduct ? matchedProduct.id : ""
  );
  const [estimatedBudget, setEstimatedBudget] = useState<string>("$100k to $250k");
  const [message, setMessage] = useState("");
  const [botField, setBotField] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const budgetOptions = BudgetTierSchema.options;
  const projectTypeOptions = ProjectTypeSchema.options;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});

    const payload = {
      fullName,
      email,
      phone,
      preferredContactMethod,
      projectType,
      interestedProductId: interestedProductId || undefined,
      estimatedBudget,
      message,
    };

    // Client side Zod validation
    const validationResult = CreateContactEnquirySchema.safeParse(payload);
    if (!validationResult.success) {
      const flattened = validationResult.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(flattened)) {
        if (msgs && msgs.length > 0) {
          formattedErrors[key] = msgs[0];
        }
      }
      setFieldErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          botField,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.fieldErrors) {
          const formattedErrors: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(data.fieldErrors)) {
            if (Array.isArray(msgs) && msgs.length > 0) {
              formattedErrors[key] = msgs[0] as string;
            }
          }
          setFieldErrors(formattedErrors);
        }
        setGeneralError(
          data.error || "Unable to submit enquiry. Please review your details and try again."
        );
        return;
      }

      // Success
      setSubmittedId(data.id);
    } catch {
      setGeneralError(
        "Network connection interrupted. Please verify your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPreferredContactMethod("email");
    setProjectType("New Build");
    setInterestedProductId("");
    setEstimatedBudget("$100k to $250k");
    setMessage("");
    setSubmittedId(null);
    setFieldErrors({});
    setGeneralError(null);
  };

  // Render confirmation state
  if (submittedId) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="rounded-3xl bg-slate-900/90 border border-cyan-800/80 p-8 sm:p-12 text-center space-y-6 shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400">
            Enquiry Received
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Thank You, {fullName || "Esteemed Client"}
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Your project enquiry has been registered with reference ID:
          </p>
          <p className="text-base font-mono font-semibold text-cyan-300 bg-slate-950 px-4 py-2 rounded-xl inline-block border border-slate-800">
            {submittedId}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 max-w-md mx-auto text-xs text-slate-400 text-left space-y-1.5">
          <p className="font-semibold text-slate-200">What Happens Next:</p>
          <p>1. Our principal engineering director reviews your project scope and budget.</p>
          <p>2. A senior consultant contacts you via {preferredContactMethod} within 24 business hours.</p>
          <p>3. We provide preliminary site feasibility and arrange a private showroom review.</p>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            onClick={handleResetForm}
            className="border-slate-700 text-slate-200 hover:text-white"
          >
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl relative">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
          Commission an Installation
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Begin Your Architectural Consultation
        </h2>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Complete the project brief below. Our engineering team responds to all formal briefs within 24 business hours.
        </p>
      </div>

      {matchedProduct && (
        <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-center gap-3 text-xs text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
          <span>
            Prefilled with your selected model: <strong>{matchedProduct.name}</strong> ({matchedProduct.tagline}).
          </span>
        </div>
      )}

      {generalError && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800 text-xs text-red-200 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Spam Honeypot Field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="botField">Leave this field blank</label>
          <input
            id="botField"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
          />
        </div>

        {/* Client Identity Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={Boolean(fieldErrors.fullName)}
              aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              placeholder="e.g. Alistair Sterling"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                fieldErrors.fullName ? "border-red-500" : "border-slate-800 focus:border-cyan-500"
              } text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors`}
            />
            {fieldErrors.fullName && (
              <p id="fullName-error" className="text-xs text-red-400 mt-1.5">
                {fieldErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Email Address <span className="text-cyan-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              placeholder="e.g. alistair@residence.com"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                fieldErrors.email ? "border-red-500" : "border-slate-800 focus:border-cyan-500"
              } text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-xs text-red-400 mt-1.5">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Contact Details and Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Telephone Number <span className="text-cyan-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              placeholder="e.g. +61 400 123 456"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                fieldErrors.phone ? "border-red-500" : "border-slate-800 focus:border-cyan-500"
              } text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors`}
            />
            {fieldErrors.phone && (
              <p id="phone-error" className="text-xs text-red-400 mt-1.5">
                {fieldErrors.phone}
              </p>
            )}
          </div>

          <div>
            <fieldset>
              <legend className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Preferred Contact Method
              </legend>
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                <label className={`flex items-center justify-center px-4 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                  preferredContactMethod === "email"
                    ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}>
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value="email"
                    checked={preferredContactMethod === "email"}
                    onChange={() => setPreferredContactMethod("email")}
                    className="sr-only"
                  />
                  <span>Email</span>
                </label>

                <label className={`flex items-center justify-center px-4 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                  preferredContactMethod === "phone"
                    ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}>
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value="phone"
                    checked={preferredContactMethod === "phone"}
                    onChange={() => setPreferredContactMethod("phone")}
                    className="sr-only"
                  />
                  <span>Phone</span>
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        {/* Project Scope Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="projectType"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Project Scope
            </label>
            <select
              id="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            >
              {projectTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="interestedProductId"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Pool Model (Optional)
            </label>
            <select
              id="interestedProductId"
              value={interestedProductId}
              onChange={(e) => setInterestedProductId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            >
              <option value="">Custom Architectural Basin</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name} ({prod.tagline})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="estimatedBudget"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Estimated Investment
            </label>
            <select
              id="estimatedBudget"
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            >
              {budgetOptions.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
          >
            Project Vision & Site Specifications <span className="text-cyan-400">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            placeholder="Please outline site topography, architecture plans, desired dimensions, or special engineering considerations..."
            className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
              fieldErrors.message ? "border-red-500" : "border-slate-800 focus:border-cyan-500"
            } text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors leading-relaxed`}
          />
          {fieldErrors.message && (
            <p id="message-error" className="text-xs text-red-400 mt-1.5">
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full sm:w-auto gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Transmitting Brief...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Submit Architectural Brief</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
