export const roleLevelOptions = [
  "SBA/Associate (DR: $700-$1000 USD)",
  "Consultant (DR: $1000-$1200 USD)",
  "Engagement Manager (DR: $1200-$1500 USD)"
] as const;

export const visaRequirementOptions = [
  "Candidate Must Hold Valid Visa",
  "Client Sponsors Visa",
  "No visa support (consultant responsible for visa and costs)",
  "Client covers visa costs; consultant arranges the visa independently",
  "Client sponsors and manages the visa process",
  "Remote; No Visa Needed"
] as const;

export const expensesPolicyOptions = [
  "Travel required; expenses are covered",
  "Travel required; no expenses covered",
  "No travel required; no expenses covered"
] as const;

export const workModelOptions = [
  "5 Days Onsite",
  "4 Days Onsite/1 Day Remote",
  "3 Days Onsite/2 Days Remote",
  "Remote",
  "Part-time",
  "Hourly"
] as const;

export const defaultProjectStatus = "Open to Applicants";
