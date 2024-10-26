'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { createStore, StoreApi, useStore } from 'zustand'

import { Asset } from '~/schemas/asset'

type ListAssetsActionsStore = {
  assetToBuy: Asset | null
  assetToSell: Asset | null
  assetIdToDelete: string | null
  setAssetToBuy: (asset?: Asset) => void
  setAssetToSell: (asset?: Asset) => void
  setAssetToDelete: (asset?: string) => void
  isBuyingModalOpen: boolean
  isSellingModalOpen: boolean
  isDeletingModalOpen: boolean
  onToggleBuyingModal: () => void
  onToggleSellingModal: () => void
  onToggleDeletingModal: () => void
}

const ListAssetsActionsContext = createContext<
  StoreApi<ListAssetsActionsStore> | undefined
>(undefined)

export function ListAssetsActionsProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<ListAssetsActionsStore>((set) => ({
      assetToBuy: null,
      assetToSell: null,
      assetIdToDelete: null,
      isBuyingModalOpen: false,
      isSellingModalOpen: false,
      isDeletingModalOpen: false,

      setAssetToBuy: (asset?: Asset) =>
        set((state) => ({ ...state, assetToBuy: asset ?? null })),
      setAssetToSell: (asset?: Asset) =>
        set((state) => ({ ...state, assetToSell: asset ?? null })),
      setAssetToDelete: (asset?: string) =>
        set((state) => ({ ...state, assetIdToDelete: asset ?? null })),
      onToggleBuyingModal: () =>
        set((state) => ({
          ...state,
          isBuyingModalOpen: !state.isBuyingModalOpen,
        })),
      onToggleSellingModal: () =>
        set((state) => ({
          ...state,
          isSellingModalOpen: !state.isSellingModalOpen,
        })),
      onToggleDeletingModal: () =>
        set((state) => ({
          ...state,
          isDeletingModalOpen: !state.isDeletingModalOpen,
        })),
    })),
  )

  return (
    <ListAssetsActionsContext.Provider value={store}>
      {children}
    </ListAssetsActionsContext.Provider>
  )
}

export function useListAssetsActions<T>(
  selector: (state: ListAssetsActionsStore) => T,
) {
  const context = useContext(ListAssetsActionsContext)

  if (!context) {
    throw new Error('ListAssetsActionsContext.Provider is missing')
  }

  return useStore(context, selector)
}
