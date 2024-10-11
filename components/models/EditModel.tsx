import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModel from "@/hooks/useEditModel";
import useUser from "@/hooks/useUser";
import { useSession } from "next-auth/react";

import Input from "../Input";
import Model from "../Model";
import ImageUpload from "../ImageUpload";

const EditModel = () => {
    const { data: session } = useSession();
    const { data: currentUser } = useCurrentUser(session);
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModel = useEditModel();

    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        setProfileImage(currentUser?.profileImage || "");
        setCoverImage(currentUser?.coverImage || "");
        setName(currentUser?.name || "");
        setUsername(currentUser?.username || "");
        setBio(currentUser?.bio || "");
    }, [currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage,
            });
            mutateFetchedUser();

            toast.success('Updated');
            editModel.onClose();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [bio, name, username, profileImage, coverImage, editModel, mutateFetchedUser]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
               value={profileImage}
               disabled={isLoading}
               onChange={(image) => setProfileImage(image)}
               label="Upload Profile image" 
            />
            <ImageUpload
               value={coverImage}
               disabled={isLoading}
               onChange={(image) => setCoverImage(image)}
               label="Upload Background image" 
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name || ""}  
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username || ""}  
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio || ""} 
                disabled={isLoading}
            />
        </div>
    );

    return (
        <Model
            disabled={isLoading}
            isOpen={editModel.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default EditModel;
