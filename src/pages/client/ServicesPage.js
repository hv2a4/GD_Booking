import React from "react";
import Heading from "../../components/common/Heading";
import Services from "../../components/home/Service";
import Sliders from "../../components/home/Slider";
import LayoutClient from "../../components/layout/cilent";

export default function Service() {
  return (
    <LayoutClient>
      <Heading heading="Services" title="Home" subtitle="Services" />
      <Services />
      <Sliders />
    </LayoutClient>
  );
}
