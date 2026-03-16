export interface TextContent {
    type: 'TEXT';
    data: string;
}

export interface LinkContent {
    type: 'LINK';
    data: { url: string; text: string };
}

export interface ImageLinkContent {
    type: 'IMAGE_LINK';
    data: { url: string; src: string };
}

export interface ImageContent {
    type: 'IMAGE';
    data: { src: string };
}

export interface KakaoOpenChatContent {
    type: 'KAKAO_OPEN_CHAT';
    data: { url: string; text: string };
}

// Union type for all possible content
export type ArticleContent =
    | TextContent
    | LinkContent
    | ImageLinkContent
    | ImageContent
    | KakaoOpenChatContent;

export interface JobConfig {
    description: string;
    user: string;
    pwd: string;
    writer?: string; // Optional property
    debug_board: string;
    board: string;
    title: string;
    cron: string | string[];
    checkDuplicate: boolean;
    startNow: boolean;
    debug: boolean;
    contents: ArticleContent[];
    disabled?:boolean;
}

export interface ConfigMap {
    [key: string]: JobConfig;
}