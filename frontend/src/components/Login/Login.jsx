import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = ({ onSwitchToSignup, onSuccessfulConnection }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   const navigate = useNavigate();
   const apiURL = import.meta.env.VITE_API_URL;

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!username || !password) {
         setErrorMessage("Il faut remplir tous les champs.");
      } else {
         try {
            const response = await axios.post(apiURL + "login", {
               username,
               password,
            });
            console.log(response.data.message);
            setErrorMessage("");
            navigate("/game", { state: { username: username } });
         } catch (error) {
            console.log("Login error: ", error);
            if (error.response.data) {
               setErrorMessage(error.response.data.error);
            } else setErrorMessage("Erreur interne. Veuillez réessayer plus tard.");
         }
      }
   };

   return (
      <>
         <div className="px-8 pt-14 pb-8">
            <h2 className="text-center">Connecte-toi pour jouer</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="username" className="input-label">
                     Pseudo
                  </label>
                  <input
                     id="username"
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     className="input"
                     required
                  />
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     {showPassword ? (
                        <FaEye
                           className="text-black absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     ) : (
                        <FaEyeSlash
                           className="text-black absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     )}
                  </div>
               </div>
               <button
                  className="bg-text font-medium text-white py-1.5 rounded-lg mt-4 block w-full hover:bg-text-light transition-200"
                  type="submit"
               >
                  Se connecter
               </button>
            </form>

            {errorMessage && (
               <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
            <p
               className="text-center font-medium text-title mt-6"
               onClick={onSwitchToSignup}
            >
               Pas encore de compte ?{" "}
               <span className="cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline">
                  S'inscrire
               </span>
            </p>
         </div>
      </>
   );
};

export default Login;
