import { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Link, List, ListOrdered, ListChecks, 
  Image, Quote, Code, Heading1, Heading2, Heading3, 
  Table as TableIcon, Palette, ChevronDown 
} from 'lucide-react';

interface ToolbarProps {
  onInsert: (prefix: string, suffix?: string, defaultText?: string) => void;
}

const COLORS = [
  { name: 'Default', value: '' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Rose', value: '#f43f5e' },
];

export function Toolbar({ onInsert }: ToolbarProps) {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const colorMenuRef = useRef<HTMLDivElement>(null);

  // Close color menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorMenuRef.current && !colorMenuRef.current.contains(event.target as Node)) {
        setIsColorOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const Button = ({ icon: Icon, onClick, title, active = false }: { icon: any, onClick: () => void, title: string, active?: boolean }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md transition ${
        active 
          ? 'text-zinc-900 bg-zinc-200 dark:text-zinc-100 dark:bg-zinc-800' 
          : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const insertTable = () => {
    const tableTemplate = `
| Header 1 | Header 2 | Header 3 |
| :--- | :--- | :--- |
| Content | Content | Content |
| Content | Content | Content |
`;
    onInsert(tableTemplate, '');
  };

  const insertColor = (color: string) => {
    if (color === '') {
      onInsert('<span>', '</span>', 'text');
    } else {
      onInsert(`<span style="color: ${color}">`, '</span>', 'colored text');
    }
    setIsColorOpen(false);
  };

  return (
    <div className="flex items-center space-x-1 p-2 bg-zinc-50 border-b border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800">
      <Button icon={Heading1} title="Heading 1" onClick={() => onInsert('# ', '')} />
      <Button icon={Heading2} title="Heading 2" onClick={() => onInsert('## ', '')} />
      <Button icon={Heading3} title="Heading 3" onClick={() => onInsert('### ', '')} />
      
      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1 flex-shrink-0" />
      
      <Button icon={Bold} title="Bold text" onClick={() => onInsert('**', '**', 'bold text')} />
      <Button icon={Italic} title="Italic text" onClick={() => onInsert('_', '_', 'italic text')} />
      
      {/* Color Picker */}
      <div className="relative" ref={colorMenuRef}>
        <button
          onClick={() => setIsColorOpen(!isColorOpen)}
          title="Text Color"
          className={`flex items-center p-1.5 rounded-md transition ${
            isColorOpen 
              ? 'text-zinc-900 bg-zinc-200 dark:text-zinc-100 dark:bg-zinc-800' 
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform ${isColorOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isColorOpen && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 grid grid-cols-4 gap-2 w-40">
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => insertColor(c.value)}
                title={c.name}
                className="w-6 h-6 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: c.value || 'transparent' }}
              >
                {!c.value && <div className="w-4 h-0.5 bg-red-400 rotate-45" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1 flex-shrink-0" />
      
      <Button icon={Link} title="Insert link" onClick={() => onInsert('[', '](url)', 'link text')} />
      <Button icon={Image} title="Insert image" onClick={() => onInsert('![', '](image-url)', 'alt text')} />
      
      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1 flex-shrink-0" />
      
      <Button icon={Code} title="Insert code" onClick={() => onInsert('`', '`', 'code')} />
      <Button icon={Quote} title="Insert blockquote" onClick={() => onInsert('> ', '')} />
      <Button icon={TableIcon} title="Insert Table" onClick={insertTable} />
      
      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1 flex-shrink-0" />
      
      <Button icon={List} title="Bulleted list" onClick={() => onInsert('- ', '')} />
      <Button icon={ListOrdered} title="Numbered list" onClick={() => onInsert('1. ', '')} />
      <Button icon={ListChecks} title="Checklist" onClick={() => onInsert('- [ ] ', '')} />
    </div>
  );
}
