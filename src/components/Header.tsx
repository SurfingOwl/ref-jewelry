import {SignInButton} from "@/components/SignInButton";

export const Header = () => {
  return (
    <header className="w-full flex justify-between z-10 pl-2 pr-2">
      <div className="w-full flex gap-2">
        <h1 className="self-center text-lg font-semibold">REF JEWELRY HELPER</h1>
      </div>
      <SignInButton/>
    </header>
  );
}