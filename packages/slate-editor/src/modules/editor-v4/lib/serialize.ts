import jsonStableStringify from 'json-stable-stringify';
import type { Descendant } from 'slate';

import { withoutImageCandidates } from '#extensions/editor-v4-image';
import { withoutLoaders } from '#extensions/editor-v4-loader';

import type { Value } from '../types';

export type Transform = <T extends Descendant>(nodes: T[]) => T[];

const transforms: Transform[] = [withoutImageCandidates, withoutLoaders];

export function serialize(value: Value): string {
    const children = transforms.reduce((result, transform) => transform(result), value);

    return jsonStableStringify({ type: 'document', children });
}
