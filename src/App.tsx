import MainLayout from "./layout/MainLayout";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <ProtectedRoutes>
      <MainLayout />
    </ProtectedRoutes>
  );
};

export default App;
