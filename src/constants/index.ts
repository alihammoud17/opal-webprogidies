import { Bell, CreditCard, FileDuoToneBlack, Home, Settings } from "@/components/icons";
import React from "react";

export const MENU_ITEMS =
    (workspaceId: string): {
        title: string;
        href: string;
        icon: React.ReactNode;
    }[] => [
            {
                title: 'Home',
                href: `/dashboard/${workspaceId}/home`,
                icon: React.createElement(Home)
            },
            {
                title: 'My Library',
                href: `/dashboard/${workspaceId}`,
                icon: React.createElement(FileDuoToneBlack)
            },
            {
                title: 'Notifications',
                href: `/dashboard/${workspaceId}/notifications`,
                icon: React.createElement(Bell)
            },
            {
                title: 'Billing',
                href: `/dashboard/${workspaceId}/billing`,
                icon: React.createElement(CreditCard)
            },
            {
                title: 'Settings',
                href: `/dashboard/${workspaceId}/settings`,
                icon: React.createElement(Settings)
            },
        ]