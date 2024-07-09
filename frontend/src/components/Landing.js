import { useNavigate } from "react-router-dom";
import LandingSection from "../LandingSection";
import NavbarButton from "./shared/buttons/NavbarButton";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-y-auto ">
      <div
        id="navbar"
        className="fixed top-0 mt-2 flex h-16 w-full max-w-7xl items-center justify-between font-semibold text-slate-100"
      >
        <div className="flex justify-start">
          <h3 className="title px-2 text-2xl">Cooldown</h3>
          <span className="rounded-full bg-emerald-300 p-1 text-teal-600">
            beta
          </span>
        </div>

        <div className="flex justify-end">
          <NavbarButton text="Demo"></NavbarButton>
          <NavbarButton text="Sign up"></NavbarButton>
          <NavbarButton text="Login"></NavbarButton>
        </div>
      </div>
      <div className="h-auto w-full overflow-y-auto bg-gradient-to-b from-teal-900 to-slate-800 text-teal-900">
        <div
          id="slide-1"
          className="flex h-auto w-full flex-col items-center justify-start"
        >
          <div className="mt-60 h-96">
            <h1 className=" title text-6xl text-white">
              Curate your consumption
            </h1>
            <h2 className=" title p-4 text-4xl text-white">
              Track, reflect, and grow with Cooldown
            </h2>
          </div>
          <div className="h-96 bg-red-50">Img Placeholder</div>
        </div>
        <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-500 bg-slate-700 p-16">
          <div
            id="slide-2"
            className="flex h-screen w-full flex-col items-center justify-start"
          >
            <LandingSection
              title="Track Your Media:"
              text="Seamlessly link popular games, movies, books, and music with your
          entries for a complete archive of your media journey."
            ></LandingSection>
            <LandingSection
              title="Insightful Usage Reports:"
              text="Gain clarity on your media habits with detailed analytics, empowering you to make informed choices and cultivate mindful habits."
            ></LandingSection>
            <LandingSection
              title="Customize Your Entries:"
              text="Enhance your journal with searchable tags and rich text editing to embody your unique style and preferences"
            ></LandingSection>
          </div>
        </div>
        <footer>
          <button>Contact Us</button>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
