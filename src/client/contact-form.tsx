import Dropdown from "./components/dropdown";
import { useState } from "react";
import Input from "./components/input";
import Chip from "./components/chip";
import CrossIcon from "./components/icons/cross";
import styled from "styled-components";

const StyledForm = styled.form`
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 16px;
  border: 1px solid #000;
  border-top: none;
`;
const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const activities = [
  { label: "Paddling", value: "paddling" },
  { label: "Matlagning", value: "matlagning" },
  { label: "Pyssla", value: "pyssla" },
  { label: "Sport", value: "sport" },
  { label: "Sjunga", value: "sjunga" },
  { label: "Spela teater", value: "spela teater" },
  { label: "Vandring", value: "vandring" },
  { label: "Fiska", value: "fiska" },
  { label: "Löpning", value: "löpning" },
];
const ContactForm = () => {
  const [selectedActivities, setSelectedActivities] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log({ formData, response }, response);
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const toggleOption = (option: { label: string; value: string }) => {
    const isSelected = selectedActivities.some(
      (item) => item.value === option.value
    );

    if (isSelected) {
      // Remove from selected
      // setSelectedActivities((prev) =>
      //   prev.filter((item) => item !== option.value)
      // );
    } else {
      if (selectedActivities.length < 3) {
        // Add to selected if under limit
        setSelectedActivities((prev) => [...prev, option]);
      } else {
        // Optionally show a message or toast
        alert("You can only select up to 3 activities.");
      }
    }
  };
  const handleChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        label="Namn"
        onChange={(e) => handleChange("name", e)}
      />
      <Input
        type="email"
        name="email"
        label="E-post"
        onChange={(e) => handleChange("email", e)}
      />
      <h2>Aktiviteter</h2>
      <ChipsContainer>
        {selectedActivities.map((activity) => {
          return (
            <Chip
              key={activity.value}
              label={activity.label}
              onClick={() =>
                setSelectedActivities((prev) =>
                  prev.filter((item) => item.value !== activity.value)
                )
              }
              icon={<CrossIcon size={12} />}
            />
          );
        })}
      </ChipsContainer>
      <div>
        <Dropdown
          options={activities}
          disabledOptions={
            selectedActivities.length >= 3
              ? activities
                  .map((item) => item.value)
                  .filter(
                    (value) =>
                      !selectedActivities.some((sel) => sel.value === value)
                  )
              : selectedActivities.map((item) => item.value)
          }
          label="Aktiviteter"
          onChange={toggleOption}
        />
        <p style={{ fontSize: "12px", marginTop: "4px" }}>
          Välj tre aktiviteter du är intresserad av
        </p>
      </div>
      <div>
        <button type="submit">Skicka anmälan</button>
      </div>
    </StyledForm>
  );
};

export default ContactForm;
