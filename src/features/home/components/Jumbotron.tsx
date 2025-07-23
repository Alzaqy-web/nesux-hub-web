import { michroma } from "@/assets/fonts";
import React from "react";

const Jumbotron = () => {
  return (
    <section className="mt-10 space-y-3 text-center">
      <h1 className={`text-4xl font-bold md:text-6xl ${michroma.className}`}>
        The Event<span className="text-orange-500">Hub</span>
      </h1>
      {/* <p className="text-lg md:text-xl">
        A Event, experiences, end recipes
      </p> */}
    </section>
  );
};

export default Jumbotron;
