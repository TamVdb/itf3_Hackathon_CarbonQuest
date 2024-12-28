import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserSchema = z.object({
   username: z
      .string()
      .min(1, { message: "1 caractère minimum" })
      .max(10, { message: "10 caractères maximum" })
      .trim(),
   email: z.string().email({ message: "Email incorrect" }),
   password: z
      .string()
      .min(8, { message: "8 caractères minimum" })
      .max(15, { message: "15 caractères maximum" }),
});

const Signup = ({ onSwitchToLogin, onSuccessfulConnection }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const navigate = useNavigate();
   const apiURL = import.meta.env.VITE_API_URL;

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(UserSchema),
   });

   const onSubmit = async (data) => {
      if (!data.username || !data.email || !data.password) {
         setErrorMessage("Il faut remplir tous les champs.");
      } else {
         try {
            const response = await axios.post(apiURL + "register", {
               username: data.username,
               password: data.password,
            });
            console.log(response.data.message);
            setErrorMessage("");
            navigate("/game", { state: { username: data.username } });
         } catch (error) {
            console.log("Register error: ", error);
            if (error.response?.data) {
               setErrorMessage(error.response.data.error);
            } else setErrorMessage("Erreur interne. Veuillez réessayer plus tard.");
         }
      }
   };

   return (
      <div className="px-8 pt-14 pb-8">
         <h2 className="text-center">Inscris-toi pour jouer</h2>
         <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
               <label htmlFor="username" className="input-label">
                  Pseudo
               </label>
               <input
                  id="username"
                  type="text"
                  {...register("username")}
                  required
                  className="input"
                  placeholder="max. 10 caractères"
               />
               {errors.username && (
                  <span className="text-red-500">{errors.username.message}</span>
               )}
            </div>
            <div>
               <label htmlFor="email" className="input-label">
                  Email
               </label>
               <input
                  id="email"
                  type="email"
                  {...register("email")}
                  required
                  className="input"
               />
               {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
               )}
            </div>
            <div>
               <label htmlFor="password" className="input-label">
                  Mot de passe
               </label>
               <div className="relative">
                  <input
                     className="input pr-8"
                     id="password"
                     type={showPassword ? "text" : "password"}
                     {...register("password")}
                     required
                     placeholder="min. 8 caractères"
                  />
                  {showPassword ? (
                     <FaEye
                        className="text-darkerText absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                     />
                  ) : (
                     <FaEyeSlash
                        className="text-darkerText absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                     />
                  )}
               </div>
               {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
               )}
            </div>
            <button
               className="bg-text font-medium text-white py-1.5 rounded-lg mt-4 block w-full hover:bg-text-light transition-200"
               type="submit"
            >
               Créer un compte
            </button>
         </form>
         {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
         )}
         <p
            className="text-center font-medium text-title mt-6"
            onClick={onSwitchToLogin}
         >
            Déjà inscrit ?{" "}
            <span className="cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline">
               Se connecter
            </span>
         </p>
      </div>
   );
};

export default Signup;
