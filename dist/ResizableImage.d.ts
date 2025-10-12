import React from 'react';
import { ImageElement } from './types';
interface ResizableImageProps {
    element: ImageElement;
    attributes: any;
    children: any;
}
declare const ResizableImage: React.FC<ResizableImageProps>;
export default ResizableImage;
