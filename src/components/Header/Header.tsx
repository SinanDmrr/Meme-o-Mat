import trollFace from "../../assets/img/troll-face.png";

export default function Header() {
  return (
    <header className="py-4 gradient-accent-combined w-full flex gap-4 justify-center items-center">
      <img src={trollFace} className="size-10 xs:size-24" />
      <h1
        className="font-bold text-2xl text-[var(--font-color)] 
      xs:text-4xl">
        Meme-O-Mat
      </h1>
      <img src={trollFace} className="size-10 scale-x-[-1] xs:size-14" />
    </header>
  );
}
