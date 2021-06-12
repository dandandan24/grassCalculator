
import convex from "@turf/convex";
import { coordAll } from "@turf/meta";
import centroid from "@turf/centroid";
import transformRotate from "@turf/transform-rotate";
import bearing from "@turf/bearing";
import envelope from "@turf/envelope";
import area from "@turf/area";
import distance from "@turf/distance";
import * as turf from 'turf/turf'

const smallestSurroundingRectangleByarea= (Points) => {
    const turfPoints = tranformToTurfPoints(Points)
    const convexHull = turfPoints;
    const centroidCoords = centroid(convexHull);
    const allHullCoords = coordAll(convexHull);

    let minArea = Number.MAX_SAFE_INTEGER;
    let resultPolygon = null;
    resultPolygon = envelope(tranformToTurfPoints(allHullCoords))
    return resultPolygon;
  }


  const tranformToTurfPoints = (Points) => {
    let turfPoints = []
    for(let point = 0 ; point < Points.length ; point++){
        turfPoints = [...turfPoints , turf.point([Points[point][0] , Points[point][1]])]
    }
    turfPoints = turf.featureCollection(turfPoints);
    return turfPoints
  }


const smallestSurroundingRectangleByareawithCurve = (Points) => {
    const turfPoints = tranformToTurfPoints(Points)
    const convexHull = turfPoints;
    console.log(convexHull , 'convex')
    const centroidCoords = centroid(convexHull);
    console.log(centroidCoords , 'centroidCoords')
    const allHullCoords = coordAll(convexHull);
    console.log(allHullCoords , 'allHullCoords')

    let minArea = Number.MAX_SAFE_INTEGER;
    let resultPolygon = null;
  
    for (let index = 0; index < allHullCoords.length - 1; index++) {
      let angle = bearing(allHullCoords[index], allHullCoords[index + 1]);
  
      let rotatedHull = transformRotate(convexHull, -1.0 * angle, {
        pivot: centroidCoords,
      });
  
      let envelopeOfHull = envelope(rotatedHull);
      let envelopeArea = area(envelopeOfHull);
      if (envelopeArea < minArea) {
        minArea = envelopeArea;
        resultPolygon = transformRotate(envelopeOfHull, angle, {
          pivot: centroidCoords,
        });
      }
    }
   console.log(resultPolygon)
    return resultPolygon;
  }


 

  export default smallestSurroundingRectangleByarea