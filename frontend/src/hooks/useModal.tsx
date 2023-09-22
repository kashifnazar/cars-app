import React, { useState } from 'react'

type Props = {
    title: string,
    onOk: () => Promise<void>
    onCancel?: () => void
    okText?: string
}

const bodyStyle: React.CSSProperties = {
  paddingTop: '1rem',
  paddingBottom: '1rem'
}

function useModal({ title, onOk, onCancel, okText }: Props) {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    function showModal() {
        setOpen(true);
    };
    
    async function okHandler(){
      
      setConfirmLoading(true)

      try {
        await onOk()
        hideModal()
      }
      catch(e) {

      } finally {
        setConfirmLoading(false)
      }
    }

    function cancelHandler() {
      onCancel?.()
      hideModal()
    }
    
    function hideModal() {
      setOpen(false);
    }

    return {
        showModal,
        hideModal,
        open,
        okText,
        okHandler,
        confirmLoading,
        cancelHandler,
        bodyStyle
    }
}

export default useModal