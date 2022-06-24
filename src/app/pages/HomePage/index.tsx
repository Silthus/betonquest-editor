import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Flow } from '../../components/Flow/Flow';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <div style={{ height: '100vh' }}>
        <Flow></Flow>
      </div>
    </>
  );
}
