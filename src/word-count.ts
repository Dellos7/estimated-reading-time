import * as nodeHtmlParser from 'node-html-parser';
// No funciona bien al utilizar el módulo ESM desde un fichero "index.msj" y hay que hacer esto
export const parse = nodeHtmlParser.parse || (nodeHtmlParser.default as any).parse;

export function wordCountHtml( html: string ){
    const root = parse( html, { pre: true } );
    const _wordCountHtml = ( node: any ): number => {
        let numWords = 0;
        if( node.nodeType != 8 ){ // Comment node
            if( node.tagName == 'pre' ){
                numWords += _wordCountHtml( parse(node.rawText) );
            }
            else if( node.childNodes && node.childNodes.length > 0 ){
                for( const child of node.childNodes ){
                   numWords += _wordCountHtml( child );
                }
            }
            else if( !node.isWhitespace ) {
                numWords += countWordsInText( node.rawText );
            }
        }
        return numWords;
    };
    const numWords = _wordCountHtml( root );
    return numWords;
}

export function wordCountPlainText( text: string ){
    return countWordsInText( text );
}

function countWordsInText( text: string ): number{
    let wordsArr = text.split(/\s+/);
    wordsArr = wordsArr.filter( (word: any) => !!word );
    return wordsArr.length;
}