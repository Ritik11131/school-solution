"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import React from "react";
import { Map } from "lucide-react";
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
          type: "Polygon",
          coordinates: [
            [
              [-74.0, 40.7],
              [-74.0, 40.8],
              [-73.9, 40.8],
              [-73.9, 40.7],
              [-74.0, 40.7],
            ],
          ],
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
              startContent={<Map color="#006FEE" />}
              subtitle="Start Time and End Time"
              title={route.name}
              onPress={() => {
                setloading(true);
                setTimeout(() => {
                  setloading(false);
                }, 2000);
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
