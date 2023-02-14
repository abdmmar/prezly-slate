import { isElementNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { Editor } from 'slate';
import validator from 'validator';

import { normalizeHref } from '#lib';

import { unwrapLink, wrapInLink } from './lib';

export function withLinkPasting<T extends Editor>(editor: T): T {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const href = data.getData('text');

        if (validator.isURL(href)) {
            const nodes = Array.from(
                Editor.nodes(editor, { match: (node) => isElementNode(node), mode: 'highest' }),
            );

            const isOnlyParagraphNodes = nodes.every(([node]) =>
                isElementNode(node, PARAGRAPH_NODE_TYPE),
            );
            if (isOnlyParagraphNodes) {
                // Unwrap any links in the current selection, otherwise multiple links
                // would overlap
                unwrapLink(editor);
                wrapInLink(editor, { href: normalizeHref(href), new_tab: true });
                return;
            }
        }

        insertData(data);
    };

    return editor;
}