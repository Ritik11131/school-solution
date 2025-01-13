import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/drawer";
import { Button } from "@nextui-org/button";

interface GenericDrawerProps {
    placement: "bottom" | "left" | "right" | "top";
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"; // Drawer size
  isOpen: boolean; // Controlled drawer state
  onClose: () => void; // Function to handle close action
  onAction?: () => void; // Optional function for action button
  title?: string; // Title for the drawer
  bodyContent: React.ReactNode; // Customizable body content
  actionLabel?: string; // Label for the action button
  closeLabel?: string; // Label for the close button
  isDismissable?: boolean; // Allow dismissing the drawer by clicking outside
  isKeyboardDismissDisabled?: boolean; // Disable closing with escape key
}

const GenericDrawer: React.FC<GenericDrawerProps> = ({
  placement = "right", // Default placement,
  size = "md", // Default size
  isOpen,
  onClose,
  onAction,
  title = "Drawer Title",
  bodyContent,
  actionLabel = "Action",
  closeLabel = "Close",
  isDismissable = true,
  isKeyboardDismissDisabled = false,
}) => {
  return (
    <Drawer
      size={size}
      placement={placement}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={isOpen}
      onOpenChange={(open:any) => {
        if (!open) onClose(); // Close drawer on dismiss or action
      }}
    >
      <DrawerContent>
        <>
          <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
          <DrawerBody>{bodyContent}</DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              {closeLabel}
            </Button>
            {onAction && (
              <Button color="primary" onPress={onAction}>
                {actionLabel}
              </Button>
            )}
          </DrawerFooter>
        </>
      </DrawerContent>
    </Drawer>
  );
};

export default GenericDrawer;
