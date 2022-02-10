import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

export interface Props {
    flex?: boolean;
}

export const ButtonGroup: FunctionComponent<Props> = ({ children, flex }) => (
    <div
        className={classNames('editor-menu__button-group', {
            'editor-menu__button-group--flex': flex,
        })}
    >
        {children}
    </div>
);
