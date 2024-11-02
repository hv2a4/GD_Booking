import React from "react";
import Heading from "../../components/common/Heading";
import About from "../../components/home/About";
import Team from "../../components/home/Team";
import LayoutClient from "../../components/layout/cilent";

export default function AboutUs() {
  return (
    <LayoutClient>
      <Heading heading="GIỚI THIỆU" title="Trang chủ" subtitle="Giới thiệu" />
      <About />
      {/* <Team /> */}
    </LayoutClient>
  );
}
