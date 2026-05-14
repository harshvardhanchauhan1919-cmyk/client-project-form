# Stratverse Client Project Form

Public client project intake form for Stratverse.

## Current Flow

1. Client completes the public project submission form.
2. The server-side API route validates the fields.
3. The API route writes to Airtable table `Client Project Submissions`.
4. Airtable `Status` is set to `Open to Applicants` by default.
5. Optional Slack notification can be enabled through an incoming webhook.

For now, this form intentionally does not write directly to the live `Projects`
table to avoid triggering existing project automations during testing. Once the
form is finalized, the target table can be switched by changing the Airtable
mapping/API helper.

## Local Setup

Copy `.env.example` to `.env.local` and fill in:

```env
AIRTABLE_PAT=
AIRTABLE_BASE_ID=applqRorS8rNvg48a
AIRTABLE_PROJECT_INTAKE_TABLE_ID=tblnUJA3fqAeXjAX8
SLACK_PROJECT_SUBMISSIONS_WEBHOOK_URL=
```

The Airtable token must have access to the Stratverse base and include:

- `data.records:read`
- `data.records:write`
- access to table `Client Project Submissions`

`SLACK_PROJECT_SUBMISSIONS_WEBHOOK_URL` is optional. Leave it blank until the
Slack channel/webhook is ready.

Then run:

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Airtable Field Mapping

The form writes to `Client Project Submissions`:

- `Project Name`
- `Project Description`
- `Role/Level`
- `Daily Rate`
- `Visa Requirements`
- `Expenses Policy`
- `Work Model`
- `Location`
- `Project Start`
- `Project Duration`
- `Nationality Restrictions`
- `Additional Comments`
- `Your Full Name`
- `Company`
- `Email`
- `WhatsApp Number`
- `Status`

The public form does not write Airtable `Client` or `Project POC` for now.
Those should be assigned manually from `Company` and `Your Full Name` during
review.

## Vercel

Set the same environment variables in Vercel Project Settings before deploying.
Never expose `AIRTABLE_PAT` in browser code.
