import React from "react";
import Carousel from "./Carousel";
import Book from "./Book";
import Services from "./Service";
import Rooms from "./Rooms";
import Sliders from "./Slider";
// import Teams from "./Team";
import LayoutClient from "../layout/cilent";
import About from "./About";

export default function Home() {
  return (
    <LayoutClient>
      <Carousel />
      <Book />
      <About />
      <Rooms />
      <Services />
      <Sliders />
      {/* <Teams /> */}
    </LayoutClient>
  );
}