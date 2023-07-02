'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  // ?: optional : required
  isOpen?: boolean; // whether the modal is open
  onClose: () => void; // function to close the modal
  onSubmit: () => void; // function to submit the modal
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string; // label name of the action button
  disabled?: boolean; // whether the action button is disabled
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modals: React.FC<ModalProps> = ({
  isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryAction, secondaryActionLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  // useEffect hook will be executed whenever isOpen changes its value
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => { 
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => { onClose(); }, 300); // have animation of closing the window
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => { 
    if (disabled) {
      return;
    }
    onSubmit(); // function to submit the modal
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => { 
    if (disabled || !secondaryAction ) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      {showModal && (
        <div
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto
                  fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        >
          <div className="relative w-full md:w-4/6 lg:w-3/6 xl:2/5 my-6 mx-auto h-full md:h-auto lg:h-auto ">
            {/*content*/}
            <div
              className={`translate duration-300 h-full 
                          ${showModal ? "translate-y-0" : "translate-y-full"}
                          ${showModal ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className="relative flex flex-col translate 
                            w-full h-full md:h-auto lg:h-auto border-0 rounded-2xl
                            bg-white outline-none focus:outline-none overflow-y-auto"
              >
                {/*header*/}
                <div className="flex items-center p-6 rounded-t justify-center realtive border-b-[1px]">
                  {/*close button*/}
                  <button
                    onClick={handleClose}
                    className="p-1 hover:opacity-50 transition absolute left-5"
                  >
                    <IoMdClose size={32} />
                  </button>
                  {/*modal title*/}
                  <div className="text-2xl font-semibold">{title}</div>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">{body}</div>

                {/*footer*/}
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4 w-full">
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        label={secondaryActionLabel}
                        disabled={disabled}
                        onClick={handleSecondaryAction}
                        outline
                      />
                    )}
                    <Button
                      label={actionLabel}
                      disabled={disabled}
                      onClick={handleSubmit}
                    />
                  </div>
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modals
