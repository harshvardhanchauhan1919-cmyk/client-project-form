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

export async function notifySlack(
  payload: ProjectSubmissionPayload,
  options: SlackNotificationOptions = {}
) {
  if (!config.slackWebhookUrl) {
    return;
  }

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
        {
          type: "section",
          fields: [
            field("Company", payload.company),
            field("Contact", payload.fullName),
            field("Email", payload.email),
            field("WhatsApp", payload.whatsappNumber),
            field("Role/Level", payload.roleLevel),
            field("Daily Rate", payload.dailyRate),
            field("Work Model", payload.workModel),
            field("Location", payload.location),
            field("Start", payload.projectStart),
            field("Duration", payload.projectDuration)
          ]
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
