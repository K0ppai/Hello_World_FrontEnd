import { useSelector } from 'react-redux';

const Greeting = () => {
  let greetings = useSelector((state) => state.greetings.greetings);
  const status = useSelector((state) => state.greetings.status);
  const randomIndex = Math.floor(Math.random() * greetings.length);
  console.log(status);
  console.log(greetings);

  return (
    <div>{status === 'loading' ? <p>loading</p> : <p>{greetings[randomIndex].message}</p>}</div>
  );
};

export default Greeting;
