'use client'

import React from 'react'
import GenericModal from '@/components/generic-modal';
import GenericTable from '@/components/generic-table';
import { useCrew } from '@/hooks/useCrew';
import { CrewPost, CrewMember } from '@/interface/crew';
import { ChipProps } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';
import { useDisclosure } from "@nextui-org/modal";


const Crew = () => {

   const { isLoading, fetchCrews, createCrews } = useCrew();
    const [crews, setCrews] = React.useState<CrewMember[]>([]); // Adjust the type as necessary
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  React.useEffect(() => {
    loadCrews();
  }, [fetchCrews]);
  
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


  const handleCreateCrews = async (data: CrewPost) => {
      try {
        const response = await createCrews(data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to create parent:", error);
      }
    }

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

  const handleConfirm = async (values: any) => {
    console.log("Form values submitted:", values);
    const payload = {
      isPilot: values.role === "pilot",
      isHelper: values.role === "helper",
      isTeacher: values.role === "teacher",
      attributes: {
        licenseNumber: values.licenseNumber,
        emergencyContact: values.emergencyContact,
      },
      name: values.name,
      email: values.email,
      contactNumber: values.contactNumber,
      username: values.username,
      address: values.address,
    };
    
    await handleCreateCrews(payload);
    await loadCrews();
  };

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
    {
      label: "Emergency Contact No",
      name: "emergencyContact",
      placeholder: "Enter your no",
      type: "text",
      isRequired: true,
      validate: (value: string) => {
        return !/^\d{10}$/.test(value) ? "Contact number must be 10 digits" : null;
      },
    },
    {
      label: "License No",
      name: "licenseNumber",
      placeholder: "Enter your license no",
      type: "text",
      isRequired: true,
      validate: (value: string) => value.length < 1 ? "License No is required" : null,
    },
    {
      label: "Address",
      name: "address",
      placeholder: "Enter your address",
      type: "textarea",
      isRequired: true,
      validate: (value: string) => value.length < 1 ? "Address is required" : null,
    },
    {
      label:'Role',
      name:'role',
      placeholder:'',
      type:'radio',
      options:[
        {
          label: "Pilot",
          name: "pilot",
        },
        {
          label: "Helper",
          name: "helper",
        },
        {
          label: "Teacher",
          name: "teacher",
        },
       
      ]
    }
  ];

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
          data={crews}
          initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
          onAddNew={onOpen}
          // statusOptions={statusOptions}
          statusColorMap={statusColorMap}
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
  )
}

export default Crew