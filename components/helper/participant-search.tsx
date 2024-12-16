import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FC, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Label } from "../ui/label";
import { useQuery } from "@tanstack/react-query";
import { IUser, IUsers } from "@/types/interface/user.interface";
import { fetchUsers } from "@/services/user.service";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Input } from "../ui/input";
import { useParticipantStore } from "@/store/participants.store";
import { IEventValues } from "@/types/interface/event.interface";
import { ParticipantList } from "./participants-list";

interface IParticipantProps {
  setValue: UseFormSetValue<IEventValues>;
  watch: UseFormWatch<IEventValues>;
}

const ParticipantSearch: FC<IParticipantProps> = ({ setValue }) => {
  const [search, setSearch] = useState<string>("");

  // Zustand store
  const { participants, addParticipant, canAddParticipant } =
    useParticipantStore();

  // Query to fetch users
  const { data } = useQuery<ApiResponse<IUsers>>({
    queryKey: ["users", search],
    queryFn: () => fetchUsers(1, 5, search),
  });

  console.log("ZUSTAND STATE PARTICIPANT ->", participants);
  return (
    <div className="space-y-4">
      <Label htmlFor="participants">Participants</Label>

      {/* Selected Participants */}
      <div className="flex flex-wrap gap-2">
        <ParticipantList
          initialParticipants={participants}
          setValueAction={setValue}
        />
      </div>

      {/* Search and Suggestions */}
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Participants"
          name="Searching Participants"
        />
        {search.length > 0 && (
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {data?.response?.data?.data?.map((user: IUser) => (
                <CommandItem
                  key={user._id}
                  value={user.username}
                  onSelect={() => {
                    if (canAddParticipant()) {
                      console.log("USER BEING ADD ->", user);
                      addParticipant(user, setValue);
                    }
                  }}
                >
                  <Link href={`/profile/${user._id}`}>
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.profilePicture ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  {user.username}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default ParticipantSearch;
