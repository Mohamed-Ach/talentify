import type { Actions, PageServerLoad } from './$types';
import { API_URL } from '$lib/stores';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = (async ({ fetch, cookies, params }) => {
    const token = cookies.get('session') || ''
    const companyID = params.id

    const fetchCompany = async (id: string, token: string) => {
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
        company: await fetchCompany(companyID, token)
    }
})

type Company = {
    logo: string
    name: string
    title: string
    description: string
    location: string
    size: number
    founded: number
    website: string
    facebook: string
    twitter: string
    linkedin: string
    telephone: string
}


const createCompany = async (token: string, company: Company, id: string) => {

    const response = await fetch(API_URL + `/admin/companies/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(company)
    })

    return {
        results: await response.json(),
        status: response.status
    }

}


export const actions: Actions = {
    default: async ({ request, params, cookies }) => {
        const results = Object.fromEntries(await request.formData())
        const token = cookies.get('session') || ''

        const company: Company = {
            logo: results.avatar.toString(),
            name: results.companyName.toString(),
            title: results.companyTitle.toString(),
            description: results.companyBio.toString(),
            location: results.companyAddress.toString(),
            size: parseInt(results.companySize.toString()),
            founded: parseInt(results.companyFoundation.toString()),
            website: results.companyWebsite.toString(),
            facebook: results.companyFacebook.toString(),
            twitter: results.companyTwitter.toString(),
            linkedin: results.companyLinkedIn.toString(),
            telephone: results.companyPhone.toString()
        }

        try {
            const updateRes = await createCompany(token, company, params.id)
            console.log(JSON.stringify(updateRes))
            if (updateRes.status === 200) {
                // pass
            }
            else return fail(400, { error: 'An Error has occurred, Please try again!' })
        } catch (error) {
            console.error(error)
            return fail(500, { error: 'Something went wrong. Please try again later.' })
        }
        throw redirect(302, "/admin/view/companies")

    }
}