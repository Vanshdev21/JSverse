import React, { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

/**
 * Enhanced Monaco editor wrapper with active line execution highlighting and styling.
 */
const CodeEditor = ({ code, onChange, theme, activeLine }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);

  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current && activeLine) {
      const editor = editorRef.current;
      const monaco = monacoRef.current;

      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
        {
          range: new monaco.Range(activeLine, 1, activeLine, 1),
          options: {
            isWholeLine: true,
            className: 'active-executing-line-bg',
          },
        },
      ]);
      editor.revealLineInCenterIfOutsideViewport(activeLine);
    } else if (editorRef.current) {
      const editor = editorRef.current;
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
    }
  }, [activeLine]);

  return (
    <MonacoEditor
      height="calc(100vh - 200px)"
      defaultLanguage="javascript"
      theme={editorTheme}
      value={code}
      onChange={(value) => onChange(value || '')}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        lineNumbers: 'on',
        cursorSmoothCaretAnimation: 'on',
        cursorBlinking: 'smooth',
        fontFamily: "'Fira Code', 'Courier New', monospace",
        fontSize: 14,
        lineHeight: 22,
        scrollBeyondLastLine: false,
        renderLineHighlight: 'all',
        glyphMargin: false,
        folding: false,
        cursorStyle: 'line',
        automaticLayout: true,
      }}
    />
  );
};

export default React.memo(CodeEditor);
