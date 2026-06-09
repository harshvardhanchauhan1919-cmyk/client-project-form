export const categoryOptions = ["Consulting", "Tech"] as const;

export const consultingRoleOptions = [
  "Business analyst / senior consultant (1-3 years experience)",
  "Associate (3-5 years experience)",
  "Engagement Manager (5-7 years experience)",
  "Principal / associate director (8+ years experience)",
  "Other"
] as const;

export const techRoleOptions = ["Product Manager", "Product Owner", "PMO", "Other"] as const;

export const roleOptionsByCategory = {
  Consulting: consultingRoleOptions,
  Tech: techRoleOptions
} as const;

export const roleLevelOptions = [
  ...consultingRoleOptions,
  ...techRoleOptions
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
