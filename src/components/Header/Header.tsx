import trollFace from "../../assets/img/troll-face.png";

export default function Header() {
  return (
    <header className="py-4  bg-[var(--accent-color)] w-full flex gap-4 justify-center">
      <img src={trollFace} className="w-16" />
      <h1 className="font-bold text-4xl text-[var(--font-color)]">
        Meme Generator
      </h1>
      <img src={trollFace} className="w-16 scale-x-[-1]" />
    </header>
  );
}
