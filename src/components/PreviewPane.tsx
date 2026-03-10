import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { remarkAlert } from 'remark-github-blockquote-alert';
import 'remark-github-blockquote-alert/alert.css';

interface PreviewPaneProps {
  markdown: string;
}

export function PreviewPane({ markdown }: PreviewPaneProps) {
  return (
    <div className="flex-1 w-full p-6 md:p-8 overflow-y-auto">
      <div className="mx-auto max-w-3xl prose prose-zinc dark:prose-invert prose-fumadocs prose-pre:bg-zinc-900">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkAlert]} 
          rehypePlugins={[rehypeRaw]}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
