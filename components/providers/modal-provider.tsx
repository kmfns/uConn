"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { MembersModal } from "@/components/modals/members-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted)
    {
        return null;
    }

    return (
        <>
            <CreateServerModal></CreateServerModal>
            <MembersModal></MembersModal>
        </>
    );
}