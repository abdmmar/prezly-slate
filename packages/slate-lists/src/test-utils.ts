/* eslint-disable no-param-reassign */

import { Element } from 'slate';
import {
    BULLETED_LIST_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    LINK_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
} from '@prezly/slate-types';
import { Editor } from 'slate';

import Lists from './Lists';
import { ListsOptions } from './types';
import withLists from './withLists';

export const INLINE_ELEMENT = LINK_NODE_TYPE;

export const UNWRAPPABLE_ELEMENT = DIVIDER_NODE_TYPE;

export const options: ListsOptions = {
    defaultBlockType: PARAGRAPH_NODE_TYPE,
    listItemTextType: LIST_ITEM_TEXT_NODE_TYPE,
    listItemType: LIST_ITEM_NODE_TYPE,
    listTypes: [BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE],
    wrappableTypes: [PARAGRAPH_NODE_TYPE],
};

export const lists = Lists(options);

const withInlineElement = <T extends Editor>(editor: T): T => {
    const { isInline } = editor;

    editor.isInline = (element) => {
        if (Element.isElementType(element, INLINE_ELEMENT)) {
            return true;
        }
        return isInline(element);
    };

    return editor;
};

export const createListsEditor = (input: JSX.Element) =>
    withInlineElement(withLists(options)(input as unknown as Editor));
