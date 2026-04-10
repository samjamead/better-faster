"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  type NewRoundEntry,
  createNewRoundEntry,
} from "@/api/create-new-round-entry";

export const useCreateRoundEntry = () => {
  const queryClient = useQueryClient();

  const createRoundMutation = useMutation<
    { roundId: number },
    Error,
    NewRoundEntry
  >({
    mutationFn: (input) => createNewRoundEntry(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["wide_hole_data"],
      });
    },
  });

  return {
    createRoundEntry: createRoundMutation.mutateAsync,
    isCreatingRound: createRoundMutation.isPending,
    createRoundError: createRoundMutation.error,
  };
};
