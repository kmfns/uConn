import { currentProfile } from "@/lib/current-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import  NavigationAction  from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";


const NavigationSidebar = async () => {

    const profile = await currentProfile();
    if(!profile)
    {
        return redirect("/");
    }
    const servers = await db.server.findMany({
        where:{
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
            <NavigationAction></NavigationAction>
            <Separator className="h-[1px] bg-zinc-500 white:bg-zinc-700 rounded-md w-10 mx-auto"></Separator>
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl}></NavigationItem>
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle></ModeToggle>
                <UserButton appearance={{elements: {avatarBox: "h-[48px] w-[48px]"}}}></UserButton>
            </div>
        </div>
    );
}
export default NavigationSidebar;