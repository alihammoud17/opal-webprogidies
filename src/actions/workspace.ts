'use server'

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const verifyAccessToWorkspace = async (workspaceId: string) => {

    try {
        const user = await currentUser();
        if (!user) return { status: 403 }

        const isUserInWorkspace = await client.workSpace.findUnique({
            where: {
                id: workspaceId,
                OR: [
                    {
                        User: {
                            clerkid: user.id
                        }
                    },
                    {
                        members: {
                            every: {
                                User: {
                                    clerkid: user.id
                                }
                            }
                        }
                    }
                ]
            },
        });

        return {
            status: 200,
            data: {
                workspace: isUserInWorkspace
            }
        }
    } catch {
        return {
            status: 403,
            data: {
                workspace: null
            }
        };
    }
}

export const getWorkspaceFolders = async (workSpaceId: string) => {
    try {
        const folders = await client.folder.findMany({
            where: {
                workSpaceId
            },
            include: {
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        });

        if (folders && folders.length > 0) {
            console.log("Folders", folders);
            return { status: 200, data: folders }
        }

        return { status: 404, data: [] };
    } catch {
        return { status: 403, data: [] };
    }
}

export const getAllUserVideos = async (workSpaceId: string) => {
    try {

        const user = await currentUser();

        if (!user) return { status: 404 }

        const videos = await client.video.findMany({
            where: {
                OR: [
                    { workSpaceId },
                    { folderId: workSpaceId }
                ]
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                source: true,
                processing: true,
                Folder: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                User: {
                    select: {
                        firstname: true,
                        lastname: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        if (videos && videos.length > 0) {
            return { status: 200, data: videos }
        }

        return { status: 404, data: [] };
    } catch {
        return { status: 400, data: [] };
    }
}

// export const getWorkSpaces = async () => {
//     try {
//         const user = await currentUser();

//         if (!user) return { status: 404 }

//         const workspaces = await client.workSpace.findMany({
//             where: {
//                 OR: [
//                     {
//                         User: {
//                             clerkid: user.id
//                         }
//                     },
//                     {
//                         members: {
//                             every: {
//                                 User: {
//                                     clerkid: user.id
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             },
//             select: {
//                 id: true,
//                 name: true,
//                 type: true,
//                 members: {
//                     select: {
//                         User: {
//                             select: {
//                                 firstname: true,
//                                 lastname: true,
//                                 image: true
//                             }
//                         }
//                     }
//                 }
//             }
//         });

//         if (workspaces && workspaces.length > 0) {
//             return { status: 200, data: workspaces }
//         }

//         return { status: 404, data: [] };
//     } catch {
//         return { status: 400, data: [] };
//     }
// }

export const getWorkSpaces = async () => {
    try {
        const user = await currentUser()

        if (!user) return { status: 404 }

        const workspaces = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    },
                },
                workspace: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                    },
                },
                members: {
                    select: {
                        WorkSpace: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                            },
                        },
                    },
                },
            },
        })

        if (workspaces) {
            return { status: 200, data: workspaces }
        }
    } catch {
        return { status: 400 }
    }
}

export const createWorkspace = async (name: string) => {
    try {
        const user = await currentUser();
        if (!user) return { status: 404 };
        const authorized = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            select: {
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        });

        if (authorized?.subscription?.plan === "PRO") {
            const workspace = await client.user.update({
                where: {
                    clerkid: user.id
                },
                data: {
                    workspace: {
                        create: {
                            name,
                            type: "PUBLIC",

                        }
                    }
                }
            });

            if (workspace) {
                return { status: 201, data: 'Workspace created' };
            }
        }

        return { status: 401, data: 'You are not authorized to create the workspace' };
    } catch (error) {
        console.error("create workspace error", error);

        return { status: 400, data: 'Error creating workspace' };
    }
}

export const renameFolder = async (folderId: string, name: string) => {
    try {
        const folder = await client.folder.update({
            where: {
                id: folderId
            },
            data: {
                name
            }
        });

        if (folder) {
            console.log("Folder is renamed", folder);
            return { status: 200, data: 'Folder renamed' };
        }

        console.log("Folder is renamed", folder);

        return { status: 404, data: 'Folder not found' };
    } catch (error) {
        console.log("Folder is not renamed", error);

        return { status: 400, data: 'Oops! Error renaming folder' };
    }
}

export const createFolder = async (workspaceId: string) => {
    try {
        const folder = await client.workSpace.update({
            where: {
                id: workspaceId
            },
            data: {
                folders: {
                    create: {
                        name: 'Untitled'
                    }
                }
            }
        });

        if (folder) {
            return { status: 200, data: 'Folder created' };
        }

        return { status: 400, data: 'Could not create folder' };
    } catch {
        return { status: 500, data: 'Error creating folder' };
    }
}