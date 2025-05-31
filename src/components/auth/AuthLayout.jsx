import { Navbar } from "../Navbar";

export const AuthLayout = ({ title, children }) => (
  <>
  <Navbar/>
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="bg-white p-15 rounded shadow-xl/20 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      {children}
    </div>
  </div>
  </>
);
