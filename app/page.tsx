"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import {
  categoryOptions,
  expensesPolicyOptions,
  roleOptionsByCategory,
  visaRequirementOptions,
  workModelOptions
} from "@/lib/options";

type Message = { type: "error" | "success"; text: string } | null;
type RoleCategory = keyof typeof roleOptionsByCategory;

const otherDetailsPlaceholders: Record<RoleCategory, string> = {
  Consulting: "e.g. Chief of Staff, PMO",
  Product: "e.g. Product Marketing Manager",
  "Data Science & Analytics": "e.g. Machine Learning Engineer",
  "Investment Professionals": "e.g. Private Equity Operating Partner"
};

const initialForm = {
  projectName: "",
  projectDescription: "",
  category: "",
  roleLevel: "",
  otherDetails: "",
  dailyRate: "",
  visaRequirements: "",
  expensesPolicy: "",
  workModel: "",
  location: "",
  projectStart: "",
  projectDuration: "",
  nationalityRestrictions: "",
  additionalComments: "",
  fullName: "",
  company: "",
  email: "",
  whatsappNumber: "",
  website: ""
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedRoleOptions = isRoleCategory(form.category)
    ? roleOptionsByCategory[form.category]
    : [];
  const otherDetailsPlaceholder = isRoleCategory(form.category)
    ? otherDetailsPlaceholders[form.category]
    : "e.g. Chief of Staff, PMO";

  if (!mounted) {
    return (
      <main className="shell">
        <Topbar />
      </main>
    );
  }

  async function submitProject(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/submit-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setMessage({
        type: "error",
        text: data?.error || "Could not submit the project."
      });
      return;
    }

    setSubmitted(true);
    setMessage({ type: "success", text: "Project submitted successfully." });
  }

  if (submitted) {
    return (
      <main className="shell">
        <Topbar />
        <section className="success-panel">
          <div className="success-mark">✓</div>
          <p className="eyebrow">Project Submitted</p>
          <h2>Project submitted successfully</h2>
          <p>
            Thank you for sharing the project details. The Stratverse team will
            review the submission and follow up with you shortly.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <Topbar />

      <section className="hero">
        <p className="eyebrow">Client Project Intake</p>
        <h2>Scope it. We&apos;ll staff it.</h2>
        <p>
          Share the project context and requirements. This should take a few
          minutes, and helps us match you with the right consulting talent.
        </p>
      </section>

      <form className="form-panel" onSubmit={submitProject}>
        <input
          aria-hidden="true"
          autoComplete="off"
          className="honeypot"
          suppressHydrationWarning
          tabIndex={-1}
          value={form.website}
          onChange={(event) => setForm({ ...form, website: event.target.value })}
        />

        <section className="form-section">
          <div className="section-heading">
            <span>Section 1</span>
            <h3>Project Information</h3>
          </div>

          <div className="grid">
            <Field label="Project Name" htmlFor="projectName" full>
              <input
                id="projectName"
                required
                suppressHydrationWarning
                value={form.projectName}
                onChange={(event) =>
                  setForm({ ...form, projectName: event.target.value })
                }
              />
            </Field>

            <Field label="Project Description" htmlFor="projectDescription" full>
              <textarea
                id="projectDescription"
                required
                suppressHydrationWarning
                value={form.projectDescription}
                onChange={(event) =>
                  setForm({ ...form, projectDescription: event.target.value })
                }
              />
            </Field>

            <Field label="Category" htmlFor="category">
              <select
                id="category"
                required
                suppressHydrationWarning
                value={form.category}
                onChange={(event) =>
                  setForm({
                    ...form,
                    category: event.target.value,
                    roleLevel: "",
                    otherDetails: ""
                  })
                }
              >
                <option value="">Select category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Role" htmlFor="roleLevel">
              <select
                id="roleLevel"
                required
                disabled={!form.category}
                suppressHydrationWarning
                value={form.roleLevel}
                onChange={(event) => {
                  const roleLevel = event.target.value;
                  setForm({
                    ...form,
                    roleLevel,
                    otherDetails: roleLevel === "Other" ? form.otherDetails : ""
                  });
                }}
              >
                <option value="">
                  {form.category ? "Select role" : "Select category first"}
                </option>
                {selectedRoleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            {form.roleLevel === "Other" && (
              <Field label="Other Details" htmlFor="otherDetails" full>
                <input
                  id="otherDetails"
                  required
                  suppressHydrationWarning
                  placeholder={otherDetailsPlaceholder}
                  value={form.otherDetails}
                  onChange={(event) =>
                    setForm({ ...form, otherDetails: event.target.value })
                  }
                />
              </Field>
            )}

            <Field label="Daily Rate" htmlFor="dailyRate">
              <input
                id="dailyRate"
                required
                placeholder="e.g. $1,000-$1,200 per day"
                suppressHydrationWarning
                value={form.dailyRate}
                onChange={(event) =>
                  setForm({ ...form, dailyRate: event.target.value })
                }
              />
            </Field>

            <Field label="Visa Requirements" htmlFor="visaRequirements">
              <select
                id="visaRequirements"
                required
                suppressHydrationWarning
                value={form.visaRequirements}
                onChange={(event) =>
                  setForm({ ...form, visaRequirements: event.target.value })
                }
              >
                <option value="">Select visa requirements</option>
                {visaRequirementOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Expenses Policy" htmlFor="expensesPolicy">
              <select
                id="expensesPolicy"
                required
                suppressHydrationWarning
                value={form.expensesPolicy}
                onChange={(event) =>
                  setForm({ ...form, expensesPolicy: event.target.value })
                }
              >
                <option value="">Select expenses policy</option>
                {expensesPolicyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Work Model" htmlFor="workModel">
              <select
                id="workModel"
                required
                suppressHydrationWarning
                value={form.workModel}
                onChange={(event) =>
                  setForm({ ...form, workModel: event.target.value })
                }
              >
                <option value="">Select work model</option>
                {workModelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Location" htmlFor="location">
              <input
                id="location"
                required
                placeholder="e.g. Riyadh, Dubai, Remote"
                suppressHydrationWarning
                value={form.location}
                onChange={(event) =>
                  setForm({ ...form, location: event.target.value })
                }
              />
            </Field>

            <Field label="Project Start" htmlFor="projectStart">
              <input
                id="projectStart"
                required
                placeholder="e.g. ASAP, June 2026"
                suppressHydrationWarning
                value={form.projectStart}
                onChange={(event) =>
                  setForm({ ...form, projectStart: event.target.value })
                }
              />
            </Field>

            <Field label="Project Duration" htmlFor="projectDuration">
              <input
                id="projectDuration"
                required
                placeholder="e.g. 6 weeks, 3 months"
                suppressHydrationWarning
                value={form.projectDuration}
                onChange={(event) =>
                  setForm({ ...form, projectDuration: event.target.value })
                }
              />
            </Field>

            <Field label="Nationality Restrictions" htmlFor="nationalityRestrictions">
              <input
                id="nationalityRestrictions"
                placeholder="e.g. GCC nationals only, no restrictions"
                suppressHydrationWarning
                value={form.nationalityRestrictions}
                onChange={(event) =>
                  setForm({ ...form, nationalityRestrictions: event.target.value })
                }
              />
            </Field>

            <Field label="Additional Comments" htmlFor="additionalComments" full>
              <textarea
                id="additionalComments"
                suppressHydrationWarning
                value={form.additionalComments}
                onChange={(event) =>
                  setForm({ ...form, additionalComments: event.target.value })
                }
              />
            </Field>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span>Section 2</span>
            <h3>Client Information</h3>
          </div>

          <div className="grid">
            <Field label="Your Full Name" htmlFor="fullName">
              <input
                id="fullName"
                required
                autoComplete="name"
                suppressHydrationWarning
                value={form.fullName}
                onChange={(event) =>
                  setForm({ ...form, fullName: event.target.value })
                }
              />
            </Field>

            <Field label="Company" htmlFor="company">
              <input
                id="company"
                required
                autoComplete="organization"
                suppressHydrationWarning
                value={form.company}
                onChange={(event) =>
                  setForm({ ...form, company: event.target.value })
                }
              />
            </Field>

            <Field label="Email" htmlFor="email">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                suppressHydrationWarning
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </Field>

            <Field label="WhatsApp Number" htmlFor="whatsappNumber">
              <input
                id="whatsappNumber"
                required
                autoComplete="tel"
                placeholder="Include country code"
                suppressHydrationWarning
                value={form.whatsappNumber}
                onChange={(event) =>
                  setForm({ ...form, whatsappNumber: event.target.value })
                }
              />
            </Field>
          </div>
        </section>

        <div className="actions">
          <button className="primary" disabled={loading} type="submit">
            {loading ? "Submitting..." : "Submit project"}
          </button>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}
      </form>
    </main>
  );
}

function isRoleCategory(value: string): value is RoleCategory {
  return value in roleOptionsByCategory;
}

function Topbar() {
  return (
    <header className="topbar">
      <Image
        alt="Stratverse"
        className="brand-logo"
        height="24"
        src="/brand/stratverse-logo-white.svg"
        width="144"
      />
      <a className="site-link" href="https://stratverse.co" rel="noreferrer" target="_blank">
        stratverse.co
      </a>
    </header>
  );
}

function Field({
  children,
  full,
  htmlFor,
  label
}: {
  children: React.ReactNode;
  full?: boolean;
  htmlFor: string;
  label: string;
}) {
  return (
    <div className={full ? "field full" : "field"}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
