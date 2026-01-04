//TODO finish this

import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { getProfile } from "@/api/get-profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Building, LogOut } from "lucide-react";
import { StoreProfileDialog } from "./store-profile-dialog";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router";

export function AccountMenu() {
  const navigate = useNavigate();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagedRestaurant,
      staleTime: Infinity, // deixa a informação obsoleta por conta do refetchOnWindowFocus
    });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    },
  });

  return (
    <Dialog>
      <div>
        <div>
          <button>
            {isLoadingManagedRestaurant && <Skeleton className="h-4 w-40" />}
            {!isLoadingManagedRestaurant && managedRestaurant?.name}
            <span>chevron down</span>
          </button>
        </div>
        <div>
          <div>
            {!isLoadingProfile && (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-32" />
              </div>
            )}
            {!isLoadingProfile && (
              <>
                <span>{profile?.name}</span>
                <span>{profile?.email}</span>
              </>
            )}
          </div>
          <hr />
          <DialogTrigger asChild>
            <div>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </div>
          </DialogTrigger>
          <div
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button onClick={() => signOutFn()} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      <StoreProfileDialog />
    </Dialog>
  );
}
