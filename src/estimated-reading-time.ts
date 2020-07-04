import { wordCountHtml } from './word-count.js';
import { Options } from './options.js';
import { TextFormat } from './text-format.js';
import { wordCountPlainText } from './word-count.js';
import { Result } from './result.js';

const WORDS_MINUTE = 250;
const WORDS_MINUTE_TECHNICAL = 150;

export function estimatedReadingTime( text: string, textFormat: TextFormat, options?: Options ): Result{
    switch( textFormat ){
        case TextFormat.HTML:
            return estimatedReadingTimeHtml( text, options );
        case TextFormat.PLAIN_TEXT:
        default:
            return estimatedReadingTimePlainText( text, options );
    }
}

function estimatedReadingTimePlainText( text: string, options?: Options ): Result{
    const numWords = wordCountPlainText( text );
    return calcEstimatedReadingTimeFromWords( numWords, options );
}

function estimatedReadingTimeHtml( html: string, options?: Options ): Result{
    const numWords = wordCountHtml( html );
    return calcEstimatedReadingTimeFromWords( numWords, options );
}

function calcEstimatedReadingTimeFromWords( numWords: number, options?: Options ): Result{
    const wordsPerMinute = options && options.isTechnical ? WORDS_MINUTE_TECHNICAL : WORDS_MINUTE; 
    const readingTime = numWords / (options && options.wordsPerMinute ? options.wordsPerMinute : wordsPerMinute);
    const minutes = readingTime | 0; // truncate decimal part of the number
    const seconds = Math.ceil( Number.parseFloat( ( (readingTime - minutes)*60 ).toFixed(2) ) );
    let roundedMinutes = seconds >= 30 ? minutes+1 : minutes;
    const res: Result = { numWords, minutes, seconds, roundedMinutes };
    return res;
}