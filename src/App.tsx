import { useState, useEffect } from 'react';
import { Moon, Sun, Save, FolderOpen, ArrowLeft } from 'lucide-react';
import { EditorPane } from './components/EditorPane';
import { PreviewPane } from './components/PreviewPane';
import { Home } from './components/Home';
import { useFileSystem } from './hooks/useFileSystem';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'editor'>('home');
  const [markdown, setMarkdown] = useState<string>('# Welcome to Pricto\n\nStart typing your next masterpiece...');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  const { openFile, saveFile, isDirty } = useFileSystem(markdown, setMarkdown);

  // Apply dark mode to HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (currentView === 'home') {
    return <Home onStartEditing={() => setCurrentView('editor')} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-200">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors mr-2 p-1 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            title="Go back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 italic">
            Pricto<span className="text-blue-500">.</span>
          </h1>
          
          <div className="flex items-center space-x-2 ml-4 border-l border-zinc-300 dark:border-zinc-700 pl-4">
            <button 
              onClick={openFile}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700 transition"
            >
              <FolderOpen className="w-4 h-4 mr-2 text-zinc-400 group-hover:text-blue-500 transition-colors" />
              Open
            </button>
            <button 
              onClick={saveFile}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition ${
                isDirty 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent shadow-lg shadow-blue-500/20' 
                  : 'text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              Save {isDirty && '*'}
            </button>
          </div>
        </div>

        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 text-zinc-500 rounded-lg hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all duration-200 border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Main Content Split */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Pane - Editor */}
        <div className="w-1/2 flex flex-col border-r border-zinc-200 dark:border-zinc-800">
          <EditorPane markdown={markdown} setMarkdown={setMarkdown} />
        </div>

        {/* Right Pane - Preview */}
        <div className="w-1/2 flex flex-col bg-zinc-50 dark:bg-zinc-950/50 overflow-y-auto">
          <PreviewPane markdown={markdown} setMarkdown={setMarkdown} />
        </div>
      </main>
    </div>
  );
}

export default App;
