import { NextResponse } from "next/server";
import {
  createProjectSubmission,
  type ProjectSubmissionPayload
} from "@/lib/airtable";
import {
  expensesPolicyOptions,
  roleLevelOptions,
  visaRequirementOptions,
  workModelOptions
} from "@/lib/options";
import { notifySlack } from "@/lib/slack";

const requiredFields: Array<keyof ProjectSubmissionPayload> = [
  "projectName",
  "projectDescription",
  "roleLevel",
  "dailyRate",
  "visaRequirements",
  "expensesPolicy",
  "workModel",
  "location",
  "projectStart",
  "projectDuration",
  "fullName",
  "company",
  "email",
  "whatsappNumber"
];

function isValidOption<T extends readonly string[]>(value: string, options: T) {
  return options.includes(value as T[number]);
}

function validatePayload(payload: ProjectSubmissionPayload) {
  const missing = requiredFields.filter((field) => {
    const value = payload[field];
    return Array.isArray(value) ? value.length === 0 : !String(value || "").trim();
  });

  if (missing.length > 0) {
    return "Please complete all required fields.";
  }

  if (!payload.email.includes("@")) {
    return "Please enter a valid email address.";
  }

  const invalidRole = payload.roleLevel.find(
    (item) => !isValidOption(item, roleLevelOptions)
  );
  if (invalidRole) {
    return "Please select a valid role/level option.";
  }

  if (!isValidOption(payload.visaRequirements, visaRequirementOptions)) {
    return "Please select a valid visa requirement option.";
  }

  if (!isValidOption(payload.expensesPolicy, expensesPolicyOptions)) {
    return "Please select a valid expenses policy option.";
  }

  if (!isValidOption(payload.workModel, workModelOptions)) {
    return "Please select a valid work model option.";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const payload: ProjectSubmissionPayload = {
      projectName: String(body.projectName || "").trim(),
      projectDescription: String(body.projectDescription || "").trim(),
      roleLevel: Array.isArray(body.roleLevel)
        ? body.roleLevel.filter((item: unknown): item is string => typeof item === "string")
        : [],
      dailyRate: String(body.dailyRate || "").trim(),
      visaRequirements: String(body.visaRequirements || "").trim(),
      expensesPolicy: String(body.expensesPolicy || "").trim(),
      workModel: String(body.workModel || "").trim(),
      location: String(body.location || "").trim(),
      projectStart: String(body.projectStart || "").trim(),
      projectDuration: String(body.projectDuration || "").trim(),
      nationalityRestrictions: String(body.nationalityRestrictions || "").trim(),
      additionalComments: String(body.additionalComments || "").trim(),
      fullName: String(body.fullName || "").trim(),
      company: String(body.company || "").trim(),
      email: String(body.email || "").trim().toLowerCase(),
      whatsappNumber: String(body.whatsappNumber || "").trim()
    };

    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const airtableResponse = await createProjectSubmission(payload);

    try {
      await notifySlack(payload);
    } catch (error) {
      console.error(error);
    }

    return NextResponse.json({
      ok: true,
      recordId: airtableResponse.records[0]?.id || null
    });
  } catch (error) {
    const cause =
      error instanceof Error && error.cause instanceof Error
        ? ` (${error.cause.message})`
        : "";

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `${error.message}${cause}`
            : "Could not submit project."
      },
      { status: 500 }
    );
  }
}
