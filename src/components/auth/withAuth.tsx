import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Permission } from '@/types/permissions';

const withAuth = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  requiredPermissions: Permission[] = [] // Accept required permissions as an argument
): React.FC<P> => {
  const Auth: React.FC<P> = (props) => {
    const router = useRouter();
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/welcome/login');
      },
    });

    // Show loading state while session is loading
    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    // Extract user permissions from the session
    const userPermissions: Permission[] = session?.user?.permissions || []; // Ensure permissions are available

    // Check if the user has all required permissions
    const hasRequiredPermissions = requiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    );

    // Redirect or show an error if the user lacks permissions
    if (!hasRequiredPermissions) {
      router.push('/unauthorized'); // Redirect to unauthorized page
      return null;
    }

    // Render the wrapped component if authenticated and authorized
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
