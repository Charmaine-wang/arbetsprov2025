import { useState } from "react";

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
    </>
  );
};

export default Layout;
