import React from "react";
import Image from "next/image";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/global/mode-toggle";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  return (
    <div className="fixed top-0 right-0 left-0 z-10 p-4 flex items-center justify-between">
      <aside className="flex items-center gap-2">
        <Image
          src={`./assets/plura-logo.svg`}
          width={40}
          alt="Plura logo"
          height={40}
        ></Image>
        <span className="text-xl font-bold">Plura.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={"/agency"}
          className="bg-primary text-white px-4 p-2 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        <UserButton></UserButton>
        <ModeToggle></ModeToggle>
      </aside>
    </div>
  );
};
export default Navigation;
