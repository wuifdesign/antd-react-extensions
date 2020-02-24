declare const useReactRouter: <Params extends { [K in keyof Params]?: string; } = {}>() => {
    history: import("history").History<unknown>;
    location: import("history").Location<unknown>;
    routeMatch: import("react-router").match<{}>;
    params: Params;
    searchParams: Record<string, string>;
};
export default useReactRouter;
