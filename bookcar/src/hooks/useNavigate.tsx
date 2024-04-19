import React from "react";
import { useNavigate, useParams, NavigateFunction } from "react-router";

type RouteParams = Record<string, string | undefined>;
interface Props {
  params: RouteParams;
  navigate: NavigateFunction;
}

const withNavigate = (Component: React.ComponentType<Props>) => (props: any) => {
  const navigate = useNavigate();
  const params = useParams<RouteParams>();

  return <Component {...props} params={params} navigate={navigate} />;
};

export default withNavigate;
