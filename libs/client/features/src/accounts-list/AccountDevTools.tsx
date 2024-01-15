import Link from 'next/link'
import {
    useAccountConnectionApi,
    useInstitutionApi,
    usePlaidApi,
    BrowserUtil,
} from '@maybe-finance/client/shared'

export function AccountDevTools() {
    const { useSandboxQuickAdd } = usePlaidApi()
    const { useDeleteAllConnections } = useAccountConnectionApi()
    const { useSyncInstitutions, useDeduplicateInstitutions } = useInstitutionApi()

    const sandboxQuickAdd = useSandboxQuickAdd()
    const deleteAllConnections = useDeleteAllConnections()
    const syncInstitutions = useSyncInstitutions()
    const deduplicateInstitutions = useDeduplicateInstitutions()

    return process.env.NODE_ENV === 'development' ? (
        <div className="relative mb-12 mx-2 sm:mx-0 p-4 bg-gray-700 rounded-md">
            <h6 className="flex text-red">
                Dev Tools <i className="ri-tools-fill ml-1.5" />
            </h6>
            <p className="text-sm my-2">
                This section along with anything in <span className="text-red">red text</span> will
                NOT show in production and are solely for making testing easier.
            </p>
            <div className="flex items-center text-sm mt-4">
                <p className="font-bold">Actions:</p>
                <button
                    className="underline text-red ml-4"
                    onClick={() => sandboxQuickAdd.mutate()}
                >
                    Quick add item
                </button>
                <button
                    className="underline text-red ml-4"
                    onClick={() => deleteAllConnections.mutate()}
                >
                    Delete all connections
                </button>
                <Link href="http://localhost:3333/admin/bullmq" className="underline text-red ml-4">
                    BullMQ Dashboard
                </Link>
                <button
                    className="underline text-red ml-4"
                    onClick={() => BrowserUtil.copyToClipboard((window as any).JWT)}
                >
                    Copy JWT
                </button>
                <button
                    className="underline text-red ml-4"
                    onClick={() => syncInstitutions.mutate()}
                >
                    Sync institutions
                </button>
                <button
                    className="underline text-red ml-4"
                    onClick={() => deduplicateInstitutions.mutate()}
                >
                    Deduplicate institutions
                </button>
            </div>
        </div>
    ) : null
}

export default AccountDevTools
