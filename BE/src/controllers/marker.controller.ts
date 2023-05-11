import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.postMarker = async (req, res) => {
  const userId = Number(req.headers["id"]);
  const name = req.body.nome.toString().trim();
  const lat = req.body.lat.toString().trim();
  const lng = req.body.lng.toString().trim();

  if (name === "" || lat === "" || lng === "") {
    return res.status(400).json({
      msg: "Compilare tutti i campi",
    });
  }

  await prisma.user
    .findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    })
    .then(async (userExists) => {
      if (userExists) {
        await prisma.location.create({
          data: { name, lat, lng, userId },
        });
        return res.status(200).json({ marker: { name, lat, lng, userId } });
      } else {
        return res.status(404).json({ msg: "Utente non trovato" });
      }
    });
};

exports.getMarkers = async (req, res) => {
  const searchId = req.params.id;
  const markers = await prisma.location.findMany({
    where: { userId: +searchId },
    select: {
      id: true,
      name: true,
      lat: true,
      lng: true,
    },
  });
  return res.status(200).json({ markers });
};

export const markersInLayer = async (req, res) => {
  const userId = req.params.id;
  const type = req.body.type;
  var filteredMarkers = [];

  const markers = await prisma.location.findMany({
    where: { userId: +userId },
    select: {
      id: true,
      name: true,
      lat: true,
      lng: true,
    },
  });

  if (type === "polygon") {
    for (var marker of markers) {
      let coordinatesPoliygon: any[] = req.body.points.map((obj) => [
        obj.lat,
        obj.lng,
      ]);

      let coordPoint: number[] = [+marker.lat, +marker.lng];

      function inside(point, vs) {
        let x = point[0],
          y = point[1];

        let inside: Boolean = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          let xi = vs[i][0],
            yi = vs[i][1];
          let xj = vs[j][0],
            yj = vs[j][1];

          let intersect =
            yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }

        return inside;
      }

      if (inside(coordPoint, coordinatesPoliygon)) {
        filteredMarkers.push(marker);
      }
    }
    return res.status(200).json({ filteredMarkers });
  } else if (type === "circle") {
    for (var marker of markers) {
      let spotCoordinates: number[] = [+marker.lat, +marker.lng];
      const center = req.body.center;
      const radius = req.body.radius;

      function checkIfInside(spotCoordinates: any) {
        let newRadius = distanceInKmBetweenEarthCoordinates(
          spotCoordinates[0],
          spotCoordinates[1],
          center.lat,
          center.lng
        );

        if (newRadius < radius) {
          //point is inside the circle
          return true;
        } else if (newRadius > radius) {
          //point is outside the circle
          return false;
        } else {
          //point is on the circle
          return true;
        }
      }

      function distanceInKmBetweenEarthCoordinates(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
      ) {
        var earthRadiusM: number = 6371000;

        var dLat = degreesToRadians(lat2 - lat1);
        var dLon = degreesToRadians(lon2 - lon1);

        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);

        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusM * c;
      }

      function degreesToRadians(degrees: number) {
        return (degrees * Math.PI) / 180;
      }

      if (checkIfInside(spotCoordinates)) {
        filteredMarkers.push(marker);
      }
    }
    return res.status(200).json({ filteredMarkers });
  } else {
    return res.status(400).json({ msg: "Errore" });
  }
};
