"use client";
import GenericTable from "@/components/generic-table";
import { useParents } from "@/hooks/useParent";
import type { Parent } from "@/interface/parent";
import { ChipProps } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

const Parent = () => {
  const { isLoading, fetchParents } = useParents();
  const [parents, setParents] = React.useState<Parent[]>([]); // Adjust the type as necessary
  console.log(isLoading);

  React.useEffect(() => {
    const loadParents = async () => {
      try {
        const response = await fetchParents();
        console.log(response.data);
        setParents(response.data); // Adjust based on your API response structure
      } catch (error) {
        console.error('Failed to fetch parents:', error);
      }
    };

    loadParents();
  }, [fetchParents]);

  const handleAdd = () => {
    console.log("Add new user");
    // Implement add user logic
  };

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

  const INITIAL_VISIBLE_COLUMNS = ["id","name", "email","contactNumber"];

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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <GenericTable
          columns={columns}
          data={parents}
          initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
          // statusOptions={statusOptions}
          // statusColorMap={statusColorMap}
        />
      )}
    </>
  );
};

export default Parent;
