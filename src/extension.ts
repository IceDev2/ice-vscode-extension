
import * as vscode from 'vscode';

const KEYWORDS = [
  'jika','jikalau','kalau','selagi','untuk','dalam','kembalikan',
  'bukan','dan','atau','benar','salah','kosong',
  'tugas','fungsi','bilangan','desimal','teks','boolean',
  'kelas','baru','ini','super','properti','get','set'
];

const BUILTINS = ['tampilkan','rentang','panjang','tipe','int','float','str'];

function scanSymbols(doc: vscode.TextDocument) {
  const text = doc.getText();
  const classes = Array.from(text.matchAll(/\bkelas\s+([A-Za-z_][\w]*)/g)).map(m => m[1]);
  const funcs   = Array.from(text.matchAll(/\btugas\s+([A-Za-z_][\w]*)\s*\(/g)).map(m => m[1]);
  return { classes, funcs };
}

export function activate(context: vscode.ExtensionContext) {
  // Completion items
  const provider = vscode.languages.registerCompletionItemProvider(
    { language: 'ice' },
    {
      provideCompletionItems(doc, pos) {
        const items: vscode.CompletionItem[] = [];

        // keywords
        for (const kw of KEYWORDS) {
          const ci = new vscode.CompletionItem(kw, vscode.CompletionItemKind.Keyword);
          ci.insertText = kw;
          items.push(ci);
        }
        // builtins
        for (const b of BUILTINS) {
          const ci = new vscode.CompletionItem(b, vscode.CompletionItemKind.Function);
          ci.detail = 'bawaan ICE';
          ci.insertText = new vscode.SnippetString(`${b}($0)`);
          items.push(ci);
        }
        // symbols from current file
        const syms = scanSymbols(doc);
        for (const c of syms.classes) {
          const ci = new vscode.CompletionItem(c, vscode.CompletionItemKind.Class);
          items.push(ci);
        }
        for (const f of syms.funcs) {
          const ci = new vscode.CompletionItem(f+"()", vscode.CompletionItemKind.Function);
          ci.insertText = new vscode.SnippetString(`${f}($0)`);
          items.push(ci);
        }
        // common snippets
        const kelasSnip = new vscode.CompletionItem('kelas {…}', vscode.CompletionItemKind.Snippet);
        kelasSnip.insertText = new vscode.SnippetString([
          'kelas ${1:NamaKelas}${2: : ${3:Induk}} {',
          '	$tugas',
          '}'
        ].join('\n'));
        kelasSnip.detail = 'Template kelas';
        items.push(kelasSnip);

        const ifSnip = new vscode.CompletionItem('jika (…) {…}', vscode.CompletionItemKind.Snippet);
        ifSnip.insertText = new vscode.SnippetString([
          'jika (${1:kondisi}) {',
          '	$0',
          '}'
        ].join('\n'));
        items.push(ifSnip);

        return items;
      }
    },
    '.', // trigger on dot
    ':'  // and colon (for pewarisan)
  );

  context.subscriptions.push(provider);
}

export function deactivate() {}
