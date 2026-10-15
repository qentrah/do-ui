/** Lightweight display lexer. It preserves source exactly; it is not a parser. */
export type CodeLanguage = 'tsx' | 'ts' | 'jsx' | 'javascript' | 'css' | 'shell';
type TokenKind = 'plain' | 'comment' | 'string' | 'keyword' | 'number' | 'function' | 'type' | 'punctuation';
export type CodeToken = { text: string; kind: TokenKind };
const keywords = new Set('import export from default const let var function return if else true false null undefined type interface declare extends typeof keyof as async await new class public private readonly void number string boolean unknown never any in of throw try catch finally switch case break'.split(' '));
const pattern = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[^\w\s]|\s+/g;
export function tokenizeCode(code: string, language: CodeLanguage): CodeToken[][] {
  const lines: CodeToken[][] = [[]];
  for (const match of code.matchAll(pattern)) {
    const text = match[0];
    const after = code.slice((match.index ?? 0) + text.length);
    const kind: TokenKind = text.startsWith('//') || text.startsWith('/*') ? 'comment'
      : /^["'`]/.test(text) ? 'string'
      : /^\d/.test(text) ? 'number'
      : keywords.has(text) ? 'keyword'
      : /^[A-Z]/.test(text) ? 'type'
      : /^\w/.test(text) && /^\s*\(/.test(after) ? 'function'
      : /^[^\w\s]$/.test(text) ? 'punctuation' : 'plain';
    text.split('\n').forEach((part, index) => {
      if (index) lines.push([]);
      if (part) lines[lines.length - 1].push({text: part, kind: language === 'shell' && kind === 'keyword' ? 'plain' : kind});
    });
  }
  return lines;
}
export const tokenClasses: Record<TokenKind,string> = {
  plain:'text-[#d4d4d4]', comment:'text-[#6a9955]', string:'text-[#ce9178]',
  keyword:'text-[#569cd6]', number:'text-[#b5cea8]', function:'text-[#dcdcaa]',
  type:'text-[#4ec9b0]', punctuation:'text-[#c586c0]',
};
