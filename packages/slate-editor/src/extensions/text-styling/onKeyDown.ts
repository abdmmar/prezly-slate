import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

import { MarkType } from './types';

const MARK_HOTKEYS = [
    { hotkey: isHotkey('mod+b'), mark: MarkType.BOLD },
    { hotkey: isHotkey('mod+i'), mark: MarkType.ITALIC },
    { hotkey: isHotkey('mod+u'), mark: MarkType.UNDERLINED },
];

export function onKeyDown(event: KeyboardEvent, editor: Editor) {
    return MARK_HOTKEYS.forEach(({ hotkey, mark }) => {
        if (hotkey(event.nativeEvent)) {
            event.preventDefault();
            EditorCommands.toggleMark(editor, mark);
        }
    });
}
