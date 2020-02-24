import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

const useReactRouter = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const routeMatch = useRouteMatch();
  const searchParams = {};
  const query = new URLSearchParams(location.search);
  query.forEach((value, key) => {
    searchParams[key] = value;
  });
  return {
    history,
    location,
    routeMatch,
    params,
    searchParams
  };
};

export default useReactRouter;