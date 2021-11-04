import ElementNode, { isElementNode } from './ElementNode';

export const QUOTE_NODE_TYPE = 'block-quote';

export default interface QuoteNode extends ElementNode {
    type: typeof QUOTE_NODE_TYPE;
}

export const isQuoteNode = (value: any): value is QuoteNode =>
    isElementNode<QuoteNode>(value, QUOTE_NODE_TYPE);
