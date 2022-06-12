using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Threading;
using System.Linq;
using UnityEngine;
using KSP.UI.Screens;

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
        public string dataToShare;

        public string finalAltOverTime = "{\"data\": []}";
        public string finalFPOverTime = "{\"data\": []}";
        public string finalApogeeOverTime = "{\"data\": []}";
        public string finalVelOverTime = "{\"data\": []}";
        public string finalDVOverTimee = "{\"data\": []}";

        public float refreshTime = 2.0f;
        public float timer = 0.0f;

        private Rect _windowPosition = new Rect();
        private GUIStyle _windowStyle, _labelStyle, _buttonStyle;
        private bool _hasInitStyles = false;
        private bool toggleServerActive = false;

        public void OnGUI()
        {
            if (!_hasInitStyles) InitStyles();
            if (launcherButton == null)
            {
                //launcherButtonTexture = chatterer_icon_on;
                launcherButton = ApplicationLauncher.Instance.AddModApplication(launcherButtonToggle, launcherButtonToggle,
                                                                            null, null,
                                                                            null, null,
                                                                            ApplicationLauncher.AppScenes.FLIGHT | ApplicationLauncher.AppScenes.MAPVIEW,
                                                                            launcherButtonTexture);
            }
            //OnDraw();
            if (!hide_all_windows) OnDraw();
        }

        private void OnDraw()
        {
            _windowPosition = GUILayout.Window(10, _windowPosition, OnWindow, "Kerbal Telemetry", _windowStyle);
        }

        private void OnWindow(int windowId)
        {
            GUILayout.BeginHorizontal(GUILayout.Width(250f));
            GUILayout.Label(toggleServerActive ? "Server Status: Running" : "Server Status: Stopped", _labelStyle);
            if (GUILayout.Button(toggleServerActive ? "Stop Server" : "Start Server", _buttonStyle)) {
                toggleServerActive = !toggleServerActive;
                if (toggleServerActive)
                {
                    StartServer();
                } else
                {
                    StopServer();
                }
            }
            GUILayout.EndHorizontal();

            GUI.DragWindow();
        }

        private void InitStyles()
        {
            _windowStyle = new GUIStyle(HighLogic.Skin.window);
            _windowStyle.fixedWidth = 270f;

            _labelStyle = new GUIStyle(HighLogic.Skin.label);
            _labelStyle.stretchWidth = true;

            _buttonStyle = new GUIStyle(HighLogic.Skin.button);
            _buttonStyle.stretchWidth = true;

            _hasInitStyles = true;
        }

        private readonly string[] indexFiles =
        {
            "index.html",
            "index.htm",
            "default.html",
            "default.htm"
        };

        private readonly Dictionary<string, string> mimeTypes = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase)
        {
            {".asf", "video/x-ms-asf"},
            {".asx", "video/x-ms-asf"},
            {".avi", "video/x-msvideo"},
            {".bin", "application/octet-stream"},
            {".cco", "application/x-cocoa"},
            {".crt", "application/x-x509-ca-cert"},
            {".css", "text/css"},
            {".deb", "application/octet-stream"},
            {".der", "application/x-x509-ca-cert"},
            {".dll", "application/octet-stream"},
            {".dmg", "application/octet-stream"},
            {".ear", "application/java-archive"},
            {".eot", "application/octet-stream"},
            {".exe", "application/octet-stream"},
            {".flv", "video/x-flv"},
            {".gif", "image/gif"},
            {".hqx", "application/mac-binhex40"},
            {".htc", "text/x-component"},
            {".htm", "text/html"},
            {".html", "text/html"},
            {".ico", "image/x-icon"},
            {".img", "application/octet-stream"},
            {".iso", "application/octet-stream"},
            {".jar", "application/java-archive"},
            {".jardiff", "application/x-java-archive-diff"},
            {".jng", "image/x-jng"},
            {".jnlp", "application/x-java-jnlp-file"},
            {".jpeg", "image/jpeg"},
            {".jpg", "image/jpeg"},
            {".js", "application/x-javascript"},
            {".json", "application/json"},
            {".mml", "text/mathml"},
            {".mng", "video/x-mng"},
            {".mov", "video/quicktime"},
            {".mp3", "audio/mpeg"},
            {".mpeg", "video/mpeg"},
            {".mpg", "video/mpeg"},
            {".msi", "application/octet-stream"},
            {".msm", "application/octet-stream"},
            {".msp", "application/octet-stream"},
            {".pdb", "application/x-pilot"},
            {".pdf", "application/pdf"},
            {".pem", "application/x-x509-ca-cert"},
            {".pl", "application/x-perl"},
            {".pm", "application/x-perl"},
            {".png", "image/png"},
            {".prc", "application/x-pilot"},
            {".ra", "audio/x-realaudio"},
            {".rar", "application/x-rar-compressed"},
            {".rpm", "application/x-redhat-package-manager"},
            {".rss", "text/xml"},
            {".run", "application/x-makeself"},
            {".sea", "application/x-sea"},
            {".shtml", "text/html"},
            {".sit", "application/x-stuffit"},
            {".swf", "application/x-shockwave-flash"},
            {".tcl", "application/x-tcl"},
            {".tk", "application/x-tcl"},
            {".txt", "text/plain"},
            {".war", "application/java-archive"},
            {".wbmp", "image/vnd.wap.wbmp"},
            {".wmv", "video/x-ms-wmv"},
            {".woff", "application/font-woff"},
            {".woff2", "application/font-woff"},
            {".xml", "text/xml"},
            {".xpi", "application/x-xpinstall"},
            {".zip", "application/zip"},
            {".map", "application/json"}
        };

        //private ToolbarButtonWrapper chatterer_toolbar_button;
        private ApplicationLauncherButton launcherButton = null;

        private Thread thread;
        private volatile bool threadActive;

        private HttpListener listener;
        private string ip = "*";
        private int port = 8000;

        public void StartServer()
        {
            if (thread != null) throw new Exception("WebServer already active. (Call stop first)");
            thread = new Thread(Listen);
            thread.Start();
            UnityEngine.Debug.Log("[Kerbal Telemetry] Web server started.");
        }

        public void StopServer()
        {
            // stop thread and listener
            threadActive = false;
            if (listener != null && listener.IsListening) listener.Stop();

            // wait for thread to finish
            if (thread != null)
            {
                thread.Join();
                thread = null;
            }

            // finish closing listener
            if (listener != null)
            {
                listener.Close();
                listener = null;
            }
        }

        private void Listen()
        {
            threadActive = true;

            // start listener
            try
            {
                listener = new HttpListener();
                listener.Prefixes.Add(string.Format("http://{0}:{1}/", ip, port));
                listener.Start();
            }
            catch (Exception e)
            {
                UnityEngine.Debug.Log("ERROR: " + e.Message);
                threadActive = false;
                return;
            }

            // wait for requests
            while (threadActive)
            {
                try
                {
                    var context = listener.GetContext();
                    if (!threadActive) break;
                    ProcessContext(context);
                }
                catch (HttpListenerException e)
                {
                    if (e.ErrorCode != 995) UnityEngine.Debug.Log("[Kerbal Telemetry] ERROR HTTP Listener: " + e.Message);
                    threadActive = false;
                }
                catch (Exception e)
                {
                    UnityEngine.Debug.Log("[Kerbal Telemetry] ERROR HTTP Listener (Other): " + e.Message);
                    threadActive = false;
                }
            }
        }

        private void ProcessContext(HttpListenerContext context)
        {
            // get filename path
            string path = Path.Combine("GameData", "Kerbal Telemetry", "WebServer");
            string[] listOfAccess = { "static/data.json", "static/orbit.json", "static/fPOverTimeData.json", "static/altOverTime.json", "static/apogeeOverTimeData.json", "static/dVOverTimeData.json", "static/velOverTimeData.json", "stage" };
            string filename = context.Request.Url.AbsolutePath;
            if (filename != null) filename = filename.Substring(1);

            // get default index file if needed
            if (string.IsNullOrEmpty(filename))
            {
                foreach (string indexFile in indexFiles)
                {
                    if (File.Exists(Path.Combine(path, indexFile)))
                    {
                        filename = indexFile;
                        break;
                    }
                }
            }

            string tempFilename = filename;
            //UnityEngine.Debug.Log("[Kerbal Telemetry] Loading file: " + filename);
            filename = Path.Combine(path, filename);

            // send file
            //HttpStatusCode statusCode;
            if (listOfAccess.Any(tempFilename.Contains))
            {
                switch (tempFilename)
                {
                    case "static/data.json":
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 200;
                        byte[] bytes1 = System.Text.Encoding.UTF8.GetBytes(dataToShare);
                        context.Response.OutputStream.Write(bytes1, 0, bytes1.Length);
                        context.Response.OutputStream.Flush();
                        break;
                    case "static/orbit.json":
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 200;
                        byte[] bytes2 = System.Text.Encoding.UTF8.GetBytes("{\"orbit\":0}");
                        context.Response.OutputStream.Write(bytes2, 0, bytes2.Length);
                        context.Response.OutputStream.Flush();
                        break;
                    case "static/fPOverTimeData.json":
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 200;
                        byte[] bytes3 = System.Text.Encoding.UTF8.GetBytes(finalFPOverTime);
                        context.Response.OutputStream.Write(bytes3, 0, bytes3.Length);
                        context.Response.OutputStream.Flush();
                        break;
                    case "static/altOverTime.json":
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 200;
                        byte[] bytes4 = System.Text.Encoding.UTF8.GetBytes(finalAltOverTime);
                        context.Response.OutputStream.Write(bytes4, 0, bytes4.Length);
                        context.Response.OutputStream.Flush();
                        break;
                    case "static/apogeeOverTimeData.json":
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 200;
                        byte[] bytes5 = System.Text.Encoding.UTF8.GetBytes(finalApogeeOverTime);
                        context.Response.OutputStream.Write(bytes5, 0, bytes5.Length);
                        context.Response.OutputStream.Flush();
                        break;
                    case "static/dVOverTimeData.json":
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 200;
                        byte[] bytes6 = System.Text.Encoding.UTF8.GetBytes(finalDVOverTimee);
                        context.Response.OutputStream.Write(bytes6, 0, bytes6.Length);
                        context.Response.OutputStream.Flush();
                        break;
                    case "static/velOverTimeData.json":
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 200;
                        byte[] bytes7 = System.Text.Encoding.UTF8.GetBytes(finalVelOverTime);
                        context.Response.OutputStream.Write(bytes7, 0, bytes7.Length);
                        context.Response.OutputStream.Flush();
                        break;
                    case "static/stage.json":
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 200;
                        byte[] bytes8 = System.Text.Encoding.UTF8.GetBytes("{\"data\": 200}");
                        //try
                        //{
                        //    StageManager.ActivateNextStage();
                        //}
                        //catch
                        //{
                        //    UnityEngine.Debug.Log("[Kerbal Telemetry] Stage initiated.");
                        //}
                        context.Response.OutputStream.Write(bytes8, 0, bytes8.Length);
                        context.Response.OutputStream.Flush();
                        break;
                }
            }
            else
            {
                if (File.Exists(filename))
                {
                    try
                    {
                        using (var stream = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                        {
                            // get mime type
                            context.Response.ContentType = mimeTypes[Path.GetExtension(filename)];
                            context.Response.ContentLength64 = stream.Length;
                            context.Response.StatusCode = 200;

                            // copy file stream to response
                            stream.CopyTo(context.Response.OutputStream);
                            stream.Flush();
                            context.Response.OutputStream.Flush();
                        }

                        //statusCode = HttpStatusCode.OK;
                    }
                    catch (Exception e)
                    {
                        UnityEngine.Debug.Log("[Kerbal Telemetry] ERROR File Exists: " + e.Message);
                        //statusCode = HttpStatusCode.InternalServerError;
                    }
                }
                else
                {
                    UnityEngine.Debug.Log("[Kerbal Telemetry] File not found: " + filename);
                    //statusCode = HttpStatusCode.NotFound;
                }
            }

            // finish
            //context.Response.StatusCode = (int)statusCode;
            //if (statusCode == HttpStatusCode.OK)
            //{
            //    context.Response.AddHeader("Date", DateTime.Now.ToString("r"));
            //    context.Response.AddHeader("Last-Modified", File.GetLastWriteTime(filename).ToString("r"));
            //}

            context.Response.OutputStream.Close();
        }

        private bool hide_all_windows = true;
        private Texture2D launcherButtonTexture = GameDatabase.Instance.GetTexture("Kerbal Telemetry/Textures/logo", false);

        //public void Start()
        //{
        //    StartServer();
        //}

        public void launcherButtonToggle()
        {
            hide_all_windows = !hide_all_windows;
        }

        public void Update()
        {
            timer += Time.deltaTime;
            if (timer > refreshTime)
            {
                timer = 0f;
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

                }
                catch (Exception)
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
                }
                else
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
                        finalAltOverTime = "{ \"data\": [" + altOverTimeData + "]}";
                        finalFPOverTime = "{ \"data\": [" + fPOverTimeData + "]}";
                        finalApogeeOverTime = "{ \"data\": [" + apogeeOverTimeData + "]}";
                        finalVelOverTime = "{ \"data\": [" + velOverTimeData + "]}";
                        finalDVOverTimee = "{ \"data\": [" + dVOverTimeData + "]}";
                    }
                }
                string serializeData = "\"altitude\":{0},\"distanceTraveled\":{1},\"externalTemperature\":{2},\"GForce\":{3},\"canComm\":\"{4}\",\"situation\":\"{5}\",\"timeToPe\":{6},\"lat\":{7},\"lon\":{8},\"verticalSpeed\":{9},\"missionTime\":{10},\"speed\":{11},\"name\":\"{12}\",\"atmDensity\":{13},\"currentStage\":{14},\"deltaV\":{15},\"timeToAp\":{16},\"orbitSpeed\":{17},\"orbitIncl\":{18},\"orbitEcc\":{19},\"ApA\":{20},\"PeA\":{21},\"horizSpeed\":{22},\"partCount\":{23},\"mass\":{24},\"acceleration\":{25},\"convFlux\":{26},\"radFlux\":{27},\"intFlux\":{28},\"planetName\":\"{29}\",\"yaw\":{30},\"pitch\":{31},\"roll\":{32},\"coolTemp\":{33},\"coolSkinTemp\":{34},\"coolSkinName\":\"{35}\",\"hotTemp\":{36},\"hotSkinTemp\":{37},\"hotSkinName\":\"{38}\",\"critTemp\":{39},\"critSkinTemp\":{40},\"critSkinName\":\"{41}\",\"targetName\":\"{42}\",\"distance\":{43},\"targetSpeed\":{44},\"targetLat\":{45},\"targetLong\":{46}";
                string data = String.Format(serializeData, altitude, distanceTraveled, externalTemperature - 273, GForce, canCommText, situation, timeToPe, lat, lon, verticalSpeed, missionTime, speed, name, atmDensity, currentStage, deltaV, timeToAp, orbitSpeed, orbitIncl, orbitEcc, ApA, PeA, horizSpeed, partCount, mass, acceleration, ConvectionFlux, RadiationFlux, InternalFlux, planetName, yaw, pitch, roll, CoolestTemperature - 273, CoolestSkinTemperature - 273, CoolestPartName, HottestTemperature - 273, HottestSkinTemperature - 273, HottestPartName, CriticalTemperature - 273, CriticalSkinTemperature - 273, CriticalPartName, targetName, distance, targetSpeed, targetLat, targetLong);
                dataToShare = "{" + data + "}";
            }
        }
    }
}
