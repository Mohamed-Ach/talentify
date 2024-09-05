import { API_URL } from '$lib/stores';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch, params, cookies }) => {

    const token = cookies.get('session') || ''
    const id = params.id
    const showCompany = async (token: string, id: string) => {
        const response = await fetch(API_URL + `/admin/company/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return await response.json()
    }
    return {
        company: await showCompany(token, id),
    }
})