import { useForm } from "react-hook-form";

import type { UserFormData } from "../../lib/userForm.definitions";

type UserFormRegisterType = {
  onSubmit: (data: UserFormData) => void;
};

function UserFormRegister({ onSubmit }: UserFormRegisterType) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormData>();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-8 w-full max-w-lg p-8 rounded-lg shadow-lg bg-primary mx-12"
      >
        <section className="mb-6">
          <label
            htmlFor="lastName"
            className="block text-sm  text-white font-semibold"
          >
            Nom :
            <input
              placeholder="Martin"
              {...register("lastname", {
                required: "Le champ est requis",
                minLength: {
                  value: 2,
                  message: "Le champ doit au moins contenir 2 caractères",
                },
                maxLength: {
                  value: 30,
                  message:
                    "Le champ ne peut pas contenir plus de 30 caractères",
                },
              })}
              type="text"
              id="lastName"
              className="mt-2 p-2 block w-full rounded-md text-black border-gray-300 h-7"
            />
            {typeof errors.lastname?.message === "string" && (
              <span className="text-red-300">{errors.lastname.message}</span>
            )}
          </label>
        </section>
        <section className="mb-6">
          <label
            htmlFor="firstName"
            className="block text-sm  text-white font-semibold"
          >
            Prénom :
            <input
              placeholder="Pierre"
              {...register("firstname", {
                required: "Le champ est requis",
                minLength: {
                  value: 2,
                  message: "Le champ doit au moins contenir 2 caractères",
                },
                maxLength: {
                  value: 30,
                  message:
                    "Le champ ne peut pas contenir plus de 30 caractères",
                },
              })}
              type="text"
              id="firstName"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.firstname?.message === "string" && (
              <span className="text-red-300">{errors.firstname.message}</span>
            )}
          </label>
        </section>
        <section className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm  text-white font-semibold"
          >
            Adresse Mail :
            <input
              placeholder="pierre.martin@gmail.com"
              {...register("email", {
                required: "Le champ est requis",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  message: "Adresse email invalide",
                },
              })}
              className="mt-2  p-2 block w-full rounded-md  text-black border-gray-300 h-7"
              type="email"
              id="email"
            />
            {typeof errors.email?.message === "string" && (
              <span className="text-red-300">{errors.email.message}</span>
            )}
          </label>
        </section>
        <section className="mb-6">
          <label
            htmlFor="address"
            className="block text-sm  text-white font-semibold"
          >
            Adresse (N°, rue) :
            <input
              placeholder="3 rue de la Fleur"
              {...register("address", {
                required: "Le champ est requis",
                maxLength: {
                  value: 100,
                  message:
                    "Le champ ne peut pas contenir plus de 100 caractères",
                },
              })}
              type="text"
              id="address"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.address?.message === "string" && (
              <span className="text-red-300">{errors.address.message}</span>
            )}
          </label>
        </section>
        <section className="mb-6">
          <label
            htmlFor="town"
            className="block text-sm  text-white font-semibold"
          >
            Ville :
            <input
              placeholder="Paris"
              {...register("city", {
                required: "Le champ est requis",
                maxLength: {
                  value: 100,
                  message:
                    "Le champ ne peut pas contenir plus de 100 caractères",
                },
              })}
              type="text"
              id="town"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.city?.message === "string" && (
              <span className="text-red-300">{errors.city.message}</span>
            )}
          </label>
        </section>

        <section className="mb-6">
          <label
            htmlFor="postCode"
            className="block text-sm  text-white font-semibold"
          >
            Code Postal :
            <input
              placeholder="75000"
              {...register("postal_code", {
                required: "Le champ est requis",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Code postal incorrect",
                },
              })}
              type="text"
              id="postCode"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.postal_code?.message === "string" && (
              <span className="text-red-300">{errors.postal_code.message}</span>
            )}
          </label>
        </section>
        <section className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="block text-sm  text-white font-semibold"
          >
            Téléphone :
            <input
              placeholder="0600000000"
              {...register("tel", {
                required: "Le champ est requis",
                pattern: {
                  value: /^[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$/,
                  message: "Numéro de téléphone invalide",
                },
              })}
              type="tel"
              id="phoneNumber"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.tel?.message === "string" && (
              <span className="text-red-300">{errors.tel.message}</span>
            )}
          </label>
        </section>
        <section className="mb-6">
          <label
            htmlFor="is_active"
            className="block text-sm text-white font-semibold"
          >
            Je souhaite être actif sur le site Externatic ?
            <article>
              <input
                {...register("is_active", { required: "Ce champ est requis" })}
                type="radio"
                value="1" // Utiliser une chaîne pour correspondre au schéma Zod
                className="mt-2 ml-3 mr-3"
              />
              Oui
              <input
                {...register("is_active", { required: "Ce champ est requis" })}
                type="radio"
                value="0" // Utiliser une chaîne pour correspondre au schéma Zod
                className="mt-2 ml-6 mr-3"
                defaultChecked
              />
              Non
            </article>
          </label>
        </section>

        <section className="mb-6">
          <label
            htmlFor="is_role"
            className="block text-sm text-white font-semibold"
          >
            Je souhaite rester connecté sur le site ?
            <article>
              <input
                {...register("is_role", { required: "Ce champ est requis" })}
                type="radio"
                value="1"
                className="mt-2 ml-3 mr-3"
              />
              Oui
              <input
                {...register("is_role", { required: "Ce champ est requis" })}
                type="radio"
                value="0"
                className="mt-2 ml-6 mr-3"
                defaultChecked
              />
              Non
            </article>
          </label>
        </section>
        <section className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm  text-white font-semibold"
          >
            Mot de passe :
            <input
              placeholder="••••••••••••"
              {...register("password", {
                required: "Le champ est requis",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s:])[^\s]{12,30}$/,
                  message:
                    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
                },
                minLength: {
                  value: 12,
                  message:
                    "Le mot de passe doit contenir au moins 12 caractères",
                },
                maxLength: {
                  value: 30,
                  message:
                    "Le mot de passe ne peut pas contenir plus de 30 caractères",
                },
              })}
              type="password"
              id="password"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.password?.message === "string" && (
              <span className="text-red-300">{errors.password.message}</span>
            )}
          </label>
        </section>
        <section className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm  text-white font-semibold"
          >
            Confirmez votre mot de passe :
            <input
              placeholder="••••••••••••"
              {...register("confirmPassword", {
                required: "Le champ est requis",
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "Les mots de passe ne correspondent pas";
                  }
                },
              })}
              type="password"
              id="confirmPassword"
              className="mt-2 p-2 block w-full rounded-md  text-black border-gray-300 h-7"
            />
            {typeof errors.confirmPassword?.message === "string" && (
              <span className="text-red-300">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
        </section>
        <button
          type="submit"
          className="px-4 py-2 rounded mt-5 btn-submit hover:bg-orange-600"
        >
          Créer un compte
        </button>
      </form>
    </>
  );
}

export default UserFormRegister;
