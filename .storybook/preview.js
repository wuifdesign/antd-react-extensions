import { RouterContext } from "next/dist/shared/lib/router-context";

import '../src/storybook.less';

export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
