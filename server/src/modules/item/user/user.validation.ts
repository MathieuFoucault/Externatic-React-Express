import { z } from "zod";

const passwordSchema = z
  .string()
  .min(12, "Le mot de passe doit contenir au moins 12 caractères")
  .max(30, "Le mot de passe ne peut pas contenir plus de 30 caractères")
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s:])[^\s]{12,30}$/,
    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
  );

const userFormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "Le prénom doit au moins contenir 2 caractères")
      .max(30, "Le prénom ne peut pas contenir plus de 30 caractères"),

    lastname: z
      .string()
      .min(2, "Le nom doit au moins contenir 2 caractères")
      .max(30, "Le nom ne peut pas contenir plus de 30 caractères"),

    email: z.string().email("Adresse email invalide"),

    password: passwordSchema,

    confirmPassword: z.string(),

    address: z
      .string()
      .max(100, "L'adresse ne peut pas contenir plus de 100 caractères"),

    postal_code: z
      .string()
      .length(5, "Le code postal doit contenir 5 caractères")
      .regex(/^[0-9]{5}$/, "Code postal incorrect"),

    city: z
      .string()
      .max(100, "La ville ne peut pas contenir plus de 100 caractères"),

    tel: z.string().regex(/^[0-9]{10}$/, "Numéro de téléphone invalide"),

    is_active: z.enum(["1", "0"]).transform((val) => val === "1"),
    is_role: z.enum(["1", "0"]).transform((val) => val === "1"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default userFormSchema;
