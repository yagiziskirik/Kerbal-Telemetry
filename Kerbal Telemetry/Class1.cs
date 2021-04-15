using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using UnityEngine;

namespace Kerbal_Telemetry
{
    [KSPAddon(KSPAddon.Startup.Flight, false)]
    public class KerbalTelemetry : MonoBehaviour
    {
        public List<Double> altOverTime = new List<Double>();
        public List<Double> fPOverTime = new List<Double>();
        public List<Double> apogeeOverTime = new List<Double>();
        public List<Double> velOverTime = new List<Double>();
        public List<Double> dVOverTime = new List<Double>();
        private float time = 0.0f;
        public float interpolationPeriod = 5.0f;

        public void Update()
        {
            string canCommText;
            double altitude = FlightGlobals.ActiveVessel.altitude;
            double distanceTraveled = FlightGlobals.ActiveVessel.distanceTraveled;
            double externalTemperature = FlightGlobals.ActiveVessel.externalTemperature;
            double GForce = FlightGlobals.ActiveVessel.geeForce_immediate;
            bool isLanded = FlightGlobals.ActiveVessel.Landed;
            double verticalSpeed = FlightGlobals.ActiveVessel.verticalSpeed;
            double timeToPe = FlightGlobals.ActiveVessel.GetCurrentOrbit().timeToPe;
            double timeToAp = FlightGlobals.ActiveVessel.GetCurrentOrbit().timeToAp;
            double orbitSpeed = FlightGlobals.ActiveVessel.obt_speed;
            double orbitIncl = FlightGlobals.ActiveVessel.GetCurrentOrbit().inclination;
            double orbitEcc = FlightGlobals.ActiveVessel.GetCurrentOrbit().eccentricity;
            bool canComm = FlightGlobals.ActiveVessel.connection.CanComm;
            double ApA = FlightGlobals.ActiveVessel.GetOrbit().ApA;
            double PeA = FlightGlobals.ActiveVessel.GetOrbit().PeA;
            string targetName = "";
            double targetSpeed = 0;
            double distance = 0;
            double targetLat = 0;
            double targetLong = 0;

            try
            {
                ITargetable target = FlightGlobals.fetch.VesselTarget;
                targetName = target.GetDisplayName();
                var vessel = target.GetVessel();
                var targetOrbit = FlightGlobals.fetch.VesselTarget.GetOrbit();
                var originOrbit = (FlightGlobals.ship_orbit.referenceBody == Planetarium.fetch.Sun ||
                                    FlightGlobals.ship_orbit.referenceBody == FlightGlobals.ActiveVessel.targetObject.GetOrbit().referenceBody)
                    ? FlightGlobals.ship_orbit
                    : FlightGlobals.ship_orbit.referenceBody.orbit;
                targetSpeed = FlightGlobals.ship_obtSpeed - targetOrbit.orbitalSpeed;
                distance = Vector3d.Distance(targetOrbit.pos, originOrbit.pos);
                targetLat = vessel.latitude;
                targetLong = vessel.longitude;

            } catch (Exception)
            {
                targetName = "NON";
                targetSpeed = 0;
                distance = 0;
            }
            string planetName = FlightGlobals.ActiveVessel.mainBody.bodyName;

            Vector3d centreOfMass = FlightGlobals.ActiveVessel.CoMD;
            Vector3d up = (centreOfMass - FlightGlobals.ActiveVessel.mainBody.position).normalized;
            Vector3d north = Vector3.ProjectOnPlane((FlightGlobals.ActiveVessel.mainBody.position + FlightGlobals.ActiveVessel.mainBody.transform.up * (float)FlightGlobals.ActiveVessel.mainBody.Radius) - centreOfMass, up).normalized;

            Quaternion surfaceRotation = Quaternion.Inverse(Quaternion.Euler(90.0f, 0.0f, 0.0f) * Quaternion.Inverse(FlightGlobals.ActiveVessel.transform.rotation) * Quaternion.LookRotation(north, up));

            double yaw = surfaceRotation.eulerAngles.y;
            double pitch = surfaceRotation.eulerAngles.x > 180.0f
                ? 360.0f - surfaceRotation.eulerAngles.x
                : -surfaceRotation.eulerAngles.x;
            double roll = surfaceRotation.eulerAngles.z > 180.0f
                ? 360.0f - surfaceRotation.eulerAngles.z
                : -surfaceRotation.eulerAngles.z;

            if (canComm)
            {
                canCommText = "TRUE";
            } else
            {
                canCommText = "FALSE";
            }
            double lat = FlightGlobals.ActiveVessel.latitude;
            double ConvectionFlux = 0.0;
            double RadiationFlux = 0.0;
            double InternalFlux = 0.0;
            double HottestTemperature = 0.0;
            double HottestSkinTemperature = 0.0;
            double CoolestTemperature = double.MaxValue;
            double CoolestSkinTemperature = double.MaxValue;
            double CriticalTemperature = double.MaxValue;
            double CriticalSkinTemperature = double.MaxValue;
            double CriticalTemperaturePercentage = 0.0;
            string HottestPartName = "";
            string CoolestPartName = "";
            string CriticalPartName = "";

            for (int i = 0; i < FlightGlobals.ActiveVessel.parts.Count; ++i)
            {
                Part part = FlightGlobals.ActiveVessel.parts[i];

                ConvectionFlux = ConvectionFlux + part.thermalConvectionFlux;
                RadiationFlux = RadiationFlux + part.thermalRadiationFlux;
                InternalFlux = InternalFlux + part.thermalInternalFluxPrevious;

                if (part.temperature > HottestTemperature || part.skinTemperature > HottestSkinTemperature)
                {
                    HottestTemperature = part.temperature;
                    //HottestTemperatureMax = part.maxTemp;
                    HottestSkinTemperature = part.skinTemperature;
                    //HottestSkinTemperatureMax = part.skinMaxTemp;
                    HottestPartName = part.partInfo.title.Replace("\"", "\\\"");
                }
                if (part.temperature < CoolestTemperature || part.skinTemperature < CoolestSkinTemperature)
                {
                    CoolestTemperature = part.temperature;
                    //CoolestTemperatureMax = part.maxTemp;
                    CoolestSkinTemperature = part.skinTemperature;
                    //CoolestSkinTemperatureMax = part.skinMaxTemp;
                    CoolestPartName = part.partInfo.title.Replace("\"", "\\\"");
                }

                if (part.temperature / part.maxTemp > CriticalTemperaturePercentage || part.skinTemperature / part.skinMaxTemp > CriticalTemperaturePercentage)
                {
                    CriticalTemperature = part.temperature;
                    //CriticalTemperatureMax = part.maxTemp;
                    CriticalSkinTemperature = part.skinTemperature;
                    //CriticalSkinTemperatureMax = part.skinMaxTemp;
                    CriticalTemperaturePercentage = Math.Max(part.temperature / part.maxTemp, part.skinTemperature / part.skinMaxTemp);
                    CriticalPartName = part.partInfo.title.Replace("\"", "\\\"");
                }
            }

            double lon = FlightGlobals.ActiveVessel.longitude;
            double missionTime = FlightGlobals.ActiveVessel.missionTime;
            double speed = FlightGlobals.ActiveVessel.speed;
            string name = FlightGlobals.ActiveVessel.vesselName;
            double atmDensity = FlightGlobals.ActiveVessel.atmDensity;
            int currentStage = FlightGlobals.ActiveVessel.currentStage;
            double deltaV = FlightGlobals.ActiveVessel.VesselDeltaV.TotalDeltaVActual;
            double mass = FlightGlobals.ActiveVessel.totalMass;
            double acceleration = FlightGlobals.ActiveVessel.acceleration_immediate.magnitude;
            int partCount = FlightGlobals.ActiveVessel.parts.Count;
            string situation = "";
            double horizSpeed = FlightGlobals.ActiveVessel.horizontalSrfSpeed;

            time += Time.deltaTime;

            switch (ScienceUtil.GetExperimentSituation(FlightGlobals.ActiveVessel))
            {
                case ExperimentSituations.SrfLanded:
                    situation = "Landed";
                    break;

                case ExperimentSituations.SrfSplashed:
                    situation = "Splashed";
                    break;

                case ExperimentSituations.FlyingLow:
                    situation = "Flying Low";
                    break;

                case ExperimentSituations.FlyingHigh:
                    situation = "Flying High";
                    break;

                case ExperimentSituations.InSpaceLow:
                    situation = "In Space Low";
                    break;

                case ExperimentSituations.InSpaceHigh:
                    situation = "In Space High";
                    break;
            }
            if (time >= interpolationPeriod)
            {
                time = time - interpolationPeriod;
                if (situation != "Landed" && altitude < 90000)
                {
                    altOverTime.Add(altitude);
                    fPOverTime.Add(altitude);
                    apogeeOverTime.Add(ApA);
                    velOverTime.Add(speed);
                    dVOverTime.Add(deltaV);
                    string altOverTimeData = "";
                    string fPOverTimeData = "";
                    string apogeeOverTimeData = "";
                    string velOverTimeData = "";
                    string dVOverTimeData = "";
                    for (var i = 0; i < altOverTime.Count; i++)
                    {
                        altOverTimeData += altOverTime[i] + ", ";
                        fPOverTimeData += fPOverTime[i] + ", ";
                        apogeeOverTimeData += apogeeOverTime[i] + ", ";
                        velOverTimeData += velOverTime[i] + ", ";
                        dVOverTimeData += dVOverTime[i] + ", ";
                    }
                    altOverTimeData = altOverTimeData.Remove(altOverTimeData.Length - 2);
                    fPOverTimeData = fPOverTimeData.Remove(fPOverTimeData.Length - 2);
                    apogeeOverTimeData = apogeeOverTimeData.Remove(apogeeOverTimeData.Length - 2);
                    velOverTimeData = velOverTimeData.Remove(velOverTimeData.Length - 2);
                    dVOverTimeData = dVOverTimeData.Remove(dVOverTimeData.Length - 2);
                    string finalAltOverTime = "{ \"data\": [" + altOverTimeData + "]}";
                    string finalFPOverTime = "{ \"data\": [" + fPOverTimeData + "]}";
                    string finalApogeeOverTime = "{ \"data\": [" + apogeeOverTimeData + "]}";
                    string finalVelOverTime = "{ \"data\": [" + velOverTimeData + "]}";
                    string finalDVOverTimee = "{ \"data\": [" + dVOverTimeData + "]}";
                    File.WriteAllText(@"GameData\Kerbal Telemetry\static\altOverTime.json", finalAltOverTime);
                    File.WriteAllText(@"GameData\Kerbal Telemetry\static\fPOverTimeData.json", finalFPOverTime);
                    File.WriteAllText(@"GameData\Kerbal Telemetry\static\apogeeOverTimeData.json", finalApogeeOverTime);
                    File.WriteAllText(@"GameData\Kerbal Telemetry\static\velOverTimeData.json", finalVelOverTime);
                    File.WriteAllText(@"GameData\Kerbal Telemetry\static\dVOverTimeData.json", finalDVOverTimee);
                }
            }
            string serializeData = "\"altitude\":{0},\"distanceTraveled\":{1},\"externalTemperature\":{2},\"GForce\":{3},\"canComm\":\"{4}\",\"situation\":\"{5}\",\"timeToPe\":{6},\"lat\":{7},\"lon\":{8},\"verticalSpeed\":{9},\"missionTime\":{10},\"speed\":{11},\"name\":\"{12}\",\"atmDensity\":{13},\"currentStage\":{14},\"deltaV\":{15},\"timeToAp\":{16},\"orbitSpeed\":{17},\"orbitIncl\":{18},\"orbitEcc\":{19},\"ApA\":{20},\"PeA\":{21},\"horizSpeed\":{22},\"partCount\":{23},\"mass\":{24},\"acceleration\":{25},\"convFlux\":{26},\"radFlux\":{27},\"intFlux\":{28},\"planetName\":\"{29}\",\"yaw\":{30},\"pitch\":{31},\"roll\":{32},\"coolTemp\":{33},\"coolSkinTemp\":{34},\"coolSkinName\":\"{35}\",\"hotTemp\":{36},\"hotSkinTemp\":{37},\"hotSkinName\":\"{38}\",\"critTemp\":{39},\"critSkinTemp\":{40},\"critSkinName\":\"{41}\",\"targetName\":\"{42}\",\"distance\":{43},\"targetSpeed\":{44},\"targetLat\":{45},\"targetLong\":{46}";
            string data = String.Format(serializeData, altitude, distanceTraveled, externalTemperature-273, GForce, canCommText, situation, timeToPe, lat, lon, verticalSpeed, missionTime, speed, name, atmDensity, currentStage, deltaV, timeToAp, orbitSpeed, orbitIncl, orbitEcc, ApA, PeA, horizSpeed, partCount, mass, acceleration, ConvectionFlux, RadiationFlux, InternalFlux, planetName, yaw, pitch, roll, CoolestTemperature - 273, CoolestSkinTemperature - 273, CoolestPartName, HottestTemperature - 273, HottestSkinTemperature - 273, HottestPartName, CriticalTemperature - 273, CriticalSkinTemperature - 273, CriticalPartName, targetName, distance, targetSpeed, targetLat, targetLong);
            data = "{" + data + "}";
            File.WriteAllText(@"GameData\Kerbal Telemetry\static\data.json", data);
        }
    }
}
