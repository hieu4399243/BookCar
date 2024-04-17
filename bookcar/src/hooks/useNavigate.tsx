interface RouteComponentProps {
  history: {
    push: (path: string) => void;
  };
  location: {
    pathname: string;
  };
  match: {
    params: {
      [key: string]: string;
    };
  };
}

const useNavigateTo = ({ history }: RouteComponentProps) => {
  const navigateTo = (path: string) => {
    history.push(path);
  };

  return navigateTo;
};

export default useNavigateTo;
