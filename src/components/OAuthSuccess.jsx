import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const name = query.get("name") || "GitHub User";
    const email = query.get('email');

    if (token && email) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email }));
      navigate('/customer-dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">Logging you in via OAuth...</p>
    </div>
  );
};

export default OAuthSuccess;
