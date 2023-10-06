// Register.tsx

import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Usuário registrado com sucesso
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
