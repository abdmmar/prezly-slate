/*
 * This is an ES adapter for react-use CommonJS build.
 *
 * The problem with the react-use ESM build is that it's only working
 * with a permissive interop import logic (typescript / babel),
 * but fails when a named import done from within a node native ES module environment.
 *
 * This adapter re-exports individual hooks as ES-friendly named exports.
 */
import _useAsyncFn from 'react-use/lib/useAsyncFn.js';
import _useDebounce from 'react-use/lib/useDebounce.js';
import _useEffectOnce from 'react-use/lib/useEffectOnce.js';
import _useLatest from 'react-use/lib/useLatest.js';
import _useMount from 'react-use/lib/useMount.js';
import _useMountedState from 'react-use/lib/useMountedState.js';
import _usePrevious from 'react-use/lib/usePrevious.js';
import _useRafLoop from 'react-use/lib/useRafLoop.js';
import _useSize from 'react-use/lib/useSize.js';
import _useUnmount from 'react-use/lib/useUnmount.js';
import _useUpdate from 'react-use/lib/useUpdate.js';

function unwrap<T>(module: T | { __esModule: boolean; default: T }): T {
    if (typeof module === 'object' && '__esModule' in module && 'default' in module) {
        return module.default;
    }
    return module;
}

const useAsyncFn = unwrap(_useAsyncFn);
const useDebounce = unwrap(_useDebounce);
const useEffectOnce = unwrap(_useEffectOnce);
const useLatest = unwrap(_useLatest);
const useMount = unwrap(_useMount);
const useMountedState = unwrap(_useMountedState);
const usePrevious = unwrap(_usePrevious);
const useRafLoop = unwrap(_useRafLoop);
const useSize = unwrap(_useSize);
const useUnmount = unwrap(_useUnmount);
const useUpdate = unwrap(_useUpdate);

export {
    useAsyncFn,
    useDebounce,
    useEffectOnce,
    useLatest,
    useMount,
    useMountedState,
    usePrevious,
    useRafLoop,
    useSize,
    useUnmount,
    useUpdate,
};
