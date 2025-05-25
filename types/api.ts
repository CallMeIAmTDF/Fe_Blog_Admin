import {number} from "zod";

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface DashboardResponse {
    bar_chart: {month: number; year: number; count: number}[];
    pie_chart: {sensitive_post: number; total_post: number};
    table: {cname: string; post_count: number}[];
}

export interface CategoryResponse {
    id: number;
    cname: string;
    cdesc: string;
    postCount: string;
}

interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Page<T> {
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
    content?: T[]; // Thêm nếu bạn có dữ liệu list trong page
}


export interface UserResponse {
    id: string;
    email: string;
    name: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    dob: string;
    avatar: string | null;
}

export interface BlogPost {
    id: string;
    title: string;
    cover: string | null;
    excerpt: string;
    userResponse: UserResponse;
    viewsCount: number;
    commentsCount: number;
    hasSensitiveContent: boolean;
    category: any[];
    createdAt: string;
    content: string;
}


export interface Meta {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
}

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface User {
    id: string;
    email: string;
    name: string;
    gender: Gender;
    dob: string;
    avatar: string | null;
    no_password: boolean;
    is_locked: boolean;
}

export interface UserListResponse {
    meta: Meta;
    result: User[];
}