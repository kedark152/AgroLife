import {
  Container,
  Text,
  Stack,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <Container
      as="footer"
      role="contentinfo"
      marginTop={['7rem', '1rem', '1rem']}
    >
      <Stack
        spacing={{
          base: '2',
          md: '5',
        }}
      >
        <Stack justify="space-between" direction="column" align="center">
          <Text fontSize="sm" fontWeight="bold" color="subtle">
            {`Made by Kedar Kulkarni`}
          </Text>
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/kedark152"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="https://github.com/kedark152"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="https://twitter.com/Kulkarni12Kedar"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
          <Text fontSize="sm" color="subtle">
            &copy; {2022} AgroLife, Inc. All rights reserved.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};
