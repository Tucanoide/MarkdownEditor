import { Bold, Italic, Link, List, ListOrdered, Image, Quote, Code, Heading1, Heading2, Heading3 } from 'lucide-react';

interface ToolbarProps {
  onInsert: (prefix: string, suffix?: string, defaultText?: string) => void;
}

export function Toolbar({ onInsert }: ToolbarProps) {
  const Button = ({ icon: Icon, onClick, title }: { icon: any, onClick: () => void, title: string }) => (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-md hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition"
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="flex items-center space-x-1 p-2 bg-zinc-50 border-b border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800 overflow-x-auto">
      <Button icon={Heading1} title="Heading 1" onClick={() => onInsert('# ', '')} />
      <Button icon={Heading2} title="Heading 2" onClick={() => onInsert('## ', '')} />
      <Button icon={Heading3} title="Heading 3" onClick={() => onInsert('### ', '')} />
      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
      <Button icon={Bold} title="Bold text" onClick={() => onInsert('**', '**', 'bold text')} />
      <Button icon={Italic} title="Italic text" onClick={() => onInsert('_', '_', 'italic text')} />
      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
      <Button icon={Link} title="Insert link" onClick={() => onInsert('[', '](url)', 'link text')} />
      <Button icon={Image} title="Insert image" onClick={() => onInsert('![', '](image-url)', 'alt text')} />
      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
      <Button icon={Code} title="Insert code" onClick={() => onInsert('`', '`', 'code')} />
      <Button icon={Quote} title="Insert blockquote" onClick={() => onInsert('> ', '')} />
      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
      <Button icon={List} title="Bulleted list" onClick={() => onInsert('- ', '')} />
      <Button icon={ListOrdered} title="Numbered list" onClick={() => onInsert('1. ', '')} />
    </div>
  );
}
