export const categoryOptions = [
  "Consulting",
  "Product",
  "Data Science & Analytics",
  "Investment Professionals"
] as const;

export const consultingRoleOptions = [
  "Business analyst / Senior consultant (1-3 years of experience)",
  "Associate (3-5 years of experience)",
  "Engagement Manager (5-7 years of experience)",
  "Principal / Associate Partner (8+ years of experience)",
  "Other"
] as const;

export const productRoleOptions = [
  "Product Manager",
  "Product Owner",
  "Product Designer / UI/UX",
  "Other"
] as const;

export const dataScienceAnalyticsRoleOptions = [
  "Data Analyst (Data visualization, Python, PowerBI etc.)",
  "Data Scientist",
  "Data Engineer",
  "Other"
] as const;

export const investmentProfessionalsRoleOptions = [
  "Investment Banker",
  "Value Creation Specialist",
  "Other"
] as const;

export const roleOptionsByCategory = {
  Consulting: consultingRoleOptions,
  Product: productRoleOptions,
  "Data Science & Analytics": dataScienceAnalyticsRoleOptions,
  "Investment Professionals": investmentProfessionalsRoleOptions
} as const;

export const roleLevelOptions = [
  ...consultingRoleOptions,
  ...productRoleOptions,
  ...dataScienceAnalyticsRoleOptions,
  ...investmentProfessionalsRoleOptions
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
