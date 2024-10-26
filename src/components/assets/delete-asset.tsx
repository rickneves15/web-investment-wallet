'use client'

import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { useInvalidateQueries } from '~/hooks/use-invalidate-queries'
import { useListAssetsActions } from '~/providers/list-assets-actions-provider'
import { deleteAsset } from '~/services/assets'

export function DeleteAsset() {
  const { invalidate } = useInvalidateQueries()
  const {
    assetIdToDelete,
    setAssetToDelete,
    isDeletingModalOpen,
    onToggleDeletingModal,
  } = useListAssetsActions((state) => state)

  const handleDelete = async () => {
    try {
      if (assetIdToDelete) {
        await deleteAsset(assetIdToDelete)
        await invalidate()
        toast.success('Ativo deletado com sucesso!')
      } else {
        toast.error('Ocorreu um erro ao deletar o ativo!')
      }
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao deletar o ativo!')
    } finally {
      onToggleDeletingModal()
      setAssetToDelete()
    }
  }

  return (
    <AlertDialog open={isDeletingModalOpen}>
      <AlertDialogTrigger className="hidden">deletar</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar esse ativo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Esta ação deletara o ativo e todos
            os dados relacionados a ele.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onToggleDeletingModal}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-neutral-50"
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
