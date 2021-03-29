import SyntaxHighlighter from 'react-syntax-highlighter';

function creatCodeComponent(language) {

  return function CodeComponent({ children }) {
    return (
      <SyntaxHighlighter language={language} showLineNumbers>
        {children}
      </SyntaxHighlighter>
    );
  };
}

export const Java = creatCodeComponent('java');
export const Json = creatCodeComponent('json');
export const Properties = creatCodeComponent('properties');
export const Shell = creatCodeComponent('shell');
export const Yaml = creatCodeComponent('yaml');
export const Nginx = creatCodeComponent('nginx');
