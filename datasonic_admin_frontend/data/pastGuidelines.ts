export interface PastGuideline {
    id: number;
    department: string;
    title: string;
    date: string;
    content: string;
  }
  
  export const pastGuidelines: PastGuideline[] = [
    {
      id: 1,
      department: "IT",
      title: "Guideline for IT Security",
      date: "2023-10-10",
      content:
        "Enhance security awareness training and implement multi-factor authentication (MFA).",
    },
    {
      id: 2,
      department: "HR",
      title: "Avoiding HR Scams",
      date: "2023-09-20",
      content:
        "Educate employees about phishing attacks targeting recruitment and sensitive records.",
    },
    {
      id: 3,
      department: "Finance",
      title: "Invoice Scam Prevention",
      date: "2023-08-15",
      content:
        "Verify all payment requests through secondary channels to avoid fraudulent payments.",
    },
  ];
  