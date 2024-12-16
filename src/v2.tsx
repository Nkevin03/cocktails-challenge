import { useEffect, useState } from "react";
import logo from "./assets/barman.png";
import axios from "axios";

interface Data {
  instructions: string;
  ingredients: any[];
}

export default function V2() {
  const [data, setData] = useState<Data | null>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [cocktailName, setCocktailName] = useState<string>("");
  const [countIngredients, setCountIngredients] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCocktailName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCocktailName(e.target.value);
  };


    const handleShowModal = () => {
      setShowModal(true);
    };

    const handleClose = () => {
      setShowModal(false);
    };
  const fetchCocktailData = () => {
    axios
      .get(`https://api.api-ninjas.com/v1/cocktail?name=${cocktailName}`, {
        headers: {
          "X-Api-Key": "ymcvH2M6h8ACt7Zu5pw42A==XwtfQoK9yzAvOO9L",
        },
      })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setData(res.data[0]);
          setIngredients(res.data[0].ingredients || []);
          console.log("Ingredienti:", res.data[0].ingredients);
          setCountIngredients(res.data[0].ingredients.length);
          res.data[0].ingredients.forEach((ing: any) => {
            console.log("Ingrediente:", ing);
          });
        } else {
          console.log("Nessun cocktail trovato.");
          handleShowModal();
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="container mx-auto">
      <div
        className={`${
          showModal ? "block" : "hidden"
        } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#eaf3f1] w-1/2 h-1/2 rounded-xl p-4 border-4 border-gray-950 shadow-brutalSmall`}
      >
        <button
          onClick={handleClose}
          className=" text-[#3a3c46] text-xl rounded-xl  p-4 shadow-brutalSmall absolute top-3 right-3 border-2 border-gray-950"
        >
          Chiudi
        </button>
        <h2 className="text-4xl text-center font-bold mb-6 uppercase text-[#3a3c46] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Il cocktail {cocktailName} non esiste, cercane uno diverso
        </h2>
      </div>
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-7xl font-bold mb-6 uppercase text-[#3a3c46]">
          Hey, crea il tuo cocktail!
        </h1>
        <img src={logo} alt="logo" className="w-1/2" />

        <div className="flex justify-between w-full px-2">
          <input
            type="text"
            placeholder="Nome del cocktail"
            className="w-10/12 p-4 rounded-s-md border-2  border-gray-950 shadow-brutalSmall "
            value={cocktailName}
            onChange={handleCocktailName}
          />
          <button
            className="bg-[#3a3c46] text-white shadow-brutalSmall  py-4 px-8 w-2/12 uppercase rounded-e-md"
            onClick={fetchCocktailData}
          >
            Cerca
          </button>
        </div>

        <div className="flex justify-between mt-16 w-full ">
          <div className="w-6/12 px-2">
            <div className="border-gray-950 border-4 p-4 rounded-md shadow-brutalSmall">
              <h2 className="text-4xl text-start font-bold mb-6 uppercase text-[#3a3c46]">
                Istruzioni
              </h2>
              <p className="text-xl text-[#3a3c46] text-start font-semibold">
                {data?.instructions}
              </p>
            </div>
          </div>
          <div className="w-6/12 px-2">
            <div className="border-gray-950 border-4 p-4 rounded-md shadow-brutalSmall">
              <h2 className="text-4xl text-start font-bold mb-6 uppercase text-[#3a3c46]">
                Ingredienti
              </h2>

              <div className="flex flex-col">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="text-xl w-12/12 px-4 my-4">
                    <span className="shadow-brutalSmall h-[80px] border-4 border-gray-950 text-[#3a3c46] font-semibold p-4 rounded-md mx-2 w-full flex gap-3 items-center uppercase">
                      <div className="w-[30px] h-[30px] border-2 border-gray-950 text-[#3a3c46] text-[16px] flex items-center justify-center rounded-full shadow-brutalSmall">
                        {index + 1}
                      </div>
                      <div>{JSON.stringify(ingredient)}</div>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
