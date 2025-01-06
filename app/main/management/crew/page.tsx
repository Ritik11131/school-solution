'use client'
import GenericTable from '@/components/generic-table';
import { useCrew } from '@/hooks/useCrew';
import { CrewMember } from '@/interface/crew';
import { ChipProps } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';
import React from 'react'

const Crew = () => {

   const { isLoading, fetchCrews } = useCrew();
    const [crews, setCrews] = React.useState<CrewMember[]>([]); // Adjust the type as necessary

  React.useEffect(() => {
      const loadCrews = async () => {
        try {
          const response = await fetchCrews();
          const modifiedResponse = response.data.map((crew: CrewMember) => ({
            ...crew,
            role: [
              crew.isPilot ? 'Pilot' : null,
              crew.isHelper ? 'Helper' : null,
              crew.isTeacher ? 'Teacher' : null,
            ].filter(Boolean).join(', ') || 'Unassigned' // Join roles or set to 'No Role' if none
          }));          
          setCrews(modifiedResponse); // Set the modified crew data
        } catch (error) {
          console.error('Failed to fetch parents:', error);
        }
      };
  
      loadCrews();
    }, [fetchCrews]);


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
        { name: "ROLE", uid: "role", sortable: true },
        { name: "LICENSE NO", uid: "licenseNumber" },
        { name: "EMAIL", uid: "email" },
        { name: "CONTACT NO", uid: "contactNumber", sortable: true },
      ];
    
      const statusOptions = [
        { name: "Active", uid: "active" },
        { name: "Paused", uid: "paused" },
        { name: "Vacation", uid: "vacation" },
      ];
    
      const statusColorMap: Record<string, ChipProps["color"]> = {
        Pilot: "primary",
        Helper: "secondary",
        Teacher: "default",
        Unassigned: "danger",
      };

  const INITIAL_VISIBLE_COLUMNS = ["id","name", "email","contactNumber","licenseNumber","role"];



  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <GenericTable
          columns={columns}
          data={crews}
          initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
          // statusOptions={statusOptions}
          statusColorMap={statusColorMap}
        />
      )}
    </>
  )
}

export default Crew