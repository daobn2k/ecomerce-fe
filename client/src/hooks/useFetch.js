import { useReducer } from 'react';

const useFetch = () => {
  const [state, setState] = useReducer((prev, aft) => ({ ...prev, ...aft }), {
    data: null,
    loading: false,
    error: null,
  });
  return { state, setState };
};

export default useFetch;
