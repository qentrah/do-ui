/** Authored problem givens. Renderers never inspect a question's expected answer. */
export type MathDiagramData =
 | {kind:'bars';rows:{label:string;parts:string[]}[]}
 | {kind:'table';headers:string[];rows:string[][]}
 | {kind:'area';headers:string[];labels:string[];rows:string[][]}
 | {kind:'plot';points:[number,number][]}
 | {kind:'flow';nodes:{label:string;value:string}[]}
 | {kind:'matrices';items:{label:string;cells:string[][]}[]}
 | {kind:'geometry';points:[number,number][];segments:[number,number,number,number][];circles:[number,number,number][];ellipses?:[number,number,number,number][];labels:{x:number;y:number;text:string}[];caption:string}
 | {kind:'chart';bounds:[number,number,number,number];series:[number,number][][];caption:string}
 | {kind:'counters';groups:number[];unit?:string;mutedLast?:boolean}
 | {kind:'fraction-bars';fractions:[number,number][]}
 | {kind:'columns';labels:string[];values:number[];caption:string}
 | {kind:'riemann';heights:number[];width:number;caption:string};
