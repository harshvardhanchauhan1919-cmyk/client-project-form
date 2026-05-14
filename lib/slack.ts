import { config } from "./config";
import type { ProjectSubmissionPayload } from "./airtable";

export async function notifySlack(payload: ProjectSubmissionPayload) {
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
            text: "New client project submission"
          }
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Project*\n${payload.projectName}` },
            { type: "mrkdwn", text: `*Company*\n${payload.company}` },
            { type: "mrkdwn", text: `*Contact*\n${payload.fullName}` },
            { type: "mrkdwn", text: `*Email*\n${payload.email}` },
            { type: "mrkdwn", text: `*Location*\n${payload.location || "Not specified"}` },
            { type: "mrkdwn", text: `*Start*\n${payload.projectStart || "Not specified"}` }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("Slack notification failed");
  }
}
