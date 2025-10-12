import React from 'react';
import { ToolbarItem } from './types';
interface ToolbarProps {
    items: ToolbarItem[];
    className?: string;
    onViewOutput?: (type: 'html' | 'json' | 'preview') => void;
    onEditLink?: (linkData: {
        url: string;
        title?: string;
        target?: '_blank' | '_self';
        text: string;
    }) => void;
    searchQuery?: string;
    searchMatches?: Array<{
        path: any;
        offset: number;
        text: string;
    }>;
    currentMatchIndex?: number;
    onSearchQueryChange?: (query: string) => void;
    onSearchMatchesChange?: (matches: Array<{
        path: any;
        offset: number;
        text: string;
    }>) => void;
    onCurrentMatchIndexChange?: (index: number) => void;
    isFullscreen?: boolean;
    onFullscreenToggle?: () => void;
}
declare const Toolbar: React.FC<ToolbarProps>;
export default Toolbar;
