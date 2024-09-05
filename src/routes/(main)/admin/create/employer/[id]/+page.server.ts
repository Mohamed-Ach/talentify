import type { Actions } from './$types'
import { API_URL } from '$lib/stores'
import { fail } from '@sveltejs/kit'

type Employer = {
    first_name: string
    last_name: string
    email: string
    password: string
    company_id: string
}

function getFirstErrorMessage(errors: { [key: string]: string[] }): string {
    const firstKey = Object.keys(errors)[0]
    if (firstKey && errors[firstKey]?.length > 0) {
        return errors[firstKey][0]
    }
    return ''
}


const createEmployers = async (token: string, employer: Employer) => {

    const response = await fetch(API_URL + '/admin/employers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employer)
    })
    const results = await response.json()
    return {
        results,
        status: response.status
    }

}


export const actions: Actions = {
    default: async ({ request, params, cookies }) => {
        const results = Object.fromEntries(await request.formData())
        const token = cookies.get('session') || ''

        const companyID = params.id

        const company: Employer = {
            first_name: results.firstName.toString(),
            last_name: results.lastName.toString(),
            email: results.email.toString(),
            password: results.password.toString(),
            company_id: companyID
        }

        try {
            const createRes = await createEmployers(token, company)

            if (createRes.status === 201) return { success: "Employer created successfully" }
            else if (createRes.status === 400) return fail(400, { error: "An error has occurred please try again" })
            else if (createRes.status === 422) return fail(422, { error: getFirstErrorMessage(createRes.results.errors) })
            else return fail(500, { error: "An error has occurred please try again" })

        } catch (error) {
            console.error(error)
            return fail(500, { error: 'Something went wrong. Please try again later.' })
        }
    }
}