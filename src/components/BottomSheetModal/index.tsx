/**
 * General Bottom sheet modal that uses Ref
 */
import {
  BottomSheetBackdrop,
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetModalProps as GorhomBottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React from 'react';

import BottomSheetBackground from '@/src/components/BottomSheetBackground';

export interface BottomSheetModalProps
  extends Omit<GorhomBottomSheetModalProps, 'ref'> {
  children: React.ReactNode;
}

const BottomSheetModal = React.forwardRef<
  GorhomBottomSheetModal,
  BottomSheetModalProps
>(
  (
    {
      children,
      animateOnMount = true,
      enableDynamicSizing = true,
      enablePanDownToClose = true,
      backgroundComponent = BottomSheetBackground,
      backdropComponent,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    const insideRef = React.createRef<GorhomBottomSheetModal>();

    React.useImperativeHandle(
      ref,
      () => insideRef.current as unknown as GorhomBottomSheetModal,
    );

    const renderBackdrop = (params: BottomSheetDefaultBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...params}
          pressBehavior={!enablePanDownToClose ? 'none' : 'close'}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      );
    };

    return (
      <GorhomBottomSheetModal
        ref={insideRef}
        animateOnMount={animateOnMount}
        enableDynamicSizing={enableDynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        backgroundComponent={backgroundComponent}
        backdropComponent={backdropComponent || renderBackdrop}
        onDismiss={onDismiss}
        {...props}
      >
        {children}
      </GorhomBottomSheetModal>
    );
  },
);

BottomSheetModal.displayName = 'BottomSheetModal';

export default BottomSheetModal;
