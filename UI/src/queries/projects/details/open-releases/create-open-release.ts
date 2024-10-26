import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateOpenReleaseData {
  name: string
  description: string
}

const createOpenRelease = async (data: CreateOpenReleaseData) => {
  const response = await fetch('/api/open-releases', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create open release')
  }

  return response.json()
}

export const useCreateOpenRelease = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOpenRelease,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['open-releases'] })
    },
  })
}
