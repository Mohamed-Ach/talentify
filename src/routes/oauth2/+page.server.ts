import { redirect } from '@sveltejs/kit'

// * get `locals.user` and pass it to the `page` store
export const load = async ({ cookies, url }) => {
	const token = url.searchParams.get('token') || null
	if (!token) throw redirect(302, '/login')

	// * Create a Session Cookie:
	cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: true,
		maxAge: 30 * 60 * 60 * 24
	})

	return {
		status: 200
	}
}
