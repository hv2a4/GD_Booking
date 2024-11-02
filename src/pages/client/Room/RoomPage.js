import React from "react";
import Heading from "../../../components/common/Heading";
import Rooms from "../../../components/home/Rooms";
import LayoutClient from "../../../components/layout/cilent"

export default function RoomClient() {
  return (
    <LayoutClient>
      <Heading heading="Room" title="Home" subtitle="Room" />
      <Rooms />
    </LayoutClient>
  );
}
