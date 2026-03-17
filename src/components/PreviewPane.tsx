import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { remarkAlert } from 'remark-github-blockquote-alert';
import 'remark-github-blockquote-alert/alert.css';

interface PreviewPaneProps {
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
}

export function PreviewPane({ markdown, setMarkdown }: PreviewPaneProps) {
  const handleCheckboxChange = (index: number) => {
    const lines = markdown.split('\n');
    let currentCheckboxIndex = 0;
    
    const newMarkdown = lines.map((line) => {
      // Basic GFM task list regex: start of line, optional whitespace, list marker, task marker
      const taskListRegex = /^(\s*[-*+]\s+\[([ xX])\])/;
      const match = line.match(taskListRegex);
      
      if (match) {
        if (currentCheckboxIndex === index) {
          const currentState = match[2].toLowerCase() === 'x';
          const newState = currentState ? ' ' : 'x';
          currentCheckboxIndex++;
          return line.replace(/\[([ xX])\]/, `[${newState}]`);
        }
        currentCheckboxIndex++;
      }
      return line;
    }).join('\n');
    
    setMarkdown(newMarkdown);
  };

  return (
    <div className="flex-1 w-full p-6 md:p-8 overflow-y-auto">
      <div className="mx-auto max-w-3xl prose prose-zinc dark:prose-invert prose-fumadocs prose-pre:bg-zinc-900">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkAlert]} 
          rehypePlugins={[rehypeRaw]}
          components={{
            input: ({ node, ...props }) => {
              if (props.type === 'checkbox') {
                // Find the index of this checkbox among all checkboxes in the rendered output
                // react-markdown doesn't give us the index easily, so this is a simplified approach
                // that works for most case: we wrap them in a way that we can track, 
                // but since this is a functional component, we can use a counter in the render pass?
                // No, that's not stable. 
                // THE BEST WAY: Just remove 'disabled' and let the user click it.
                // But we want it to sync back.
                return (
                  <input
                    {...props}
                    disabled={false}
                    onChange={(e) => {
                      // Heuristic: identify which checkbox it is.
                      // This is a bit advanced, but for now let's just make it not disabled
                      // so the user can at least "click" it visually.
                      // To truly sync, we'd need to identify the list item.
                    }}
                    onClick={(e) => {
                      // Stop propagation to avoid other side effects
                      e.stopPropagation();
                      // Find which index it is by counting previous siblings' checkboxes?
                      // Actually, let's keep it simple: finding it in the DOM.
                      const allCheckboxes = document.querySelectorAll('.prose-fumadocs input[type="checkbox"]');
                      const index = Array.from(allCheckboxes).indexOf(e.currentTarget as HTMLInputElement);
                      if (index !== -1) {
                        handleCheckboxChange(index);
                      }
                    }}
                  />
                );
              }
              return <input {...props} />;
            }
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
