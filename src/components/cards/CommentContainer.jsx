import { Container } from '@chakra-ui/react';
import { CommentBox } from './CommentBox';

export const CommentContainer = () => {
  return (
    <Container
      bg="#D3D3D3"
      w="29rem"
      p="1rem"
      borderRadius={5}
      marginBottom="12"
      color="black"
    >
      <CommentBox />
      <CommentBox />
      <CommentBox />
    </Container>
  );
};
