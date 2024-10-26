import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateCompanyData {
  name: string
  description: string
}

const createCompany = async (data: CreateCompanyData) => {
  const response = await fetch('/api/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create company')
  }

  return response.json()
}

export const useCreateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
}