import { Suspense } from 'react';

import Loader from './Loader';

const Loadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
