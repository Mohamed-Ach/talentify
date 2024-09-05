import { API_URL } from '$lib/stores';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch, cookies }) => {

    const token = cookies.get('session') || ''
    const fetchCompanies = async (token: string) => {
        const response = await fetch(API_URL + '/admin/company/all?page=1', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return await response.json()
    }
    return {
        companies: await fetchCompanies(token),
        token
    }
})