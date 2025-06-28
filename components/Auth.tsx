'use client'

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/auth';

export const Auth = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, password);
        } catch {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto p-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded p-2"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded p-2"
                required
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Iniciar sesión
            </button>
        </form>
    );
};
