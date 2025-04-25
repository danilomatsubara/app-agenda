import React from 'react';
import Link from 'next/link';

// Componentes para a estrutura básica do aplicativo
export const components = {
  // Componente para o cabeçalho do aplicativo
  Header: () => (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Dani Tattoos</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">Início</Link>
            </li>
            <li>
              <Link href="/agenda" className="hover:text-gray-300">Agenda</Link>
            </li>
            <li>
              <Link href="/configuracoes" className="hover:text-gray-300">Configurações</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  ),

  // Componente para o rodapé do aplicativo
  Footer: () => (
    <footer className="bg-gray-100 p-4 border-t">
      <div className="container mx-auto text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Dani Tattoos - Todos os direitos reservados</p>
      </div>
    </footer>
  ),

  // Componente para o layout principal
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col min-h-screen">
      <components.Header />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <components.Footer />
    </div>
  ),

  // Componente para botões primários
  Button: ({ 
    children, 
    onClick, 
    type = "button",
    className = ""
  }: { 
    children: React.ReactNode, 
    onClick?: () => void, 
    type?: "button" | "submit" | "reset",
    className?: string
  }) => (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors ${className}`}
    >
      {children}
    </button>
  ),

  // Componente para campos de formulário
  FormField: ({
    label,
    id,
    type = "text",
    required = false,
    placeholder = "",
    value,
    onChange
  }: {
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    placeholder?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  )
};
