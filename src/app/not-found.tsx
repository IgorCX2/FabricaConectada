// pages/404.tsx
import Head from 'next/head';
import Link from 'next/link';

const funnyMessages = [
  "Ops! Parece que nosso mapa do tesouro está desatualizado...",
  "404: Página não encontrada (mas encontramos essa mensagem especial para você)",
  "Nossos robôs de busca ficaram tontos e perderam seu caminho",
  "Você encontrou nossa sala secreta... que ainda está em construção!",
  "Alguém esqueceu de alimentar o hamster digital que roda este site",
];

const funEmojis = ['🛸', '🧭', '🔮', '👾', '🦄', '🚀', '🧿', '🪐'];

export default function Custom404() {
  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  const randomEmoji = funEmojis[Math.floor(Math.random() * funEmojis.length)];

  return (
    <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
        <main className="text-center max-w-4xl">
          <div className="relative">
            <h1 className="text-[15rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 select-none">404</h1>
            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-indigo-700">404</h2>
          </div>
          {/* <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Página não Encontrada</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">{randomMessage}</p>
          <div className="text-7xl mb-20 animate-bounce" style={{ animationDuration: '3s' }}>{randomEmoji}</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" passHref>
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Voltar para o Início
              </button>
            </Link>
            <button  className="px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-indigo-200">
              Voltar à Página Anterior
            </button>
          </div>

          <p className="mt-12 text-gray-500 italic">
            Se você acredita que isso é um erro, entre em contato com nosso suporte
          </p> */}
        </main>
    </body>
  );
}