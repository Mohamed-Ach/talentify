import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'

export const load: PageServerLoad = (async ({ fetch, cookies, locals }) => {
    const token = cookies.get('session') || ''
    const id = locals?.user?.id || ''

    const getEmployerCompany = async (token: string, id: string) => {
        const response = await fetch(`${API_URL}/admin/employer/company/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const results = await response.json()
        if (response.ok)
            return results
        else return {}
    }

    return {
        company: await getEmployerCompany(token, id)
    }
})