import { DIVIDER_NODE_TYPE, QUOTE_NODE_TYPE } from '@prezly/slate-types';

import type { AutoformatRule } from '../editor-v4-autoformat/types';
import { ElementType } from '../editor-v4-rich-formatting';
import { toggleBlock } from '../editor-v4-rich-formatting/lib';
import { MarkType } from '../editor-v4-rich-formatting/types';

export const compositeCharactersRules: AutoformatRule[] = [
    {
        mode: 'text',
        match: ['(tm)', '(TM)'],
        format: '™',
    },
];

export const textStyleRules: AutoformatRule[] = [
    {
        mode: 'mark',
        type: MarkType.BOLD,
        match: '**',
    },
    {
        mode: 'block',
        type: DIVIDER_NODE_TYPE,
        match: '---',
    },
];

export const blockRules: AutoformatRule[] = [
    {
        mode: 'block',
        type: ElementType.NUMBERED_LIST,
        match: '1.',
        format: (editor) => {
            return toggleBlock(editor, ElementType.NUMBERED_LIST);
        },
    },
    {
        mode: 'block',
        type: ElementType.BULLETED_LIST,
        match: ['-', '*'],
        format: (editor) => {
            return toggleBlock(editor, ElementType.BULLETED_LIST);
        },
    },
    {
        mode: 'block',
        type: ElementType.HEADING_ONE,
        match: '#',
        format: (editor) => {
            return toggleBlock(editor, ElementType.HEADING_ONE);
        },
    },
    {
        mode: 'block',
        type: ElementType.HEADING_TWO,
        match: '##',
        format: (editor) => {
            return toggleBlock(editor, ElementType.HEADING_TWO);
        },
    },
    {
        mode: 'block',
        type: QUOTE_NODE_TYPE,
        match: '>',
        format: (editor) => {
            return toggleBlock(editor, QUOTE_NODE_TYPE);
        },
    },
];
