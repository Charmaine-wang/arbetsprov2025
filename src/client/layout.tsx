import styled from "styled-components";
import Dropdown from "./components/dropdown";
import { useState } from "react";
import Input from "./components/input";
import Chip from "./components/chip";
import CrossIcon from "./components/icons/cross";

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
`;
const Content = styled.div`
  padding: 16px;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  background-color: rgb(241, 194, 49);
`;
const StyledForm = styled.form`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;
const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
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
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleOption = (option: { label: string; value: string }) => {
    const isSelected = selectedActivities.includes(option.value);

    if (isSelected) {
      // Remove from selected
      // setSelectedActivities((prev) =>
      //   prev.filter((item) => item !== option.value)
      // );
    } else {
      // Add to selected
      setSelectedActivities((prev) => [...prev, option.value]);
    }
  };

  return (
    <Card>
      <Content>
        <h1>Anmälan lägerverksamhet</h1>
        <p>
          Fyll i formuläret nedan för att anmäla dig till lägerverksamhet 2025.
        </p>
      </Content>
      <StyledForm>
        <Input type="text" name="name" label="Namn" />
        <Input type="email" name="email" label="E-post" /> <h2>Aktiviteter</h2>
        <ChipsContainer>
          {selectedActivities.map((activity) => (
            <Chip
              key={activity}
              label={activity}
              onClick={() =>
                setSelectedActivities((prev) =>
                  prev.filter((item) => item !== activity)
                )
              }
              icon={<CrossIcon size={12} />}
            />
          ))}
        </ChipsContainer>
        <Dropdown
          options={activities}
          disabledOptions={selectedActivities}
          label="Aktiviteter"
          onChange={toggleOption}
        />
        <div>
          <button>Skicka anmälan</button>
        </div>
      </StyledForm>
    </Card>
  );
};

export default Layout;
