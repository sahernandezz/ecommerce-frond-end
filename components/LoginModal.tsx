'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Auth } from '@/components/Auth';
import { useLoginModal } from '@/context/login-modal';
import { useState, useEffect } from 'react';

export const LoginModal = () => {
  const { open, setOpen } = useLoginModal();
  const [modalTitle, setModalTitle] = useState('Iniciar sesión');

  // Escuchar cambios en el contenido del modal para actualizar el título
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const recoveryTitle = document.querySelector('h3');
          if (recoveryTitle && recoveryTitle.textContent?.includes('Recuperar contraseña')) {
            setModalTitle('Recuperar contraseña');
          } else {
            setModalTitle('Iniciar sesión');
          }
        }
      });
    });

    if (open) {
      const modalContent = document.querySelector('[role="dialog"]');
      if (modalContent) {
        observer.observe(modalContent, { childList: true, subtree: true });
      }
    }

    return () => observer.disconnect();
  }, [open]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white p-8 text-black shadow-xl transition-all dark:bg-neutral-800 dark:text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{modalTitle}</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close login"
              className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 transition-all ease-in-out hover:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Auth />
        </DialogPanel>
      </div>
    </Dialog>
  );
};
