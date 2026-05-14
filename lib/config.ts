export const config = {
  airtablePat: process.env.AIRTABLE_PAT || "",
  airtableBaseId: process.env.AIRTABLE_BASE_ID || "applqRorS8rNvg48a",
  projectIntakeTableId:
    process.env.AIRTABLE_PROJECT_INTAKE_TABLE_ID || "tblnUJA3fqAeXjAX8",
  slackWebhookUrl: process.env.SLACK_PROJECT_SUBMISSIONS_WEBHOOK_URL || ""
};

export function assertServerConfig(required: Array<keyof typeof config>) {
  const missing = required.filter((key) => !config[key]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}
