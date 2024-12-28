import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const GamePage = () => {
   const { unityProvider, addEventListener, removeEventListener } =
      useUnityContext({
         loaderUrl: "../game/Build/build8.loader.js",
         frameworkUrl: "../game/Build/build8.framework.js",
         dataUrl: "../game/Build/build8.data",
         codeUrl: "../game/Build/build8.wasm",
      });
   const navigate = useNavigate();
   const location = useLocation();
   const username = location.state?.username;
   const apiURL = import.meta.env.VITE_API_URL;

   const handleEndGame = useCallback(
      async (answersString) => {
         console.log("handleEndGame triggered");
         console.log(answersString);
         //Convert "1,0,1,0,0" to [1,0,1,0,0] (first from string to array of strings, then to array of numbers)
         const answersToNumbersArray = answersString.split(",").map((answer) => {
            return parseInt(answer);
         });

         const currentScore = answersToNumbersArray.reduce(
            (accumulator, currentValue) => {
               return accumulator + currentValue;
            },
            0
         );

         try {
            const response = await axios.patch(apiURL + "score", {
               username,
               score: currentScore,
            });
            console.log(response.data.message, response.data.updatedUser);
         } catch (error) {
            console.log(error);
         }
         navigate("/results", {
            state: {
               username: username,
               answersToNumbersArray: answersToNumbersArray,
               currentScore: currentScore,
            },
         });
      },
      [navigate]
   );

   useEffect(() => {
      addEventListener("ButtonClicked", handleEndGame);
      return () => {
         removeEventListener("ButtonClicked", handleEndGame);
      };
   }, [addEventListener, removeEventListener, handleEndGame]);

   return (
      <>
         <main className="flex-1">
            <div className="container py-10 flex justify-center">
               <Unity
                  style={{ width: 1200, height: 700 }}
                  unityProvider={unityProvider}
               />
            </div>
         </main>
      </>
   );
};

export default GamePage;
