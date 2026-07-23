export type DetailSection = {
  title: string;
  fields: readonly (readonly [string, string])[];
};
export const USER_DETAIL_SECTIONS: readonly DetailSection[] = [
  {
    title: "Personal Information",
    fields: [
      ["FULL NAME", "Grace Effiom"],
      ["PHONE NUMBER", "07060780922"],
      ["EMAIL ADDRESS", "grace@gmail.com"],
      ["BVN", "07060780922"],
      ["GENDER", "Female"],
      ["MARITAL STATUS", "Single"],
      ["CHILDREN", "None"],
      ["TYPE OF RESIDENCE", "Parent’s Apartment"],
    ],
  },
  {
    title: "Education and Employment",
    fields: [
      ["LEVEL OF EDUCATION", "B.Sc"],
      ["EMPLOYMENT STATUS", "Employed"],
      ["SECTOR OF EMPLOYMENT", "FinTech"],
      ["DURATION OF EMPLOYMENT", "2 years"],
      ["OFFICE EMAIL", "grace@lendsqr.com"],
      ["MONTHLY INCOME", "₦200,000.00– ₦400,000.00"],
      ["LOAN REPAYMENT", "40,000"],
    ],
  },
  {
    title: "Socials",
    fields: [
      ["TWITTER", "@grace_effiom"],
      ["FACEBOOK", "Grace Effiom"],
      ["INSTAGRAM", "@grace_effiom"],
    ],
  },
  {
    title: "Guarantor",
    fields: [
      ["FULL NAME", "Debby Ogana"],
      ["PHONE NUMBER", "07060780922"],
      ["EMAIL ADDRESS", "debby@gmail.com"],
      ["RELATIONSHIP", "Sister"],
    ],
  },
  {
    title: "",
    fields: [
      ["FULL NAME", "Debby Ogana"],
      ["PHONE NUMBER", "07060780922"],
      ["EMAIL ADDRESS", "debby@gmail.com"],
      ["RELATIONSHIP", "Sister"],
    ],
  },
];
export const USER_DETAIL_TABS = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
] as const;
