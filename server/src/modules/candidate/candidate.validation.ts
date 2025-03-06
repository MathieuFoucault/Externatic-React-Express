import { z } from "zod";

// Définir le schéma de validation pour la mise à jour des informations du candidat
const candidateUpdateSchema = z.object({
  user_id: z.number().int().positive("L'ID de l'utilisateur est requis."),
  photo: z
    .instanceof(FileList)
    .optional()
    .refine(
      (fileList) => {
        return fileList?.length === 0 || (fileList && fileList[0].size > 0);
      },
      { message: "Une photo valide est requise." },
    ),
  cv: z
    .instanceof(FileList)
    .optional()
    .refine(
      (fileList) => {
        return fileList?.length === 0 || (fileList && fileList[0].size > 0);
      },
      { message: "Un CV valide est requis." },
    ),
  is_disabled: z.enum(["0", "1"], {
    errorMap: () => ({ message: "Ce champ est requis." }),
  }),
});

export default candidateUpdateSchema;
