import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useStateWithCallback =
  <S>(initialState: S | (() => S), callback: (state: S) => void): [S, Dispatch<SetStateAction<S>>] => {
    const [state, setState] = useState<S>(initialState);

    useEffect(() => callback(state), [state, callback]);

    return [state, setState];
  };

export default useStateWithCallback;
