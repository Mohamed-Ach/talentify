import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'

async function validateEmail(email: string, signature: string, expires: string) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')

	const baseUrl = API_URL + '/verify-email'
	const params = {
		email: email,
		signature: signature,
		expires: expires
	}

	const url = new URL(baseUrl)
	url.search = new URLSearchParams(params).toString()

	const requestOptions = {
		method: 'POST',
		headers: myHeaders
	}

	const response = await fetch(url.toString(), requestOptions)
	const result = await response.json()

	return { status: response.status, message: result.message }
}

export const load: PageServerLoad = async ({ url }) => {
	let verify

	// parse email, signature, and timestamp from URL
	const searchParams = new URLSearchParams(url.search)
	const email = searchParams.get('email') || ''
	const expires = searchParams.get('expires') || ''
	const signature = searchParams.get('signature') || ''

	if (email && expires && signature) verify = await validateEmail(email, signature, expires)
	else
		verify = {
			status: 400,
			message: 'This link is invalid or expired. Please request a new one.'
		}

	return {
		verify: verify
	}
}
