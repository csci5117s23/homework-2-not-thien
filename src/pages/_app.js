import "@/styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isPublicPath = ["/"].includes(pathname); // Public pages are always accessible, just want home page to be accessible
  return (
    <ClerkProvider {...pageProps}>
      {isPublicPath && <Component {...pageProps} />}
      {!isPublicPath && (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}
