import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>{user?.id}</h1>
    </div>
  );
};

export default Home;
