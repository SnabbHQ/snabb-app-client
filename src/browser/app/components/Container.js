/* @flow */
import styled from './styled';

const Container = styled(theme => ({
  margin: 'auto',
  maxWidth: '100%',//theme.container.maxWidths.big, // TODO: Use media queries.
  minHeight: '100vh', // make footer sticky
}));

export default Container;
