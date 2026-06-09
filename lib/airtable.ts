import { config, assertServerConfig } from "./config";
import { defaultProjectStatus } from "./options";

export type ProjectSubmissionPayload = {
  projectName: string;
  projectDescription: string;
  category: string;
  roleLevel: string;
  otherDetails: string;
  dailyRate: string;
  visaRequirements: string;
  expensesPolicy: string;
  workModel: string;
  location: string;
  projectStart: string;
  projectDuration: string;
  nationalityRestrictions: string;
  additionalComments: string;
  fullName: string;
  company: string;
  email: string;
  whatsappNumber: string;
};

type AirtableCreateResponse = {
  records: Array<{
    id: string;
    createdTime: string;
    fields: Record<string, unknown>;
  }>;
};

function airtableUrl(path: string) {
  return new URL(`https://api.airtable.com/v0/${config.airtableBaseId}/${path}`);
}

async function airtableFetch<T>(url: URL, init?: RequestInit) {
  assertServerConfig(["airtablePat"]);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const response = await fetch(url, {
    ...init,
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${config.airtablePat}`,
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  }).finally(() => clearTimeout(timeout));

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body?.error?.message || body?.error?.type || "Airtable request failed";
    throw new Error(message);
  }

  return body as T;
}

export async function createProjectSubmission(payload: ProjectSubmissionPayload) {
  const fields: Record<string, unknown> = {
    "Project Name": payload.projectName,
    "Project Description": payload.projectDescription,
    Category: payload.category,
    "Role/Level": [payload.roleLevel],
    "Other Details": payload.otherDetails,
    "Daily Rate": payload.dailyRate,
    "Visa Requirements": payload.visaRequirements,
    "Expenses Policy": payload.expensesPolicy,
    "Work Model": payload.workModel,
    Location: payload.location,
    "Project Start": payload.projectStart,
    "Project Duration": payload.projectDuration,
    "Nationality Restrictions": payload.nationalityRestrictions,
    "Additional Comments": payload.additionalComments,
    "Your Full Name": payload.fullName,
    Company: payload.company,
    Email: payload.email.trim().toLowerCase(),
    "WhatsApp Number": payload.whatsappNumber,
    Status: defaultProjectStatus
  };

  return airtableFetch<AirtableCreateResponse>(
    airtableUrl(config.projectIntakeTableId),
    {
      method: "POST",
      body: JSON.stringify({ records: [{ fields }] })
    }
  );
}
