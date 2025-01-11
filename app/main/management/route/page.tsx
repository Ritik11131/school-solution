"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import React from "react";
import { Route as RouteIcon } from "lucide-react";
import GenericMap from "@/components/generic-map";
import { Spinner } from "@nextui-org/spinner";

const Route = () => {
  const [isLoading, setloading] = React.useState(false);
  const routes = [
    { name: "Route 1" },
    { name: "Route 2" },
    { name: "Route 3" },
  ];

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

  return (
    <>
      <Accordion variant="splitted">
        {routes.map((route, index) => {
          return (
            <AccordionItem
              key={index}
              aria-label={route.name}
              startContent={<RouteIcon color="#006FEE" />}
              subtitle="Start Time and End Time"
              title={route.name}
              onPress={() => {
                setloading(true);
                setTimeout(() => {
                  setloading(false);
                }, 1000);
              }}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <GenericMap geojsonData={sampleGeoJson} />
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Route;
