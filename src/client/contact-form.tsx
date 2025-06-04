import Dropdown from "./components/dropdown";
import { useState } from "react";
import Input from "./components/input";
import Chip from "./components/chip";
import CrossIcon from "./components/icons/cross";
import styled, { css } from "styled-components";
import { Button } from "./components/button";
import { CheckCircleIcon } from "./components/icons/checkCircle";
import { SendIcon } from "./components/icons/send";

const StyledButton = styled(Button)`
  width: 200px;
`;
const StyledForm = styled.form`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  h2 {
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xsmall};
`;

const LoadingSpinner = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid #ffffff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
  margin-left: ${({ theme }) => theme.spacing.xsmall};

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const SmallText = styled.p<{ $hasExtraSpacing?: boolean }>`
  font-size: 12px;
  margin: ${({ theme, $hasExtraSpacing }) =>
    $hasExtraSpacing ? `0 0 ${theme.spacing.small} 0` : "4px 0"};
`;
const ErrorMessage = styled(SmallText)`
  color: #ff4924;
`;

const Spacing = styled.span<{ size: "small" | "medium" | "large" }>`
  margin: ${({ theme }) => theme.spacing.xxsmall} 0;
  ${({ size }) => size === "small" && `height: 14px;`}
  ${({ size }) => size === "medium" && `height: 24px;`}
  ${({ size }) => size === "large" && `height: 32px;`}
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
    activities?: string;
  }>({});
  const [maxSelectedActivities, setMaxSelectedActivities] =
    useState<Boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitStatus(null);

    const dataToSend = {
      ...formData,
      activities: selectedActivities.map((item) => item.value),
    };

    validateEmail(dataToSend.email);
    validateName(dataToSend.name);
    validateActivities(dataToSend.activities);

    if (
      formErrors.name ||
      formErrors.email ||
      selectedActivities.length !== 3
    ) {
      return;
    }
    try {
      console.log("Sending data", dataToSend);
      setIsLoading(true);
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

        setTimeout(() => {
          setSubmitStatus(null);
          setFormData({ name: "", email: "" });
          setSelectedActivities([]);
          setMaxSelectedActivities(false);
          setSelectedDropdownValue(null);
        }, 1500);
      } else {
        console.error("Server error:", result.message);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOption = (option: { label: string; value: string }) => {
    if (selectedActivities.length < 3) {
      setSelectedActivities((prev) => [...prev, option]);
      setSelectedDropdownValue(option);
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        email: "Ange en giltig e-postadress.",
      }));
    }
  };

  const validateName = (name: string) => {
    const nameRegex = /^[\p{L}\s\-]+$/u;
    if (nameRegex.test(name)) {
      setFormErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        name: "Ange ett giltigt namn.",
      }));
    }
  };
  const validateActivities = (activities: string[]) => {
    if (activities.length !== 3) {
      setFormErrors((prev) => ({
        ...prev,
        activities: "Du måste välja tre aktiviteter.",
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        activities: undefined,
      }));
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Personuppgifter</h2>
      <Input
        type="text"
        name="name"
        label="För- och efternamn*"
        onChange={(e) => handleChange("name", e)}
        onBlur={(e) => validateName(e.target.value)}
        error={formErrors.name}
        value={formData.name}
        required
      />
      <Input
        type="email"
        name="email"
        label="E-post*"
        onChange={(e) => handleChange("email", e)}
        onBlur={(e) => validateEmail(e.target.value)}
        error={formErrors.email}
        value={formData.email}
        required
      />
      <h2>Aktiviteter</h2>
      {selectedActivities.length > 0 && (
        <Container>
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
        </Container>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <SmallText $hasExtraSpacing>
          Välj tre aktiviteter du är intresserad av
        </SmallText>
        <Dropdown
          options={activities}
          disabledOptions={selectedActivities.map((item) => item.value)}
          label="Aktiviteter"
          onChange={toggleOption}
          value={selectedDropdownValue}
        />

        {maxSelectedActivities ? (
          <ErrorMessage>Du har redan valt tre aktiviteter</ErrorMessage>
        ) : formErrors.activities ? (
          <ErrorMessage>{formErrors.activities}</ErrorMessage>
        ) : (
          <Spacing size="small" />
        )}
      </div>
      <div>
        <StyledButton
          type="submit"
          disabled={isLoading || submitStatus === "success"}
        >
          {isLoading ? (
            <>
              Skickar
              <LoadingSpinner />
            </>
          ) : submitStatus === "success" ? (
            <>
              Skickat
              <CheckCircleIcon size={24} />
            </>
          ) : (
            <>
              Skicka anmälan <SendIcon size={24} />
            </>
          )}
        </StyledButton>
      </div>
    </StyledForm>
  );
};

export default ContactForm;
