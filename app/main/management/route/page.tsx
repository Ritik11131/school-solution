"use client";


import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { useRoute } from "@/hooks/useRoute";
import GenericTable from "@/components/generic-table";
import GenericDrawer from "@/components/generic-drawer";
import GenericMap from "@/components/generic-map";

const Route = () => {
  const {isLoading,fetchAllRoutes,fetchSelectedRoutes} = useRoute();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [routes,setRoutes] = React.useState([]);
  const [geoJson,setGeoJson] = React.useState<any>({})

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "TYPE", uid: "type", sortable: true },
    { name: "DESCRIPTION", uid: "description", sortable: true },
    { name: "DISTANCE (M)", uid: "distanceM", sortable: true },
    { name: "START TIME", uid: "startTime", sortable: true },
    { name: "END TIME", uid: "endTime", sortable: true },
    { name: "START COORDINATES", uid: "startCoordinates", sortable: true },
    { name: "END COORDINATES", uid: "endCoordinates", sortable: true },
    {name: "ACTIONS", uid: "actions"},
  ];

  const INITIAL_VISIBLE_COLUMNS = ["id", "name", "type", "description","distanceM","startTime","endTime","actions"];

  
 

  const sampleGeoJson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [30.661846090787975, 13.3825309616591],
          type: "Point",
        },
        id: 0,
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [26.38189345866607, 19.282605321326074],
          type: "Point",
        },
        id: 2,
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [25.23623007178577, 12.893132932067516],
          type: "Point",
        },
        id: 3,
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [33.45387961840072, 10.524227712115987],
            [30.71322720358944, 13.554621012130625],
            [25.189424277000654, 13.022928048391876],
            [26.329833898312756, 19.30709382597867],
            [19.987221103009233, 17.44359547095381],
            [22.972523377513454, 23.17824540412404],
            [10.132284247799845, 20.72215955542434],
            [9.247945807230735, 7.7827118526296175],
            [20.72561199855562, 6.608487543735919],
            [26.070098607300878, -2.812785647503361],
            [31.04762752679406, 6.463537640231564],
            [33.36470630378949, 10.350364596071074],
            [33.367499478054555, 10.742005191876089],
          ],
          type: "LineString",
        },
      },
    ],
  };


   React.useEffect(() => {
    loadRoutes();
    }, [fetchAllRoutes]);
    
    const loadRoutes = async () => {
      try {
        const response = await fetchAllRoutes();
       console.log(response,'ress');
       setRoutes(response?.data)
      } catch (error) {
        console.error('Failed to fetch parents:', error);
      }
    };

    
    const handleOpen = () => setIsDrawerOpen(true);
    const handleClose = () => setIsDrawerOpen(false);
    
    const handleAction = () => {
      console.log("Action button clicked");
      setIsDrawerOpen(false);
    };
    
    const handleRowAction = async (action: string, rowData: any) => {
      if (action === "view") {
        const selectedRouteObject  = await fetchSelectedRoutes(rowData); // Example function
        console.log(selectedRouteObject);
        
        setGeoJson(selectedRouteObject.data.geojson)
        handleOpen();
      }
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
          data={routes}
          initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
          onRowAction={handleRowAction}
          // onAddNew={}
          // statusOptions={statusOptions}
          // statusColorMap={statusColorMap}
        />
       <GenericDrawer
        isOpen={isDrawerOpen}
        onClose={handleClose}
        placement="bottom"
         size="5xl"
        // onAction={handleAction}
        title="Custom Drawer Title"
        bodyContent={
          <GenericMap geojsonData={geoJson} />
        }
        actionLabel="Submit"
        closeLabel="Cancel"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      />
      </>
    )}
  </>
  );
};

export default Route;
