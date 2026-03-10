import React, { useRef } from 'react';
import { Toolbar } from './Toolbar';

interface EditorPaneProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export function EditorPane({ markdown, setMarkdown }: EditorPaneProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsert = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const textToInsert = selectedText || defaultText;
    
    const newText = markdown.substring(0, start) + prefix + textToInsert + suffix + markdown.substring(end);
    setMarkdown(newText);

    // After state update, we'd ideally reset cursor position. 
    // Using a timeout as a simple way to wait for render.
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + textToInsert.length);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Quick support for Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      handleInsert('  ', '');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
      <Toolbar onInsert={handleInsert} />
      <textarea
        ref={textareaRef}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 w-full p-4 md:p-6 resize-none outline-none font-mono text-sm leading-relaxed text-zinc-800 bg-transparent dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600"
        placeholder="Type your markdown here..."
        spellCheck="false"
      />
    </div>
  );
}
