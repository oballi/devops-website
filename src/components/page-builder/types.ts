export type BlockAlignment = 'left' | 'center' | 'right' | 'full';

export type BlockType = 
  | 'text'
  | 'heading'
  | 'image'
  | 'card'
  | 'grid'
  | 'customCode'
  | 'divider'
  | 'spacer'
  | 'button'
  | 'quote';

export interface BaseBlock {
  id: string;
  type: BlockType;
  alignment: BlockAlignment;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  color?: string;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface CardBlock extends BaseBlock {
  type: 'card';
  title: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface GridBlock extends BaseBlock {
  type: 'grid';
  columns: number;
  gap: number;
  items: BaseBlock[];
}

export interface CustomCodeBlock extends BaseBlock {
  type: 'customCode';
  code: string;
  language: 'tsx' | 'jsx' | 'html' | 'css';
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
  style: 'solid' | 'dashed' | 'dotted';
  color?: string;
}

export interface SpacerBlock extends BaseBlock {
  type: 'spacer';
  height: number;
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  text: string;
  url?: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  content: string;
  author?: string;
}

export type PageBlock = 
  | TextBlock 
  | HeadingBlock 
  | ImageBlock 
  | CardBlock 
  | GridBlock 
  | CustomCodeBlock 
  | DividerBlock 
  | SpacerBlock 
  | ButtonBlock 
  | QuoteBlock;

export interface PageData {
  id: string;
  title: string;
  slug: string;
  blocks: PageBlock[];
  isPublished: boolean;
  showInMenu: boolean;
  createdAt: string;
  updatedAt: string;
} 