import classNames from 'classnames';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import React, { forwardRef, useEffect } from 'react';

import { useImage, useLatest } from '#lib';

import styles from './ImageWithLoadingPlaceholder.module.scss';
import type { Props as LoadingPlaceholderProps } from './LoadingPlaceholder';
import { LoadingPlaceholder } from './LoadingPlaceholder';

interface Props
    extends Omit<HTMLAttributes<HTMLDivElement>, 'placeholder'>,
        Pick<LoadingPlaceholderProps, 'icon' | 'description' | 'estimatedDuration' | 'progress'>,
        Pick<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
    src: string;
    imageWidth: number;
    imageHeight: number;
    onStartLoading?: () => void;
    onLoad?: () => void;
}

/**
 * When image is rendered again the browser will load it from cache.
 * We don't have to show the loading state as loading from cache is very fast.
 * But still, it takes some time.
 */
const LOADING_CALLBACK_DEBOUNCE = 50;

// Image can be of any size, which can increase loading time.
// 2 seconds seems like a reasonable average.
const ESTIMATED_LOADING_DURATION = 2000;

export const ImageWithLoadingPlaceholder = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {
        // Placeholder
        icon = false,
        description = false,
        estimatedDuration = ESTIMATED_LOADING_DURATION,
        progress: reportedProgress = 'auto',
        // Image
        src,
        alt,
        imageWidth,
        imageHeight,
        onStartLoading,
        onLoad,
        ...attributes
    } = props;
    const aspectRatio = imageHeight ? imageWidth / imageHeight : undefined;
    const callbacks = useLatest({ onStartLoading, onLoad });
    const { loading, progress, url } = useImage(src);

    useEffect(
        function () {
            if (loading) {
                const timeout = setTimeout(
                    () => callbacks.current.onStartLoading?.(),
                    LOADING_CALLBACK_DEBOUNCE,
                );
                return () => clearTimeout(timeout);
            }
            if (url !== undefined) {
                callbacks.current.onLoad?.();
            }
            return;
        },
        [loading, url],
    );

    return (
        <div
            {...attributes}
            className={classNames(styles.ImageWithLoadingPlaceholder, attributes.className)}
            style={{
                aspectRatio: aspectRatio ? String(aspectRatio) : undefined,
                backgroundImage: url ? `url("${url}")` : undefined,
                ...attributes.style,
            }}
            ref={ref}
        >
            {url && <img className={styles.Image} src={url} alt={alt} />}

            {loading && (
                <LoadingPlaceholder
                    className={styles.Placeholder}
                    icon={icon}
                    description={description}
                    progress={reportedProgress === 'auto' ? progress : reportedProgress}
                    estimatedDuration={estimatedDuration}
                    ref={ref}
                    style={{ width: '100%', height: '100%' }}
                />
            )}
        </div>
    );
});

ImageWithLoadingPlaceholder.displayName = 'ImageWithLoadingPlaceholder';