import styled, { css } from "styled-components";
import ContactForm from "./contact-form";

const Card = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    flex-direction: column;
    font-family: sans-serif;
    flex: 1;
    border: 1px solid ${theme.color.black};
    border-radius: ${theme.border.radius.small};
    padding: ${theme.spacing.large} ${theme.spacing.medium};
    margin: ${theme.spacing.small};
    gap: ${theme.spacing.large};

    @media (min-width: ${theme.mq.large}) {
      max-width: 500px;
      padding: ${theme.spacing.xlarge} ${theme.spacing.large};
      margin: ${theme.spacing.large};
    }
  `}
`;

const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  width: 100%;
  margin: auto;
  h1 {
    margin: 0;
  }
`;

const Content = styled.div`
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Layout = () => {
  return (
    <Container>
      <Card>
        <Content>
          <h1>Anmälan lägerverksamhet</h1>
          <p>
            Fyll i formuläret nedan för att anmäla dig till lägerverksamhet
            2025.
          </p>
        </Content>
        <ContactForm />
      </Card>
    </Container>
  );
};

export default Layout;
