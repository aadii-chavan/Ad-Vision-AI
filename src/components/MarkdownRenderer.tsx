import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <ReactMarkdown
      className={`prose prose-sm prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom styling for different markdown elements
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-sm">{children}</li>,
        h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-white">{children}</h3>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-3 italic text-gray-300 mb-2">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return <code className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">{children}</code>;
          }
          return (
            <pre className="bg-gray-800 p-3 rounded-lg overflow-x-auto mb-2">
              <code className="text-sm font-mono">{children}</code>
            </pre>
          );
        },
        // Handle special symbols and emojis
        text: ({ children }) => {
          if (typeof children === 'string') {
            // Preserve special symbols and emojis
            return <span>{children}</span>;
          }
          return <span>{children}</span>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
