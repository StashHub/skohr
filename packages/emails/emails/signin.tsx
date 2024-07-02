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

interface SignInProps {
  path: string;
}

const Signin: React.FC<Readonly<SignInProps>> = ({ path }) => (
  <Html>
    <Head />
    <Preview>Hey 👋, click the link below to sign in to your account.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h2}>Hey 👋,</Heading>
        <Text style={text}>
          Click the link below to sign in to your account.
        </Text>
        <Button style={button} href={path}>
          Sign in
        </Button>
        <Text style={small}>
          If you did not try to log into your account, you can safely ignore it.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default Signin;

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

const h2 = {
  color: '#121212',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
};

const text = {
  color: '#121212',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 30px',
};

const small = {
  color: '#aaaaaa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 30px',
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
  margin: '0 0 30px',
};
