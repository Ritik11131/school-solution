"use client";
import GenericModal from "@/components/generic-modal";
import GenericTable from "@/components/generic-table";
import { useParents } from "@/hooks/useParent";
import type { Parent } from "@/interface/parent";
import { useDisclosure } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

const Parent = () => {
  const { isLoading, fetchParents, createParents } = useParents();
  const [parents, setParents] = React.useState<Parent[]>([]); // Adjust the type as necessary
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log(isLoading);

  React.useEffect(() => {
    loadParents();
  }, [fetchParents]);
  
  const loadParents = async () => {
    try {
      const response = await fetchParents();
      console.log(response.data);
      setParents(response.data); // Adjust based on your API response structure
    } catch (error) {
      console.error("Failed to fetch parents:", error);
    }
  };

  const handleCreateParents = async (data: Parent) => {
    try {
      const response = await createParents(data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to create parent:", error);
    }
  }

  const handleEdit = (id: number) => {
    console.log("Edit user with ID:", id);
    // Implement edit user logic
  };

  const handleDelete = (id: number) => {
    console.log("Delete user with ID:", id);
    // Implement delete user logic
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "EMAIL", uid: "email", sortable: true },
    { name: "CONTACT NO", uid: "contactNumber" },
  ];

  const INITIAL_VISIBLE_COLUMNS = ["id", "name", "email", "contactNumber"];

  // const statusOptions = [
  //   { name: "Active", uid: "active" },
  //   { name: "Paused", uid: "paused" },
  //   { name: "Vacation", uid: "vacation" },
  // ];

  // const statusColorMap: Record<string, ChipProps["color"]> = {
  //   active: "success",
  //   paused: "danger",
  //   vacation: "warning",
  // };

  const inputFields = [
    {
      label: "Name",
      name: "name",
      placeholder: "Enter your name",
      type: "text",
      isRequired: true,
      validate: (value: string) => value.length < 1 ? "Name is required" : null,
    },
    {
      label: "Username",
      name: "username",
      placeholder: "Enter your username",
      type: "text",
      isRequired: true,
      validate: (value: string) => {
        if (value.length < 3) {
          return "Username must be at least 3 characters long";
        }
        return null;
      },
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      type: "email",
      isRequired: true,
      validate: (value: string) => {
        const emailPattern = /\S+@\S+\.\S+/;
        return !emailPattern.test(value) ? "Please enter a valid email" : null;
      },
    },
    {
      label: "Contact No",
      name: "contactNumber",
      placeholder: "Enter your contact Number",
      type: "text", 
      isRequired: true,
      validate: (value: string) => {
        return !/^\d{10}$/.test(value) ? "Contact number must be 10 digits" : null;
      },
    },
  ];

  const handleConfirm = async (values: Parent) => {
    console.log("Form values submitted:", values);
    await handleCreateParents(values);
    await loadParents();
  };

  const handleClose = () => {
    console.log("Close button clicked");
    // Additional logic for close action
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <GenericTable
            columns={columns}
            data={parents}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            onAddNew={onOpen}
            // statusOptions={statusOptions}
            // statusColorMap={statusColorMap}
          />

          <GenericModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Add Parent"
            inputFields={inputFields} // Pass the input fields configuration
            onClose={handleClose} // Optional close callback
            onConfirm={handleConfirm} // Pass the confirm callback
          />
        </>
      )}
    </>
  );
};

export default Parent;
