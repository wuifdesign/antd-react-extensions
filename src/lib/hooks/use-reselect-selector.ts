import { shallowEqual, useSelector } from 'react-redux';
import { useMemo } from 'react';

const useReselectSelector = <TSelectorArgs extends any, TSelected>(
  selector: (_: any, props: TSelectorArgs) => TSelected,
  props?: TSelectorArgs, useShallowEqual = true,
): TSelected => {
  const memoFunction = useMemo(() => selector, [selector]);
  return useSelector((state: any) => memoFunction(state, props as any), useShallowEqual ? shallowEqual : undefined);
};

export default useReselectSelector;
