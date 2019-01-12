using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// Summary description for UserAPI
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class PathAPI : System.Web.Services.WebService
{
    private readonly Service _service;
    private readonly JavaScriptSerializer _js;
    private readonly PathData _PathData;
    private const string IMG_PREFIX = "http://proj.ruppin.ac.il/bgroup58/test2/tar2/images/";

    public PathAPI()
    {
        _service = new Service();
        _js = new JavaScriptSerializer();
        _PathData = new PathData();
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string InsertPath(string path, int serviceOnAirId)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            _PathData.InsertPath(path, serviceOnAirId);
            return _js.Serialize("1");
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string InsertActivity(int ActivityID, int serviceOnAirId, int Amount)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            _PathData.InsertActivity(ActivityID, serviceOnAirId, Amount);
            return _js.Serialize("2");
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string InsertImage(int serviceOnAirId, string image, string imageName)
    {
        try
        {
            Dictionary<string, object> res = new Dictionary<string, object>();
            string imageNameCombo = serviceOnAirId + "_" + imageName;
            bool imageSaved = ImageData.SaveImage(image, imageNameCombo, @"images/");
            if (imageSaved)
            {
                res = _service.CreateSuccessRes();
                _PathData.InsertImage(serviceOnAirId, IMG_PREFIX + imageNameCombo);
            }
            else
            {
                Exception ex = new Exception("Image didnt saved");
                res = _service.CreateErrorRes(ex);
            }

            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetCurrentReport(int serviceOnAirId)
    {

        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Report", _service.ConvertDataTable(_PathData.GetCurrentReport(serviceOnAirId)));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }
}
