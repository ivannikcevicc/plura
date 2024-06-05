"use client";

import {
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { StringValidation } from "zod";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu } from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";
interface Props {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
}

const MenuOptions = ({
  defaultOpen,
  subAccounts,
  sidebarOpt,
  sidebarLogo,
  details,
  user,
  id,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;
  return (
    // <Sheet modal={false} {...openState}>
    <Sheet modal={false} open={true}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden flex"
      >
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="Sidebar Logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className="w-full my-4 flex items-center justify-between py-8"
              >
                <div className="flex items-center text-left gap-2">
                  <Compass></Compass>
                  <div className="flex flex-col">
                    {details.name}
                    <span className="text-muted-foreground">
                      {details.address}
                    </span>
                  </div>
                </div>
                <div>
                  {" "}
                  <ChevronsUpDown
                    className="text-muted-foreground"
                    size={16}
                  ></ChevronsUpDown>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              {
                <Command className="rounded-lg">
                  <CommandInput placeholder="Search Accounts..."></CommandInput>
                  <CommandList className="pb-16">
                    <CommandEmpty>No results found</CommandEmpty>
                    {(user?.role === "AGENCY_OWNER" ||
                      user?.role === "AGENCY_ADMIN") &&
                      user?.Agency && (
                        <CommandGroup heading="Agency">
                          <CommandItem className="border-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all my-2 text-primary !bg-transparent">
                            {defaultOpen ? (
                              <Link
                                className="flex gap-4 w-full h-full"
                                href={`/agency/${user?.Agency?.id}`}
                              >
                                <div className="relative w-16">
                                  <Image
                                    alt="Agency Logo"
                                    fill
                                    src={user?.Agency?.agencyLogo}
                                    className="rounded-md object-contain"
                                  ></Image>
                                </div>
                              </Link>
                            ) : (
                              ""
                            )}
                          </CommandItem>
                        </CommandGroup>
                      )}
                  </CommandList>
                </Command>
              }
            </PopoverContent>
          </Popover>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
