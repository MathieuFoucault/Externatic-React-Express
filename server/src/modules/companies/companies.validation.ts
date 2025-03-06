import { z } from "zod";

const CompanySchema = z.object({
  company_name: z
    .string()
    .min(2, {
      message: "Le nom de l'entreprise doit contenir au moins 2 caractères.",
    })
    .max(30, {
      message:
        "Le nom de l'entreprise ne peut pas contenir plus de 30 caractères.",
    }),
  description: z
    .string()
    .min(2, { message: "La description doit contenir au moins 2 caractères." })
    .max(500, {
      message: "La description ne peut pas contenir plus de 500 caractères.",
    }),
  sector: z
    .string()
    .min(2, {
      message: "Le secteur d'activité doit contenir au moins 2 caractères.",
    })
    .max(30, {
      message:
        "Le secteur d'activité ne peut pas contenir plus de 30 caractères.",
    }),
  employee_number: z
    .string()
    .regex(/^\d{1,6}$/, {
      message:
        "Le nombre d'employés doit être un nombre valide (max 6 chiffres).",
    })
    .optional(),
  website_link: z
    .string()
    .url({ message: "Le lien du site doit être une URL valide." })
    .min(10, {
      message: "Le lien du site doit contenir au moins 10 caractères.",
    })
    .max(30, {
      message: "Le lien du site ne peut pas contenir plus de 30 caractères.",
    })
    .optional(),
});

export default CompanySchema;
