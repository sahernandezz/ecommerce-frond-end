'use client'

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/auth';

export const Auth = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Estados para recuperación de contraseña
    const [isRecoveryMode, setIsRecoveryMode] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoveryError, setRecoveryError] = useState<string | null>(null);
    const [recoverySuccess, setRecoverySuccess] = useState(false);
    const [isRecoveryLoading, setIsRecoveryLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
        } catch {
            setError('Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecoverySubmit = async (e: FormEvent) => {
        e.preventDefault();
        setRecoveryError(null);
        setIsRecoveryLoading(true);

        try {
            // Aquí iría la llamada a la API para enviar el correo de recuperación
            // Por ahora simularemos una respuesta exitosa después de un tiempo
            await new Promise(resolve => setTimeout(resolve, 1000));
            setRecoverySuccess(true);
        } catch (error) {
            setRecoveryError('No se pudo enviar el correo de recuperación');
        } finally {
            setIsRecoveryLoading(false);
        }
    };

    const handlePasswordRecovery = () => {
        setIsRecoveryMode(true);
        setRecoveryEmail(email); // Pre-llenar con el email del login si existe
    };

    const handleBackToLogin = () => {
        setIsRecoveryMode(false);
        setRecoverySuccess(false);
        setRecoveryError(null);
    };

    if (isRecoveryMode) {
        return (
            <div className="flex flex-col gap-6 w-full animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recuperar contraseña</h3>
                    <button
                        onClick={handleBackToLogin}
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                        </svg>
                        Volver al login
                    </button>
                </div>

                {!recoverySuccess ? (
                    <form onSubmit={handleRecoverySubmit} className="flex flex-col gap-6 w-full">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-2">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    Introduce tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <label htmlFor="recovery-email" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                            <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="recovery-email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={recoveryEmail}
                                        onChange={(e) => setRecoveryEmail(e.target.value)}
                                        className="pl-10 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            bg-white dark:bg-neutral-700 transition-all duration-200"
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </div>

                        {recoveryError && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 animate-fade-in">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-500 mr-2 flex-shrink-0">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-red-600 dark:text-red-400 text-sm font-medium">{recoveryError}</span>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isRecoveryLoading || !recoveryEmail}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg
                                 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                                 flex items-center justify-center mt-2"
                        >
                            {isRecoveryLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                                        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                                    </svg>
                                    Enviar enlace de recuperación
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-6 animate-fade-in">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-6 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8 text-green-600 dark:text-green-300">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">¡Correo enviado!</h3>
                        <div className="bg-white dark:bg-neutral-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 mb-6">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Hemos enviado un correo electrónico a <strong className="text-blue-600 dark:text-blue-400">{recoveryEmail}</strong> con instrucciones para restablecer tu contraseña.
                            </p>
                        </div>
                        <button
                            onClick={handleBackToLogin}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg
                                transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                                <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clipRule="evenodd" />
                            </svg>
                            Volver al login
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="space-y-4">
                <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                            </svg>
                        </div>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                bg-white dark:bg-neutral-700 transition-all duration-200"
                            required
                        />
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                        Contraseña
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                bg-white dark:bg-neutral-700 transition-all duration-200"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-2">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
                            onClick={handlePasswordRecovery}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 animate-fade-in">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-500 mr-2">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</span>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg
                         transition-all duration-200 mt-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Iniciando sesión...
                    </>
                ) : "Iniciar sesión"}
            </button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                Al iniciar sesión, aceptas nuestros <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">términos y condiciones</a>
            </div>
        </form>
    );
};
