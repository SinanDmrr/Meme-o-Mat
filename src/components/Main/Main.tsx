import {useState} from "react";
import trollFace from "../../assets/img/troll-face.png";
interface IMemeInformation {
  imgUrl: string;
  topText: string;
  bottomText: string;
}

interface MainProps {
  memeUrlArray: string[];
}

export default function Main({memeUrlArray}: MainProps) {
  const [memeInformation, setMemeInformation] = useState<IMemeInformation>({
    imgUrl: "http://i.imgflip.com/1bij.jpg",
    topText: "",
    bottomText: "",
  });

  function handleGenerateMeme() {
    if (memeUrlArray.length === 0) return;

    const randomIndex = Math.floor(Math.random() * memeUrlArray.length);
    const randomUrl = memeUrlArray[randomIndex];

    setMemeInformation((prev) => ({
      ...prev,
      imgUrl: randomUrl,
    }));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.currentTarget;
    if (name === "topText" || name === "bottomText") {
      setMemeInformation((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(`Neuer Wert für ${name}: ${value}`);
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-start w-full px-5">
      <div className="form flex flex-col w-full max-w-[570px] min-w-[300px] gap-5">
        <div className="flex flex-col items-center w-full sm:flex-row sm:justify-between">
          <label className="flex flex-col text-center w-full sm:w-[48%]">
            <p className="font-bold text-3xl mb-3 text-[var(--accent-color)] text-shadow-lg">
              Oberer Text
            </p>
            <input
              type="text"
              placeholder="Oberer Text"
              name="topText"
              className="bg-white rounded-lg p-1 outline-none"
              maxLength={40}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col text-center w-full sm:w-[48%]">
            <p className="font-bold text-3xl mb-3 text-[var(--accent-color)] text-shadow-lg">
              Unterer Text
            </p>
            <input
              type="text"
              placeholder="Unterer Text"
              name="bottomText"
              className="bg-white rounded-lg p-1 outline-none"
              maxLength={40}
              onChange={handleChange}
            />
          </label>
        </div>

        <button
          className="gradient-accent-combined rounded-3xl p-2 flex justify-center gap-3"
          onClick={handleGenerateMeme}>
          <img src={trollFace} className="w-10" />
          <p className="text-[var(--font-color)] font-bold text-2xl">
            Erstelle jetzt dein Meme
          </p>
          <img src={trollFace} className="w-12 scale-x-[-1] xs:w-16" />
        </button>
      </div>
      <div className="meme w-full max-w-[570px] min-w-[300px] my-5 relative">
        <img
          src={memeInformation.imgUrl}
          className="w-full max-h-[400px] object-contain"
        />
        <span className="top absolute top-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-3xl text-shadow-lg w-[80%]">
          {memeInformation.topText}
        </span>
        <span className="bottom absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl text-shadow-lg w-[80%]">
          {memeInformation.bottomText}
        </span>
      </div>
    </main>
  );
}
