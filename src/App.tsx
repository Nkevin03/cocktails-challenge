import {useState } from "react";
import data from "./data/data.json";
import "./App.css";
import logo from "./assets/barman.png";
import italy from "./assets/italy.png";
interface Ingredient {
  name: string;
  part: number;
  color: string;
}


function App() {
  // const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleCocktail = (cocktail: any) => {
    setIngredients(cocktail.ingredients);
    const totalParts = cocktail.ingredients.reduce(
      (acc: number, ingredient: Ingredient) => acc + ingredient.part,
      0
    );  

    const parts_percentage = cocktail.ingredients.map((ingredient: Ingredient) => {
      return {
        name: ingredient.name,
        part: ingredient.part,
        percentage: ingredient.part / totalParts * 100,
        color: ingredient.color,
      };
    });

    const parts_pixels = parts_percentage.map((part: any) => {
      return {
        name: part.name,
        part: part.part,
        percentage: part.percentage,
        color: part.color,
      };
    });

    setIngredients(parts_pixels);

  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center flex-col items-center">
        <img src={logo} alt="logo" className="" />
        <h1 className="text-7xl font-bold mb-6 uppercase text-[#3a3c46]">
          Hey, crea il tuo cocktail!
        </h1>
      </div>
      <div className="flex justify-center  flex-wrap">
        {data.map((cocktail) => {
          return (
            <div key={cocktail.name} className="w-4/12 p-2">
              <div className="px-2">
                <button
                  onClick={() => handleCocktail(cocktail)}
                  className="px-4 w-full py-4 bg-[#cddcda] hover:bg-[#60b6a0] text-[#3a3c46] rounded-lg text-xl font-semibold uppercase"
                >
                  {cocktail.name}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto w-[400px] h-[500px] mt-32 relative">
        <div className="absolute inset-0 border-4 border-[#3a3c46] bg-transparent clip-glass bg-[#3a3c46]"></div>
        <div className="absolute -top-20 -right-24 w-full h-full flex justify-end ">
          <img src={italy} alt="italy" className="w-32 h-32" />
        </div>
        <div className="absolute inset-[6px] clip-glass">
          <div className="w-full h-full flex flex-col justify-end overflow-hidden bg-[#eaf3f1]">
            {ingredients.map((ingredient: any) => (
              <div
                key={ingredient.name}
                className="w-full text-center text-black font-bold flex items-center justify-center"
                style={{
                  height: `${ingredient.percentage}%`,
                  backgroundColor: ingredient.color,
                }}
              >
                <span className="text-center text-black text-xl font-medium">
                  {ingredient.part} part of {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
