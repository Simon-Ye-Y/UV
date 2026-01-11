import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar/Navbar";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 这里添加登录逻辑
    console.log('Login attempt:', { username, password });
  };

  return (

    <div className="login-page">

      <div className="login-container">
        <div className="logo-container">
          <Link href="/">
            <Image
                src="/images/logo1.png"
                alt="UV Logo"
                width={200}
                height={200}
                priority
            />
          </Link>
        </div>
        <h1>Welcome Back</h1>
        <p className="subtitle">Please login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="forgot-link">
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don&apos;t have an account? <Link href="/register">Register</Link></p>
        </div>
      </div>
      <style jsx>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 1rem;
        }
        .login-container {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 450px;
        }
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        h1 {
          text-align: center;
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 2rem;
        }
        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #444;
          font-weight: 500;
        }
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        input:focus {
          outline: none;
          border-color: #0070f3;
        }
        .forgot-link {
          margin-bottom: 1.5rem;
          text-align: center;
          color: #666;
        }
        .forgot-link a {
          color: #0070f3;
          text-decoration: none;
          font-size: 0.9rem;
        }
        button {
          width: 100%;
          padding: 0.875rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #0051cc;
        }
        .register-link {
          margin-top: 1.5rem;
          text-align: center;
          color: #666;
        }
        .register-link a {
          color: #0070f3;
          text-decoration: none;
          font-weight: 500;
        }
        .register-link a:hover {
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .login-container {
            padding: 1.5rem;
          }
          h1 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
} 
