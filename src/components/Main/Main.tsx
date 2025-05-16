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
    topText: "Montagsmorgen:",
    bottomText: "Ich bin wach, aber mein Wille nicht...",
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
        // [name] = Eigenschaftsname vom Event welches Inputfeld triggert dessen name, dadurch das name und der Key vom memeInformation
        // übereinstimmen kann man hier einfach den value direkt dem passenden memeInformation.topText oder bottomText zuweisen.
        // sozusagen speicher [name] die information name vom Inputfeld, weil das unser event.currentTarget ist
        [name]: value,
      }));
      console.log(`Neuer Wert für ${name}: ${value}`);
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center w-full px-5">
      <div className="form flex flex-col w-full max-w-[570px] min-w-[300px] gap-5">
        <div
          className="flex flex-col items-center w-full
          sm:flex-row sm:justify-between">
          <label
            className="flex flex-col text-center w-full
            sm:w-[48%]">
            <p className="font-bold text-3xl mb-3 text-[var(--accent-color)] text-shadow-lg">
              Oberer Text
            </p>
            <input
              type="text"
              placeholder="Montagmorgen:"
              name="topText"
              className="bg-white rounded-lg p-1 outline-none"
              maxLength={40}
              onChange={handleChange}
            />
          </label>

          <label
            className="flex flex-col text-center w-full
            sm:w-[48%]">
            <p className="font-bold text-3xl mb-3 text-[var(--accent-color)] text-shadow-lg">
              Unterer Text
            </p>
            <input
              type="text"
              placeholder="Ich bin wach, aber mein Wille nicht."
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
          <img src={trollFace} className="w-10 " />
          <p className="text-[var(--font-color)] font-bold text-2xl">
            Erstelle jetzt dein Meme
          </p>
          <img src={trollFace} className="w-12 scale-x-[-1] xs:w-16" />
        </button>
      </div>
      <div className="meme w-full max-w-[570px] min-w-[300px] my-5">
        <img src={memeInformation.imgUrl} className="w-full max-h-200" />
        <span className="top">{memeInformation.topText}</span>
        <span className="bottom">{memeInformation.bottomText}</span>
      </div>
    </main>
  );
}
