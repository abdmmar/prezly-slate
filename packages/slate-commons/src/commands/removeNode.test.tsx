/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';
import { SOME_ELEMENT_1, SOME_ELEMENT_2 } from '../test-utils';

import isElementWithType from './isElementWithType';
import removeNode from './removeNode';

describe('removeNode', () => {
    it('Removes the element at current cursor location', () => {
        const editor = ((
            <editor>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-some-element-1>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        if (editor.selection) {
            removeNode(editor, {
                at: editor.selection,
                match: (node) => isElementWithType(node),
            });
        }

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Removes the matching element at current cursor location', () => {
        const editor = ((
            <editor>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-some-element-1>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        removeNode(editor, {
            match: (node) => isElementWithType(node) && node.type === SOME_ELEMENT_1,
        });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Does nothing when the element does not match', () => {
        const editor = ((
            <editor>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-some-element-1>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-some-element-1>
            </editor>
        ) as unknown) as Editor;

        removeNode(editor, {
            match: (node) => isElementWithType(node) && node.type === SOME_ELEMENT_2,
        });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
