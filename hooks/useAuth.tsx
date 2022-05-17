import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { auth } from '~/firebase';

interface AuthProviderProps {
    children: ReactNode;
}

interface IAuth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    loading: boolean;
}

const defaultContext = {
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
} as const;

const AuthContext = createContext<IAuth>(defaultContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Logged in...
                    setUser(user);
                    setLoading(false);
                } else {
                    // Not logged in...
                    setUser(null);
                    setLoading(true);
                    router.push('/login');
                }

                setInitialLoading(false);
            }),
        [auth],
    );

    const signUp = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(userCredential.user);
            setLoading(false);
            router.push('/');
        } catch (err) {
            console.error(err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(userCredential.user);
            setLoading(false);
            router.push('/');
        } catch (err) {
            console.error(err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);

        try {
            await signOut(auth);
            setUser(null);
        } catch (err) {
            console.error(err);
            setError((err as Error).message);
        }
    };

    const memoValue = useMemo(() => {
        return {
            user,
            loading,
            signUp,
            signIn,
            logout,
            error,
        };
    }, [user, loading]);

    return (
        <AuthContext.Provider value={memoValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
    return useContext(AuthContext);
}
