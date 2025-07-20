import ReactMarkdown, { Components } from "react-markdown";
import reyhypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
}

const Markdown = ({ content }: MarkdownProps) => {
  const components: Components = {
    h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
    p: ({ children }) => <p className="text-base font-light">{children}</p>,
  };

  return (
    <ReactMarkdown rehypePlugins={[reyhypeRaw]} components={components}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
