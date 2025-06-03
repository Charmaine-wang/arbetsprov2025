import styled from "styled-components";
import ContactForm from "./contact-form";

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  font-family: sans-serif;
  width: 100%;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;
const Content = styled.div`
  padding: 16px;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  background-color: rgb(241, 194, 49);
  border: 1px solid rgb(241, 194, 49);
  box-sizing: border-box;
`;

const Layout = () => {
  return (
    <Card>
      <Content>
        <h1>Anmälan lägerverksamhet</h1>
        <p>
          Fyll i formuläret nedan för att anmäla dig till lägerverksamhet 2025.
        </p>
      </Content>
      <ContactForm />
    </Card>
  );
};

export default Layout;
