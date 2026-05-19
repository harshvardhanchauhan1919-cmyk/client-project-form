"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  expensesPolicyOptions,
  roleLevelOptions,
  visaRequirementOptions,
  workModelOptions
} from "@/lib/options";

type Message = { type: "error" | "success"; text: string } | null;

const initialForm = {
  projectName: "",
  projectDescription: "",
  roleLevel: [] as string[],
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
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>(null);
  const [submitted, setSubmitted] = useState(false);

  function toggleRoleLevel(option: string) {
    setForm((current) => ({
      ...current,
      roleLevel: current.roleLevel.includes(option)
        ? current.roleLevel.filter((item) => item !== option)
        : [...current.roleLevel, option]
    }));
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
          Share the project context and requirements. This should take about 10
          to 15 minutes, and helps us match you with the right consulting talent.
        </p>
      </section>

      <form className="form-panel" onSubmit={submitProject}>
        <input
          aria-hidden="true"
          autoComplete="off"
          className="honeypot"
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
                value={form.projectDescription}
                onChange={(event) =>
                  setForm({ ...form, projectDescription: event.target.value })
                }
              />
            </Field>

            <Field label="Role/Level" htmlFor="roleLevel" full>
              <details className="multiselect">
                <summary id="roleLevel">
                  {form.roleLevel.length > 0
                    ? form.roleLevel.join(", ")
                    : "Select one or more role levels"}
                </summary>
                <div className="multi-menu" role="group" aria-labelledby="roleLevel">
                  {roleLevelOptions.map((option) => (
                    <label className="check-option" key={option}>
                      <input
                        type="checkbox"
                        checked={form.roleLevel.includes(option)}
                        onChange={() => toggleRoleLevel(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </details>
            </Field>

            <Field label="Daily Rate" htmlFor="dailyRate">
              <input
                id="dailyRate"
                required
                placeholder="e.g. $1,000-$1,200 per day"
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
                value={form.nationalityRestrictions}
                onChange={(event) =>
                  setForm({ ...form, nationalityRestrictions: event.target.value })
                }
              />
            </Field>

            <Field label="Additional Comments" htmlFor="additionalComments" full>
              <textarea
                id="additionalComments"
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
