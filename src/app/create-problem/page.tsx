import React from "react";
import { getCurrentUserData } from "../../../modules/auth/actions";
import { UserRole } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { CreateProblemForm } from "../../../modules/problems/components/createProblemForm";

const CreateProblemPage = async () => {

    const user = await getCurrentUserData();    
  //@ts-ignore
  if (user?.role !== UserRole.ADMIN || !user || 'error' in user ) {
      redirect('/');
  }
  return (
    <section className="flex flex-col items-center justify-center mx-4 my-4">
      <div className="flex flex-row justify-between items-center w-full">
        <Link href={"/"}>
          <Button variant={"outline"} size={"icon"}>
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-amber-400 ">
          {" "}
          Welcome {user?.firstName} ! Create a problem
        </h1>
        <ModeToggle />
          </div>
          <CreateProblemForm/>
    </section>
  );
};

export default CreateProblemPage;
