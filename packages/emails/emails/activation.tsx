import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Button,
} from '@react-email/components';

interface ActivationProps {
  path: string;
}

const Activation: React.FC<Readonly<ActivationProps>> = ({ path }) => (
  <Html>
    <Head />
    <Preview>
      Before we can get started, we need to confirm your account.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirm your account</Heading>
        <Text style={text}>
          Thank you for signing up for Skohr. To confirm your account, please
          follow the button below.
        </Text>
        <Button style={button} href={path}>
          Confirm account
        </Button>
      </Container>
    </Body>
  </Html>
);

export default Activation;

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: 'auto',
  padding: '96px 20px 64px',
};

const h1 = {
  color: '#121212',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
};

const text = {
  color: '#121212',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 40px',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px',
  paddingLeft: '33px',
  paddingRight: '33px',
};
