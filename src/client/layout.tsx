import { useState } from "react";
import Chip from "./components/chip";
import CrossIcon from "./components/icons/cross";

const activities = [
  { label: "paddling", value: "paddling" },
  { label: "matlagning", value: "matlagning" },
  { label: "pyssla", value: "pyssla" },
  { label: "sport", value: "sport" },
  { label: "sjunga", value: "sjunga" },
  { label: "spela teater", value: "spela teater" },
  { label: "vandring", value: "vandring" },
  { label: "fiska", value: "fiska" },
  { label: "löpning", value: "löpning" },
];
const Layout = () => {
  return (
    <>
      <h1>Anmälan lägerverksamhet</h1>
      <p>
        Fyll i formuläret nedan för att anmäla dig till lägerverksamhet 2025.
      </p>
      <Chip label="paddling" icon={<CrossIcon size={12} />} />
    </>
  );
};

export default Layout;
