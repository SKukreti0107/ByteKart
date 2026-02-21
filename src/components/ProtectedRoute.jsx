import { Navigate } from 'react-router-dom'
import { authClient } from '../auth-client'
import StorefrontLayout from './StorefrontLayout'

export default function ProtectedRoute({ children, requireAdmin = false }) {
    const { data: session, isPending } = authClient.useSession()

    if (isPending) {
        return (
            <StorefrontLayout>
                <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center text-charcoal-dark">
                    <div className="mb-4 h-12 w-12 animate-pulse rounded-full bg-baby-green"></div>
                    <h2 className="text-xl font-bold uppercase tracking-widest text-matcha-deep">Loading Session...</h2>
                </div>
            </StorefrontLayout>
        )
    }

    // Not logged in at all
    if (!session?.user) {
        return <Navigate to="/" replace />
    }

    // Logged in, but requires admin and user is NOT an admin
    const isAdmin = session.user.is_admin || session.user.role === 'admin';
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />
    }

    // Authorized
    return children
}
