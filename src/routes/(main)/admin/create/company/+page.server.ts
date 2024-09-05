import type { Actions } from './$types'
import { API_URL } from '$lib/stores'
import { fail, redirect } from '@sveltejs/kit'

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


const createCompany = async (token: string, company: Company) => {

    const response = await fetch(API_URL + '/admin/companies', {
        method: 'POST',
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
    default: async ({ request, cookies }) => {
        const results = Object.fromEntries(await request.formData())
        const token = cookies.get('session') || ''

        console.log(results)

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
            const createRes = await createCompany(token, company)
            console.log(JSON.stringify(createRes))
            if (createRes.status === 201) {
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