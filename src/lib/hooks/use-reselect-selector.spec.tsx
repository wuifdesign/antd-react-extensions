import React, { useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import { Provider, useDispatch } from 'react-redux';
import { act, render } from '@testing-library/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import useReselectSelector from './use-reselect-selector';

type TestState = {
  test: {
    a: { c: number }
    b: number
  }
}

describe('useReselectSelector', () => {
  it('should select state', (done) => {
    expect.assertions(3);

    const slice = createSlice({
      name: 'test',
      initialState: { a: { c: 0 }, b: 1 },
      reducers: {
        doNothing: (state) => state,
        updateB: (state) => {
          state.b = 2;
        },
        updateC: (state) => {
          state.a.c = 3;
        },
      },
    });

    const store = configureStore({
      reducer: { test: slice.reducer },
    });

    const testSelector = createSelector(
      (state: TestState) => state.test,
      (_state: any, props: { key: string }) => props.key,
      (state, key) => (state as any)[key],
    );

    let testValue: any = { c: 0 };

    const TestComp: React.FunctionComponent = () => {
      const dispatch = useDispatch();
      const [key, setKey] = useState('a');
      const value = useReselectSelector(testSelector, { key });

      useEffect(() => {
        setTimeout(() => {
          dispatch(slice.actions.doNothing());
          dispatch(slice.actions.updateB());
          testValue = { c: 3 };
          dispatch(slice.actions.updateC());
          testValue = 2;
          act(() => setKey('b'));
          done();
        });
      }, []);

      expect(value).toEqual(testValue);

      return <div>{JSON.stringify(value)}</div>;
    };

    render(
      <Provider store={store}>
        <TestComp/>
      </Provider>,
    );
  });
});
