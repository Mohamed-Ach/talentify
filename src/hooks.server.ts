import { redirect, type Handle } from '@sveltejs/kit'
import { API_URL } from '$lib/stores'

async function verifySession(token: string) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const requestOptions = {
		method: 'GET',
		headers: myHeaders
	}

	const response = await fetch(API_URL + '/user', requestOptions)
	const result = await response.json()

	return {
		status: response.status,
		data: result.user
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	// ** Pass the theme to all pages using the context
	const theme: string = event.cookies.get('theme') || 'light'
	event.locals.theme = theme

	// ** verify if the user is authenticated

	// Extract the token from the cookies
	let user = null
	const token = event.cookies.get('session') || null

	if (token) {
		const { status, data } = await verifySession(token)
		if (status === 200) {
			user = data
			event.locals.user = user
		} else {
			event.locals.user = null
			event.cookies.delete('session', { path: '/' })
		}
	} else {
		event.locals.user = null
	}

	// ** Redirect the user to the dashboard if he/she are already authenticated
	const authRoutes = [
		'/login',
		'/register',
		'/forgot-password',
		'/reset-password',
		'/verify-email',
		'/recover-password',
		'/oauth2'
	]

	if (user) {
		for (const route of authRoutes) {
			if (event.url.pathname.startsWith(route)) {
				return redirect(302, '/dashboard')
			}
		}
	}

	// ** Redirect the user to the login page if he/she are not authenticated
	const protectedRoutes: string[] = [
		'/dashboard',
		'/on-boarding',
		'/settings',
		'/profile',
		'/job-listings',
		'/applicant-saved-jobs',
		'/applied-jobs',
		'/emp',
		'/admin'
	]

	const userRoutes: string[] = [
		'/on-boarding',
		'/settings',
		'/profile',
		'/applicant-saved-jobs',
		'/applied-jobs',
	]
	if (!user) {
		for (const route of protectedRoutes) {
			if (event.url.pathname.startsWith(route)) {
				throw redirect(302, '/login?redirect=' + event.url.pathname)
			}
		}

	} else if (user.user_type !== "job_seeker") {
		for (const route of userRoutes) {
			if (event.url.pathname.startsWith(route)) {
				throw redirect(302, '/error/404')
			}
		}
	}

	if (event.url.pathname.startsWith('/emp') && user.user_type !== "job_employer") {
		throw redirect(302, '/error/404')
	}

	if (event.url.pathname.startsWith('/admin') && user.user_type !== "admin") {
		throw redirect(302, '/error/404')
	}

	if (event.url.pathname.startsWith('/dashboard')) {
		if (user.user_type === "job_seeker" && user.is_onboarding === 0)
			return redirect(302, '/on-boarding')
		else if (user.user_type === "job_employer")
			return redirect(302, '/emp/dashboard')
		else if (user.user_type === "admin")
			return redirect(302, '/admin/dashboard')
	}

	if (event.url.pathname.startsWith('/on-boarding') && user.is_onboarding === 1) {
		return redirect(302, '/dashboard')
	}

	return await resolve(event)
}
