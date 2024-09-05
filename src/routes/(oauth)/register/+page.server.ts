// import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'
import { fail } from '@sveltejs/kit'

// export const load: PageServerLoad = async ({ locals }) => {
//     const session = await locals.auth.validate()
//     if (session) {
//         throw redirect(302, '/posts/browse')
//     }
// }

interface RegisterData {
	firstName: string
	lastName: string
	email: string
	password: string
	passwordConfirmation: string
}

function getFirstErrorMessage(errors: { [key: string]: string[] }): string {
	const firstKey = Object.keys(errors)[0]
	if (firstKey && errors[firstKey]?.length > 0) {
		return errors[firstKey][0]
	}
	return ''
}

async function register(registerData: RegisterData) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')

	const data = JSON.stringify({
		first_name: registerData.firstName,
		last_name: registerData.lastName,
		email: registerData.email,
		password: registerData.password,
		password_confirmation: registerData.passwordConfirmation
	})

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: data
	}

	const response = await fetch(API_URL + '/auth/register', requestOptions)
	const result = await response.json()

	if (response.status >= 399 && response.status < 500) return getFirstErrorMessage(result.errors)
	else if (response.status >= 500) return 'An Error has occurred, Please try again!'
	else return ''
}

export const actions = {
	default: async ({ request }) => {
		const results = Object.fromEntries(await request.formData())

		const registerData: RegisterData = {
			firstName: results.firstName.toString(),
			lastName: results.lastName.toString(),
			email: results.email.toString(),
			password: results.password.toString(),
			passwordConfirmation: results.passwordConfirmation.toString()
		}

		try {
			const registerRes = await register(registerData)
			if (registerRes) return fail(400, { error: registerRes })

		} catch (err) {
			console.log(err)
			return fail(500, {
				error: 'An Error has occurred, Please try again!'
			})
		}

		return {
			success:
				'Your Account has been created successfully! Please check your email for verification link.'
		}
	}
}
