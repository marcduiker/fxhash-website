import React, { memo, useCallback, useMemo, useState } from "react"
import { Dropdown } from "../Navigation/Dropdown"
import { Objkt } from "../../types/entities/Objkt"
import style from "./UserCollectionOwnerActions.module.scss"
import cs from "classnames"
import { ModalAddListing } from "./ModalAddListing"
import { ModalCancelListing } from "./ModalCancelListing"
import { ModalTransferGentk } from "./ModalTransferGentk"
import { ModalBurnGentk } from "./ModalBurnGentk"
import { ModalUpdateListing } from "./ModalUpdateListing"

interface DropdownAction {
  value: string
  label: any
  type?: "warning"
}
const actionsList: Record<string, DropdownAction> = {
  transfer: {
    label: (
      <>
        <i aria-hidden className="fa-solid fa-arrow-right-arrow-left" />
        <span>transfer</span>
      </>
    ),
    value: "transfer",
  },
  editListing: {
    label: (
      <>
        <i aria-hidden className="fa-solid fa-pen" />
        <span>update listing</span>
      </>
    ),
    value: "editListing",
  },
  cancelListing: {
    label: (
      <>
        <i aria-hidden className="fa-solid fa-ban" />
        <span>cancel listing</span>
      </>
    ),
    value: "cancelListing",
  },
  addListing: {
    label: (
      <>
        <i aria-hidden className="fa-solid fa-tags" />
        <span>list for trade</span>
      </>
    ),
    value: "addListing",
  },
  burn: {
    label: (
      <>
        <i aria-hidden className="fa-solid fa-fire" />
        <span>burn</span>
      </>
    ),
    value: "burn",
    type: "warning",
  },
}

interface UserCollectionOwnerActionsProps {
  objkt: Objkt
}

const _UserCollectionOwnerActions = ({
  objkt,
}: UserCollectionOwnerActionsProps) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const handleClickAction = useCallback(
    (action) => () => setSelectedAction(action),
    []
  )
  const handleCloseModal = useCallback(() => {
    setSelectedAction(null)
  }, [])
  const actions = useMemo(() => {
    const list = [actionsList.transfer] as DropdownAction[]
    if (objkt.activeListing) {
      list.push(actionsList.editListing)
      list.push(actionsList.cancelListing)
    } else {
      list.push(actionsList.addListing)
    }
    list.push(actionsList.burn)
    return list
  }, [objkt.activeListing])
  return (
    <>
      <Dropdown
        mobileMenuAbsolute
        itemComp={<i aria-hidden className="fa-solid fa-ellipsis-vertical" />}
        btnClassName={style.open_btn}
        className={style.dropdown}
      >
        {actions.map((action) => (
          <div
            role="button"
            key={action.value}
            className={cs(style.opt, {
              [style.opt_warning]: action.type === "warning",
            })}
            onClick={handleClickAction(action.value)}
          >
            {action.label}
          </div>
        ))}
      </Dropdown>
      {selectedAction === "transfer" && (
        <ModalTransferGentk objkt={objkt} onClose={handleCloseModal} />
      )}
      {selectedAction === "addListing" && (
        <ModalAddListing objkt={objkt} onClose={handleCloseModal} />
      )}
      {selectedAction === "editListing" && (
        <ModalUpdateListing objkt={objkt} onClose={handleCloseModal} />
      )}
      {selectedAction === "cancelListing" && (
        <ModalCancelListing objkt={objkt} onClose={handleCloseModal} />
      )}
      {selectedAction === "burn" && (
        <ModalBurnGentk objkt={objkt} onClose={handleCloseModal} />
      )}
    </>
  )
}

export const UserCollectionOwnerActions = memo(_UserCollectionOwnerActions)
