import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

interface MarkdownViewerProps {
    content: string
}

export default function MarkdownViewer({content}: MarkdownViewerProps) {

    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, children }: any) => <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
                    h2: ({ node, children }: any) => (
                        <h2 className="text-3xl font-bold mt-7 mb-3 text-foreground border-b border-border pb-2">{children}</h2>
                    ),
                    h3: ({ node, children }: any) => (
                        <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>
                    ),
                    h4: ({ node, children }: any) => (
                        <h4 className="text-xl font-semibold mt-5 mb-2 text-foreground">{children}</h4>
                    ),
                    h5: ({ node, children }: any) => (
                        <h5 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h5>
                    ),
                    h6: ({ node, children }: any) => (
                        <h6 className="text-base font-semibold mt-3 mb-2 text-foreground">{children}</h6>
                    ),
                    p: ({ node, children }: any) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
                    // code: CodeBlock,
                    code({ node, className, children, ...props }) {
                        return (
                            <code
                                className={className}
                                style={{
                                    display: 'block',
                                    padding: '16px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    lineHeight: '1.5',
                                    overflow: 'auto'
                                }}
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    pre({ children }) {
                        return (
                            <pre
                                style={{
                                    margin: '16px 0',
                                    padding: 0,
                                    overflow: 'auto',
                                    borderRadius: '6px'
                                }}
                            >
                              {children}
                            </pre>
                        );
                    },
                    a: ({ node, href, children }: any) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-semibold"
                        >
                            {children}
                        </a>
                    ),
                    ul: ({ node, children }: any) => (
                        <ul className="list-disc list-inside mb-4 text-foreground space-y-2 ml-2">{children}</ul>
                    ),
                    ol: ({ node, children }: any) => (
                        <ol className="list-decimal list-inside mb-4 text-foreground space-y-2 ml-2">{children}</ol>
                    ),
                    li: ({ node, children }: any) => <li className="text-foreground">{children}</li>,
                    blockquote: ({ node, children }: any) => (
                        <blockquote className="border-l-4 border-primary bg-muted/50 pl-4 py-2 mb-4 italic text-muted-foreground">
                            {children}
                        </blockquote>
                    ),
                    hr: () => <hr className="my-6 border-border" />,
                    table: ({ node, children }: any) => (
                        <div className="overflow-x-auto mb-4">
                            <table className="w-full border-collapse border border-border">{children}</table>
                        </div>
                    ),
                    thead: ({ node, children }: any) => <thead className="bg-muted">{children}</thead>,
                    th: ({ node, children }: any) => (
                        <th className="border border-border px-4 py-2 text-left font-semibold">{children}</th>
                    ),
                    td: ({ node, children }: any) => <td className="border border-border px-4 py-2">{children}</td>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
