import { useQuery } from '@tanstack/react-query'
import {ApiResponse, BlogPost, CategoryResponse, DashboardResponse, Page, UserListResponse} from "@/types/api";


const API = "http://localhost:8888/api/v1"
async function fetchDashboard(): Promise<ApiResponse<DashboardResponse>> {
    const res = await fetch(`${API}/blog/admin/dashboard`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch dashboard')
    }

    return res.json()
}

async function getCategories(): Promise<ApiResponse<CategoryResponse[]>> {
    const res = await fetch(`${API}/blog/admin/category`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch dashboard')
    }

    return res.json()
}

async function getUsers(): Promise<ApiResponse<UserListResponse>> {
    const res = await fetch(`${API}/users/tdf`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch users')
    }

    return res.json()
}

export async function deletePost(pid: string): Promise<boolean> {
    const res = await fetch(`${API}/blog/post/${pid}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })
    return res.ok;
}

export async function lockUser(uid: string, isLock: boolean): Promise<boolean> {
    const res = await fetch(`${API}/users/lock/${uid}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
        body: JSON.stringify({lock: !isLock}),
    })
    return res.ok;
}

async function getPost(): Promise<ApiResponse<Page<BlogPost>>> {
    const res = await fetch(`${API}/blog/post`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authState") as string)?.accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch dashboard')
    }

    return res.json()
}


export function useDashboardQuery() {
    return useQuery({
        queryKey: ['adminDashboard'],
        queryFn: fetchDashboard,
        retry: false
    })
}

export function useCategoryQuery() {
    return useQuery({
        queryKey: ['adminCategory'],
        queryFn: getCategories,
        retry: false
    })
}

export function usePostQuery() {
    return useQuery({
        queryKey: ['adminPost'],
        queryFn: getPost,
        retry: false
    })
}

export function useUserQuery() {
    return useQuery({
        queryKey: ['adminUser'],
        queryFn: getUsers,
        retry: false
    })
}