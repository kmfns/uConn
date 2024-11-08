import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
        
      </SignedIn>
      <ModeToggle />
    </div>
  );
}
