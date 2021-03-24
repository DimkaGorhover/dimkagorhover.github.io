import SyntaxHighlighter from 'react-syntax-highlighter';

export function Yaml({ children }) {
  return (
    <SyntaxHighlighter language={'yaml'} showLineNumbers>
      {children}
    </SyntaxHighlighter>
  );
}
