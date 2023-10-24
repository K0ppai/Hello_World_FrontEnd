import { useSelector } from 'react-redux';

const Greeting = () => {
  let greeting = useSelector((state) => state.greetings.greetings);
  const status = useSelector((state) => state.greetings.status);

  return (
    <div>{status === 'loading' ? <p>loading</p> : <p>{greeting.greeting}</p>}</div>
  );
};

export default Greeting;
