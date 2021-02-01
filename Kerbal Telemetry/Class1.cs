using System;
using System.Diagnostics;
using System.IO;
using UnityEngine;

namespace Kerbal_Telemetry
{
    [KSPAddon(KSPAddon.Startup.Flight, false)]
    public class KerbalTelemetry : MonoBehaviour
    {
        public void Update()
        {
            string isLandedText, canCommText;
            double altitude = FlightGlobals.ActiveVessel.altitude;
            double distanceTraveled = FlightGlobals.ActiveVessel.distanceTraveled;
            double externalTemperature = FlightGlobals.ActiveVessel.externalTemperature;
            double GForce = FlightGlobals.ActiveVessel.geeForce_immediate;
            bool isLanded = FlightGlobals.ActiveVessel.Landed;
            double verticalSpeed = FlightGlobals.ActiveVessel.verticalSpeed;
            double timeToPe = FlightGlobals.ActiveVessel.GetCurrentOrbit().timeToPe;
            double timeToAp = FlightGlobals.ActiveVessel.GetCurrentOrbit().timeToAp;
            double orbitSpeed = FlightGlobals.ActiveVessel.GetOrbit().orbitalSpeed;
            double orbitIncl = FlightGlobals.ActiveVessel.GetCurrentOrbit().inclination;
            double orbitEcc = FlightGlobals.ActiveVessel.GetCurrentOrbit().eccentricity;
            bool canComm = FlightGlobals.ActiveVessel.connection.CanComm;
            double ApA = FlightGlobals.ActiveVessel.GetOrbit().ApA;
            double PeA = FlightGlobals.ActiveVessel.GetOrbit().PeA;
            if (isLanded)
            {
                isLandedText = "True";
            } else
            {
                isLandedText = "False";
            }
            if (canComm)
            {
                canCommText = "True";
            } else
            {
                canCommText = "False";
            }
            double lat = FlightGlobals.ActiveVessel.latitude;
            double lon = FlightGlobals.ActiveVessel.longitude;
            double missionTime = FlightGlobals.ActiveVessel.missionTime;
            double speed = FlightGlobals.ActiveVessel.speed;
            string name = FlightGlobals.ActiveVessel.vesselName;
            double atmDensity = FlightGlobals.ActiveVessel.atmDensity;
            int currentStage = FlightGlobals.ActiveVessel.currentStage;
            double deltaV = FlightGlobals.ActiveVessel.GetDeltaV();
            string serializeData = "\"altitude\":{0},\"distanceTraveled\":{1},\"externalTemperature\":{2},\"GForce\":{3},\"canComm\":\"{4}\",\"isLanded\":\"{5}\",\"timeToPe\":{6},\"lat\":{7},\"lon\":{8},\"verticalSpeed\":{9},\"missionTime\":{10},\"speed\":{11},\"name\":\"{12}\",\"atmDensity\":{13},\"currentStage\":{14},\"deltaV\":{15},\"timeToAp\":{16},\"orbitSpeed\":{17},\"orbitIncl\":{18},\"orbitEcc\":{19},\"ApA\":{20},\"PeA\":{21}";
            string data = String.Format(serializeData, altitude, distanceTraveled, externalTemperature-273, GForce, canCommText, isLandedText, timeToPe, lat, lon, verticalSpeed, missionTime, speed, name, atmDensity, currentStage, deltaV, timeToAp, orbitSpeed, orbitIncl, orbitEcc, ApA, PeA);
            data = "{" + data + "}";
            File.WriteAllText(@"Kerbal Telemetry\static\data.json", data);
        }
    }
}
