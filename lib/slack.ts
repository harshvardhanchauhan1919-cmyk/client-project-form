import { config } from "./config";
import type { ProjectSubmissionPayload } from "./airtable";

type SlackNotificationOptions = {
  recordId?: string | null;
};

function field(label: string, value: string | string[] | null | undefined) {
  const displayValue = Array.isArray(value)
    ? value.join(", ")
    : value?.trim() || "Not specified";

  return {
    type: "mrkdwn",
    text: `*${label}*\n${displayValue}`
  };
}

function fieldSections(fields: ReturnType<typeof field>[]) {
  const sections = [];

  for (let index = 0; index < fields.length; index += 10) {
    sections.push({
      type: "section",
      fields: fields.slice(index, index + 10)
    });
  }

  return sections;
}

export async function notifySlack(
  payload: ProjectSubmissionPayload,
  options: SlackNotificationOptions = {}
) {
  if (!config.slackWebhookUrl) {
    return;
  }

  const detailFields = [
    field("Company", payload.company),
    field("Contact", payload.fullName),
    field("Email", payload.email),
    field("WhatsApp", payload.whatsappNumber),
    field("Category", payload.category),
    field("Role", payload.roleLevel),
    ...(payload.roleLevel === "Other"
      ? [field("Other Details", payload.otherDetails)]
      : []),
    field("Daily Rate", payload.dailyRate),
    field("Work Model", payload.workModel),
    field("Location", payload.location),
    field("Start", payload.projectStart),
    field("Duration", payload.projectDuration)
  ];

  const response = await fetch(config.slackWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New project submitted: ${payload.projectName}`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "New client project submission",
            emoji: true
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${payload.projectName}* was submitted by ${payload.fullName} from ${payload.company}.`
          }
        },
        ...fieldSections(detailFields),
        {
          type: "section",
          text: field("Project Description", payload.projectDescription)
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `Airtable record: ${options.recordId || "created"}`
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("Slack notification failed");
  }
}
