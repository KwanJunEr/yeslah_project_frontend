export interface ScamCase {
  id: number;
  date: string;
  type: string;
  description: string;
  department: string; // New field for department
}

export const scamCases: ScamCase[] = [
  {
    id: 1,
    date: "2023-01-15",
    type: "Attempt",
    description: "Phishing email pretending to be IT support.",
    department: "IT", // Assign department
  },
  {
    id: 2,
    date: "2023-02-10",
    type: "Success",
    description:
      "Employee shared login credentials after a fake job offer email.",
    department: "HR",
  },
  {
    id: 3,
    date: "2023-03-05",
    type: "Mistake",
    description: "Unverified email link clicked by an HR representative.",
    department: "HR",
  },
  {
    id: 4,
    date: "2023-04-20",
    type: "Attempt",
    description: "Fake invoice sent to finance department.",
    department: "Finance",
  },
  {
    id: 5,
    date: "2023-05-25",
    type: "Success",
    description:
      "Sensitive client information shared after social engineering attack.",
    department: "Sales",
  },
];
