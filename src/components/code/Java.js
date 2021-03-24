import SyntaxHighlighter from 'react-syntax-highlighter';

export function Java({ children }) {
  return (
    <SyntaxHighlighter language={'java'} showLineNumbers>
      {children}
    </SyntaxHighlighter>
  );
}
