import Dropdown from "./components/dropdown";
import { useState } from "react";
import Input from "./components/input";
import Chip from "./components/chip";
import CrossIcon from "./components/icons/cross";
import styled from "styled-components";
import { Button } from "./components/button";
const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
const StyledForm = styled.form`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 16px;
  border: 1px solid #000;
  border-top: none;
  h2 {
    margin: 0;
  }
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
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const [maxSelectedActivities, setMaxSelectedActivities] =
    useState<Boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitStatus(null);

    try {
      const dataToSend = {
        ...formData,
        activities: selectedActivities.map((item) => item.value),
      };

      const response = await fetch("http://localhost:3001/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "" });
        setSelectedActivities([]);
        setMaxSelectedActivities(false);
      } else {
        if (result.message.includes("name")) {
          setFormErrors((prev) => ({
            ...prev,
            name: "Fältet är obligatoriskt.",
          }));
        }
        if (result.message.includes("email")) {
          setFormErrors((prev) => ({
            ...prev,
            email: "Fältet är obligatoriskt.",
          }));
        }
        if (result.message.includes("activities")) {
          setFormErrors((prev) => ({
            ...prev,
            activities: "Du måste välja tre aktiviteter.",
          }));
        }
        console.error("Server error:", result.message);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  const toggleOption = (option: { label: string; value: string }) => {
    if (selectedActivities.length < 3) {
      setSelectedActivities((prev) => [...prev, option]);
    } else {
      setMaxSelectedActivities(true);
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
      <h2>Personuppgifter</h2>
      <Input
        type="text"
        name="name"
        label="För- och efternamn*"
        onChange={(e) => handleChange("name", e)}
        error={formErrors.name}
        value={formData.name}
      />
      <Input
        type="email"
        name="email"
        label="E-post*"
        onChange={(e) => handleChange("email", e)}
        error={formErrors.email}
        value={formData.email}
      />
      <h2>Aktiviteter</h2>
      {selectedActivities.length > 0 && (
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
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "12px", marginTop: "4px" }}>
          Välj tre aktiviteter du är intresserad av
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Dropdown
            options={activities}
            disabledOptions={selectedActivities.map((item) => item.value)}
            label="Aktiviteter"
            onChange={toggleOption}
          />
        </div>

        {maxSelectedActivities ? (
          <p style={{ color: "#FF4924", fontSize: "12px", marginTop: "4px" }}>
            Du har redan valt tre aktiviteter
          </p>
        ) : (
          <span style={{ height: "14px", margin: "4px 0" }}></span>
        )}
      </div>
      <div>
        <Button type="submit">Skicka anmälan</Button>

        {submitStatus === "error" ? (
          <p style={{ color: "#FF4924", fontSize: "12px", marginTop: "4px" }}>
            Något gick fel. Försök igen senare.
          </p>
        ) : (
          <span style={{ height: "14px", margin: "4px 0" }}></span>
        )}
      </div>
      {submitStatus === "success" && (
        <Modal>
          <p style={{ color: "green", fontSize: "12px" }}>
            Tack! Din anmälan har skickats.
          </p>
        </Modal>
      )}
    </StyledForm>
  );
};

export default ContactForm;
