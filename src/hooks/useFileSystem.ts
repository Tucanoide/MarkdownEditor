import { useState, useCallback } from 'react';

// Use minimal global definition for file system access types if needed, 
// but using 'any' is simpler for a quick script without creating custom d.ts files.

export function useFileSystem(currentContent: string, onLoad: (content: string) => void) {
  const [fileHandle, setFileHandle] = useState<any>(null);
  const [originalContent, setOriginalContent] = useState<string>(currentContent);

  const isDirty = currentContent !== originalContent;

  const openFile = useCallback(async () => {
    try {
      // @ts-ignore
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Markdown Files',
            accept: {
              'text/markdown': ['.md'],
              'text/plain': ['.txt']
            },
          },
        ],
        multiple: false,
      });
      
      const file = await handle.getFile();
      const text = await file.text();
      
      setFileHandle(handle);
      setOriginalContent(text);
      onLoad(text);
    } catch (error) {
      if ((error as any).name !== 'AbortError') {
        console.error("Error opening file:", error);
        alert('Failed to open file. ' + error);
      }
    }
  }, [onLoad]);

  const saveFile = useCallback(async () => {
    try {
      let handle = fileHandle;
      if (!handle) {
        // @ts-ignore
        handle = await window.showSaveFilePicker({
          suggestedName: 'document.md',
          types: [
            {
              description: 'Markdown Files',
              accept: { 'text/markdown': ['.md'] },
            },
          ],
        });
        setFileHandle(handle);
      }

      const writable = await handle.createWritable();
      await writable.write(currentContent);
      await writable.close();
      
      setOriginalContent(currentContent);
    } catch (error) {
      if ((error as any).name !== 'AbortError') {
        console.error("Error saving file:", error);
        alert('Failed to save file. ' + error);
      }
    }
  }, [fileHandle, currentContent]);

  return { openFile, saveFile, isDirty };
}
