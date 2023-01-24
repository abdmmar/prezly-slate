import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { CONTACT_NODE_TYPE, isContactNode } from '@prezly/slate-types';
import { isEqual } from 'lodash-es';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import {
    normalizeContactInfoAttributes,
    normalizeContactNodeAttributes,
    parseSerializedElement,
} from '../press-contacts';

import { InlineContactElement } from './components';

export const EXTENSION_ID = 'InlineContactExtension';

export function InlineContactsExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [CONTACT_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isElementEqual(element, another) {
            if (isContactNode(element) && isContactNode(another)) {
                // Compare ContactNodes ignoring `uuid`
                return (
                    isEqual(element.contact, another.contact) &&
                    element.reference === another.reference
                );
            }
            return undefined;
        },
        isRichBlock: isContactNode,
        isVoid: isContactNode,
        normalizeNode: [normalizeContactNodeAttributes, normalizeContactInfoAttributes],
        renderElement: ({ attributes, children, element }) => {
            if (isContactNode(element)) {
                return (
                    <InlineContactElement attributes={attributes} element={element}>
                        {children}
                    </InlineContactElement>
                );
            }

            return undefined;
        },
    };
}