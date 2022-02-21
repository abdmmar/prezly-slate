import type { LinkNode } from '@prezly/slate-types';
import { LINK_NODE_TYPE } from '@prezly/slate-types';

export function createLink(props: Pick<LinkNode, 'href' | 'children'>): LinkNode {
    const { href, children } = props;
    return {
        type: LINK_NODE_TYPE,
        href,
        children,
    };
}
