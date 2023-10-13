import styled from 'styled-components';

import Practice from '../features/practice/components';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Wrapper>
      <Practice />
      <Footer />
      <h1>Hello</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* padding-bottom: 1300px; */
`;
