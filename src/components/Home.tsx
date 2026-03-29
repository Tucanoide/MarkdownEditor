import React from 'react';
import { ArrowRight, Edit3, Globe } from 'lucide-react';

interface HomeProps {
  onStartEditing: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStartEditing }) => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center overflow-hidden selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-8 animate-fade-in animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Globe className="w-3 h-3 mr-2" />
          Simple markdown editing
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 drop-shadow-sm">
          Pricto<span className="text-blue-600 dark:text-blue-500">.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          The premium markdown editor designed for speed, elegance, and focus. 
          Write directly to your local file system with beauty and precision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartEditing}
            className="group relative flex items-center px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-zinc-200 dark:shadow-none"
          >
            <Edit3 className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            Launch Editor
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <footer className="w-full py-10 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-zinc-500 dark:text-zinc-500 text-sm">
          <p>© 2024 Pricto Editor. All rights reserved.</p>
          <p className="mt-4 md:mt-0 font-medium">
            Design & Development by{' '}
            <a
              href="https://88mphlabs.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 decoration-blue-500/30 underline-offset-4 underline transition-colors"
            >
              88mphlabs
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
