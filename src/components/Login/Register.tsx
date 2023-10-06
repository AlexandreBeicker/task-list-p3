import React, { useState } from 'react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Simulando um registro bem-sucedido
      throw new Error('Erro ao registrar usuário');
    } catch (error: any) {
      console.error('Erro ao registrar usuário:', error.message);
    }
  };

  return (
    <div>
      <h1>Registrar</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
