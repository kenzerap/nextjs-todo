'use client';

import React from 'react';
import { Button, Modal, Spinner } from 'flowbite-react';

const DeleteProductModal: React.FC<{
  isShowDeleteModal: boolean;
  isLoading: boolean;
  onCloseConfirmModal: Function;
}> = (props) => {
  return (
    <Modal
      dismissible
      size="md"
      show={props.isShowDeleteModal}
      onClose={() => props.onCloseConfirmModal(false)}
    >
      <Modal.Header>Confirm delete</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Are you sure you want to delete?
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-center">
        <Button
          onClick={() => props.onCloseConfirmModal(true)}
          disabled={props.isLoading}
        >
          {props.isLoading ? <Spinner /> : 'Yes'}
        </Button>
        <Button color="gray" onClick={() => props.onCloseConfirmModal(false)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;
