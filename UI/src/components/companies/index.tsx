'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useRouter, useParams } from 'next/navigation'
import CompanyDetailsSheet from './CompanyDetailsSheet'
import CreateNewCompany from './CreateNewCompany'
import { useInfiniteQuery } from '@tanstack/react-query'
import { dataOptions } from '@/src/queries/table/query-options';
import { useQueryStates } from 'nuqs';
import { searchParamsParser } from '../table/search-params';
import { ColumnSchema, columnFilterSchema } from '../table/schema'
import { DataTableInfinite } from '../table/DataTableInfinite'
import { columns } from '../table/column'
import { GetCompanies } from '@/src/queries/companies/get-companies'
import { companySchema } from './schema'

function Companies({ companyId }: { companyId: string | undefined }) {

    const [search] = useQueryStates(searchParamsParser);
    const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery(GetCompanies(search));
    const flatData = React.useMemo(
        () => data?.pages?.flatMap((page) => page.data ?? []) ?? [],
        [data?.pages]
    );

    const lastPage = data?.pages?.[data?.pages.length - 1];
    const totalDBRowCount = lastPage?.totalCount;
    const totalFetched = flatData?.length;

    const [openCreateNewCompany, setOpenCreateNewCompany] = useState(false)
    const [openCompanyDetails, setOpenCompanyDetails] = useState(false)
    const router = useRouter()

    useEffect(() => {
        console.log(companyId)
        if (companyId) {

            setOpenCompanyDetails(true)
        }
    }, [companyId])

    const onOpenChange = (open: boolean) => {
        setOpenCompanyDetails(open)
        if (!open) {
            router.replace("/companies")
        }
    }

    const onRowClick = (row: any) => {
  
        router.replace(`/companies?id=${row.id}`)
        setOpenCompanyDetails(true)
    }


    return (
        <>
            <div className='flex flex-col gap-4 m-3'>
                <div className='flex justify-between items-center w-full'>
                    <h2 className='text-2xl font-bold'>Companies</h2>
                    <Button onClick={() => setOpenCreateNewCompany(true)}>Create New Company</Button>
                </div>
                <div>
                    <DataTableInfinite
                        columns={columns}
                        data={flatData}
                        totalRows={totalDBRowCount}
                        totalRowsFetched={totalFetched}
                        isFetching={isFetching}
                        isLoading={isLoading}
                        fetchNextPage={fetchNextPage}
                        schema={companySchema}
                        columnFilterSchema={companySchema}
                        onRowClick={onRowClick}
                    />
                </div>
            </div>
            <CompanyDetailsSheet open={openCompanyDetails} onOpenChange={onOpenChange} companyId={companyId} />
            <CreateNewCompany open={openCreateNewCompany} onOpenChange={(open) => setOpenCreateNewCompany(open)} />
        </>
    )
}

export default Companies
