import { API_URL } from '$lib/stores'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = (async ({ fetch, cookies }) => {
    const token = cookies.get('session') || ''

    const getStats = async (token: string) => {
        const response = await fetch(API_URL + '/admin/dashboard', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.json()
    }

    return {
        stats: getStats(token)
    }
})