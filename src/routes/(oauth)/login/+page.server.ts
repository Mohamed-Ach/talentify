import { fail, redirect } from '@sveltejs/kit'
import { API_URL } from '$lib/stores'

interface LoginData {
	email: string
	password: string
}

function getFirstErrorMessage(errors: { [key: string]: string[] }): string {
	const firstKey = Object.keys(errors)[0]
	if (firstKey && errors[firstKey]?.length > 0) {
		return errors[firstKey][0]
	}
	return ''
}

async function login(loginData: LoginData) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')

	const data = JSON.stringify({
		email: loginData.email,
		password: loginData.password
	})

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: data
	}

	const response = await fetch(API_URL + '/auth/login', requestOptions)
	const result = await response.json()

	return {
		status: response.status,
		data: result
	}
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		const results = Object.fromEntries(await request.formData())
		const loginData: LoginData = {
			email: results.email.toString(),
			password: results.password.toString()
		}

		const redirectUrl = url.searchParams.get('redirect') || ''

		try {
			const loginRes = await login(loginData)
			if (loginRes.status === 401) return fail(400, { error: loginRes.data.error })
			else if (loginRes.status >= 399 && loginRes.status < 500)
				return fail(400, { error: getFirstErrorMessage(loginRes.data.errors) })
			else if (loginRes.status >= 500)
				return fail(400, { error: 'An Error has occurred, Please try again!' })

			const token = loginRes.data.access_token
			cookies.set('session', token, {
				httpOnly: true,
				path: '/',
				sameSite: 'strict',
				secure: true,
				maxAge: results.rememberMe ? 30 * 60 * 60 * 24 : 60 * 60 * 24
			})
		} catch (err) {
			console.log(err)
			return fail(400, { error: 'Incorrect email or password. Please try again!' })
		}

		throw redirect(302, redirectUrl ? '/' + redirectUrl.slice(1) : '/dashboard')
	}
}
