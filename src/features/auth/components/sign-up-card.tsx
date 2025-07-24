"use client"

import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { SignInFlow } from "../types"
import { TriangleAlert } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
};

export function SignUpCard({ setState }: SignUpCardProps) {
    const { signIn } = useAuthActions();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pending, setPending] = useState(false)
    const [errors, setErrors] = useState({ email: "", password: "" })
    const [error, setError] = useState("")

    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrors({ email: "", password: "Passwords do not match" });
            return;
        }

        setPending(true);
        signIn("password", { name, email, password, flow: "signUp" })
            .catch(() => {
                setError("Something went wrong");
            })
            .finally(() => {
                setPending(false);
            })
    }

    const onProviderSignUp = (value: "github" | "google") => {
        setPending(true);
        signIn(value)
            .finally(() => {
                setPending(false);
            })
    }

    return (
        <Card className="w-full max-w-md mx-auto p-6">
            <CardHeader>
                <h2 className="text-2xl font-bold">Sign in to Continue</h2>
                <CardDescription>
                    Use your email and password to continue
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-2">
                <form onSubmit={onPasswordSignUp} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            disabled={pending}
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Label htmlFor="email">Email</Label>
                        <Input
                            disabled={pending}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            disabled={pending}
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>

                <div className="flex flex-col space-y-2 ">
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignUp("google")}
                        variant="outline"
                        size='lg'
                        className="w-full relative"
                    >
                        <FaGoogle/>
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignUp("github")}
                        variant="outline"
                        size='lg'
                        className="w-full relative"
                        >
                        <FaGithub/>
                        Continue with GitHub
                    </Button>
                </div>
                <p>
                    Already have an account? <span onClick={() => setState("signIn")} className="text-blue-400 cursor-pointer hover:underline">Sign In</span>
                </p>
            </CardContent>
        </Card>
    )
}






// import { useAuthActions } from '@convex-dev/auth/react';
// import { TriangleAlert } from 'lucide-react';
// import { useState } from 'react';
// import { FaGithub } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';

// import type { SignInFlow } from '../types';

// interface SignUpCardProps {
//   setState: (state: SignInFlow) => void;
// }

// export const SignUpCard = ({ setState }: SignUpCardProps) => {
//   const { signIn } = useAuthActions();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [pending, setPending] = useState(false);

//   const handleOAuthSignUp = (value: 'github' | 'google') => {
//     setPending(true);
//     signIn(value).finally(() => setPending(false));
//   };

//   const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const validateEmail = (email: string) => {
//       return String(email)
//         .toLowerCase()
//         .match(
//           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//         );
//     };

//     const validatePassword = (password: string) => {
//       return String(password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/);
//     };

//     if (!validateEmail(email)) return setError('Invalid Email.');
//     if (password !== confirmPassword) return setError("Password and Confirm Password doesn't match.");
//     if (!validatePassword(password)) return setError('Password must be strong.');

//     setPending(true);
//     setError('');
//     signIn('password', { name, email, password, flow: 'signUp' })
//       .catch(() => {
//         setError('Something went wrong!');
//       })
//       .finally(() => setPending(false));
//   };

//   return (
//     <Card className="size-full p-8">
//       <CardHeader className="px-0 pt-0">
//         <CardTitle>Sign up to continue</CardTitle>
//         <CardDescription>Use your email or another service to continue.</CardDescription>
//       </CardHeader>

//       {!!error && (
//         <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
//           <TriangleAlert className="size-4" />
//           <p>{error}</p>
//         </div>
//       )}

//       <CardContent className="space-y-5 px-0 pb-0">
//         <form onSubmit={handleSignUp} className="space-y-2.5">
//           <Input
//             disabled={pending}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Full Name"
//             minLength={3}
//             maxLength={50}
//             required
//           />

//           <Input disabled={pending} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
//           <Input
//             disabled={pending}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             type="password"
//             required
//           />

//           <Input
//             disabled={pending}
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm Password"
//             type="password"
//             required
//           />

//           <Button type="submit" className="w-full" size="lg" disabled={pending}>
//             Continue
//           </Button>
//         </form>

//         <Separator />

//         <div className="flex flex-col gap-y-2.5">
//           <Button disabled={pending} onClick={() => handleOAuthSignUp('google')} variant="outline" size="lg" className="relative w-full">
//             <FcGoogle className="absolute left-2.5 top-3 size-5" />
//             Continue with Google
//           </Button>

//           <Button disabled={pending} onClick={() => handleOAuthSignUp('github')} variant="outline" size="lg" className="relative w-full">
//             <FaGithub className="absolute left-2.5 top-3 size-5" />
//             Continue with GitHub
//           </Button>
//         </div>

//         <p className="text-center text-xs text-muted-foreground">
//           Already have an account?{' '}
//           <button
//             disabled={pending}
//             onClick={() => setState('signIn')}
//             className="cursor-pointer font-medium text-sky-700 hover:underline disabled:pointer-events-none disabled:opacity-50"
//           >
//             Sign in
//           </button>
//         </p>
//       </CardContent>
//     </Card>
//   );
// };
